"use client";
import Alert from "@/components/Alert";
import { AddSkillDocument, AddSkillMutation, AddSkillMutationVariables, Skill } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Skill[]
  setData: React.Dispatch<React.SetStateAction<Skill[]>>
  isOpen: boolean;
}

const CreateSkill = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
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
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, description, shortName })
          }
        }
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
          <p>Short Name</p>
           <input type="text"
             className="input input-bordered input-secondary w-full max-w-xs mt-1"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
          placeholder="shortName" />
          <p>Description</p>
        <input type="text"
          className="input input-bordered input-secondary w-full max-w-xs mt-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description" />
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

export default CreateSkill;
