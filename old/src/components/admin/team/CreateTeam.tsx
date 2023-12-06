"use client";
import Alert from "@/components/Alert";
import { AddTeamDocument, AddTeamMutation, AddTeamMutationVariables, Team } from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Team[]
  setData: React.Dispatch<React.SetStateAction<Team[]>>
  isOpen: boolean;
}

const CreateTeam = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
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
      toast.success("Team Added");
      props.setData([...props.data, datas.data?.createTeam as Team]);
    } else {
      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="h-full w-full">
      <form
        className="h-full w-full flex flex-col items-center justify-between "
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name , color , description , shortName})
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
          <p>Color</p>

          <input type="text"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="color" />
          <p>Description</p>
          <input type="text"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description" />
          <p>Short Name</p>
          <input type="text"
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder="shortName" />
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

export default CreateTeam;
