"use client";
import { AddTeamDocument, AddTeamMutation, AddTeamMutationVariables, Team } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Team[]
  setData: React.Dispatch<React.SetStateAction<Team[]>>
}

const CreateTeam = (props: Props) => {
  const [name, setName] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [shortName, setShortName] = React.useState<string>('');
  const [state, CreateTeamExecute] = useMutation(AddTeamDocument);
  

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddTeamMutation, AddTeamMutationVariables> = await CreateTeamExecute({
      name: data.name,
      color: data.color,
      description: data.description,
      shortName: data.shortName
    });

    if (datas.data?.createTeam) {
      alert("Team Added");
      props.setData([...props.data, datas.data?.createTeam as Team]);
    } else {
      alert("Team Not Added");
    }
  };

  return (
    <div>
      <h1>Create Team</h1>

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
        <input type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="color" />
        <input type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description" />
        <input type="text"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
          placeholder="shortName" />
          
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

export default CreateTeam;
