"use client";
import { AddCategoryDocument, AddCategoryMutation, AddCategoryMutationVariables, Category } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Category[]
  setData: React.Dispatch<React.SetStateAction<Category[]>>
}

const CreateCategory = (props: Props) => {
  const [name, setName] = React.useState<string>('');
  const [section, setSection] = React.useState<string>('');
  const [state, CreateCategoryExecute] = useMutation(AddCategoryDocument);
  

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddCategoryMutation, AddCategoryMutationVariables> = await CreateCategoryExecute({
      name: data.name,
      section: data.section,
    });

    if (datas.data?.createCategory) {
      alert("Category Added");
      props.setData([...props.data, datas.data?.createCategory as Category]);
    } else {
      alert("Category Not Added");
    }
  };

  return (
    <div>
      <h1>Create Category</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, section })
          }
        }
      >
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name" />
        <input type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="section" />
        <button
          className="bg-fuchsia-600"
          type="submit"
          disabled={state.fetching}
        >
          {state.fetching ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
