'use client';
import Alert from "@/components/Alert";
import { Category, EditCategoryDocument, EditCategoryMutation, EditCategoryMutationVariables, Section } from "@/gql/graphql";
import { ChevronRight } from "@/icons/arrows";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  name: string;
  id: number;
  section: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Category[]
  setData: React.Dispatch<React.SetStateAction<Category[]>>
  sections: Section[]
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCategory = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);


  const [name, setName] = React.useState<string>(props.name);
  const [section, setSection] = React.useState<string>(props.section);

  const [state, UpdateCategoryExecute] = useMutation(EditCategoryDocument);


  const HandleSubmit = async (data: any) => {
    const updatedData: OperationResult<EditCategoryMutation, EditCategoryMutationVariables> = await UpdateCategoryExecute({
      id: props.id,
      name: data.name,
      section: data.section,
    });

    if (updatedData.data?.updateCategory) {
      toast.success("Category Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateCategory?.id) {
          return value = updatedData.data?.updateCategory as Category
        } else {
          return value
        }
      })

      props.setData(updatedDates as Category[]);
    } else if (updatedData.error?.message) {
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
    }
    props.setIsEdit(false);
  };


  return (
    <div className='w-full h-full flex justify-between'>


      <form
        className='w-full h-full flex justify-between flex-col'
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name, section });
        }}
      >
        <div className="mt-4">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
          />
          <p>Section</p>
          <select name="" id="" value={section} className="select select-secondary w-full max-w-xs h-8" onChange={(e) => {
            setSection(e.target.value)
          }}>
            <option value="">Select Section</option>
            {props.sections.map((value, index) => {
              return (
                <option key={index} value={value.name as string}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          >
            <ChevronRight
              className="w-7 h-7 cursor-pointer fill-secondary  transition-all  "
              SetOpen={props.setIsEdit}
              open={props.isEdit}
            />
          </div>
        </div>
      </form>
      <Alert isSuccess={isSuccess as boolean} isError={isError as boolean} setError={setIsError} >

      </Alert>
    </div>
  );
};

export default EditCategory;
