"use client";
import Alert from "@/components/Alert";
import { AddCredentialDocument, AddCredentialMutation, AddCredentialMutationVariables, Credential, Roles, Team } from "@/gql/graphql";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  data: Credential[]
  teams: Team[]
  setData: React.Dispatch<React.SetStateAction<Credential[]>>
}

const CreateCredential = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const [name, setName] = useState<string>('');

  const [categories, setCategories] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [roles, setRoles] = useState<Roles>(Roles.Controller)
  const [team, setTeam] = useState<string>("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, CreateCredentialExecute] = useMutation(AddCredentialDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddCredentialMutation, AddCredentialMutationVariables> = await CreateCredentialExecute({
      name: data.name,
      categories,
      password,
      roles,
      team
    });

    if (datas.data?.createCredential) {
      toast.success("Credential Added");
      props.setData([...props.data, datas.data?.createCredential as Credential]);
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
          HandleSubmit({ name, categories,password,roles,team });
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
    
          <p>Password</p>
          <input
            type="text"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
          />

          <p>Roles</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={roles}
            onChange={(e) => setRoles(e.target.value as Roles)}
          >
            <option value={Roles.Admin}>Admin</option>
            <option value={Roles.Controller}>Controller</option>
            <option value={Roles.Media}>Media</option>
            <option value={Roles.TeamManager}>TeamManager</option>
          </select>

          {
            roles == Roles.TeamManager &&
            <>
              <p>Team</p>
              <select name="" id=""
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                {
                  props.teams.map((item) => {
                    return (
                      <option value={item.name as string}>{item.name}</option>
                    )
                  })
                }
              </select>
            </>
          }
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
      <Alert isError={isError} setError={setIsError} isSuccess={isSuccess}>

      </Alert>

    </div>

  );
};

export default CreateCredential;
