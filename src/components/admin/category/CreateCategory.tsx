"use client";
import Alert from "@/components/Alert";
import { AddCategoryDocument, AddCategoryMutation, AddCategoryMutationVariables, Category, Section } from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Category[]
  setData: React.Dispatch<React.SetStateAction<Category[]>>
  section: Section[]
}

const CreateCategory = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [section, setSection] = React.useState<string>(''); 
  const [state, CreateCategoryExecute] = useMutation(AddCategoryDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddCategoryMutation, AddCategoryMutationVariables> = await CreateCategoryExecute({
      name: data.name,
      section: data.section,
    });

    if (datas.data?.createCategory) {
      toast.success("Category Added");
      props.setData([...props.data, datas.data?.createCategory as Category]);
    } else {
      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
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
            {props.section.map((value, index) => {
              return (
                <option key={index} value={value.name as string}>
                  {value.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
        </div>
      </form>
      <Alert isError={isError} setError={setIsError}  isSuccess={isSuccess}>

      </Alert>

    </div>


  );
};

export default CreateCategory;
