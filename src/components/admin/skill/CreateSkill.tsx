"use client";
import { AddSkillDocument, AddSkillMutation, AddSkillMutationVariables, Skill } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Skill[]
  setData: React.Dispatch<React.SetStateAction<Skill[]>>
}

const CreateSkill = (props: Props) => {
  const [name, setName] = React.useState<string>('');
  const [shortName, setShortName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [state, CreateSkillExecute] = useMutation(AddSkillDocument);
  

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddSkillMutation, AddSkillMutationVariables> = await CreateSkillExecute({
      name: data.name,
      description: data.description,
      shortName: data.shortName
    });

    if (datas.data?.createSkill) {
      alert("Skill Added");
      props.setData([...props.data, datas.data?.createSkill as Skill]);
    } else {
      alert("Skill Not Added");
    }
  };

  return (
    <div>
      <h1>Create Skill</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, description, shortName })
          }
        }
      >
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name" />
        <input type="text"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
          placeholder="shortName" />
        <input type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description" />
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

export default CreateSkill;
