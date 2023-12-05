"use client";
import { AddTagDocument, AddTagMutation, AddTagMutationVariables, Tag } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Tag[]
  setData: React.Dispatch<React.SetStateAction<Tag[]>>
}

const CreateTag = (props: Props) => {
  const [name, setName] = React.useState<string>('');
  const [state, CreateTagExecute] = useMutation(AddTagDocument);
  

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddTagMutation, AddTagMutationVariables> = await CreateTagExecute({
      name: data.name
    });

    if (datas.data?.createTag) {
      alert("Tag Added");
      props.setData([...props.data, datas.data?.createTag as Tag]);
    } else {
      alert("Tag Not Added");
    }
  };

  return (
    <div>
      <h1>Create Tag</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name})
          }
        }
      >
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name" />
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

export default CreateTag;
