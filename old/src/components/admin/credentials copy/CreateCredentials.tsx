"use client";
import { AddCredentialDocument, AddCredentialMutation, AddCredentialMutationVariables, Credential, Roles } from "@/gql/graphql";
import React, { useState } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  data : Credential[]
  setData : React.Dispatch<React.SetStateAction<Credential[]>>
}

const CreateCredential = (props: Props) => {
  const [name, setName] = useState<string>('');

  const [categories , setCategories ] = useState<string>("")
  const [password , setPassword ] = useState<string>("")
  const [roles , setRoles ] = useState<Roles>(Roles.Controller)
  const [team , setTeam ] = useState<string>("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, CreateCredentialExecute] = useMutation(AddCredentialDocument);


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddCredentialMutation,AddCredentialMutationVariables> = await CreateCredentialExecute({
      name: data.name,
      categories ,
      password,
      roles, 
      team 
    });

    if (datas.data?.createCredential) {
      alert("Credential Added");
    props.setData([...props.data, datas.data?.createCredential as Credential]);
    } else {
      console.log(datas.error?.message);
      
      alert("Credential Not Added");
    }
  };

  return (
    <div>
      <h1>Create Credential</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name})
          }
        }
      >
           <p>Name</p>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value) }
        />
        <p>Categoris</p>
        <input
          type="text"
          defaultValue={categories}
          onChange={(e) => setCategories(e.target.value) }
          />
        <p>Password</p>
        <input
          type="text"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value) }
          />
        <p>Roles</p>
        <select name="" id=""
          value={roles}
          onChange={(e) => setRoles(e.target.value as Roles)}
        >
          <option value={Roles.Admin}>Admin</option>
          <option value={Roles.Controller}>Controller</option>
          <option value={Roles.Media}>Media</option>
          <option value={Roles.TeamManager}>TeamManager</option>
        </select>
        <p>Team</p>
        <input
          type="text"
          defaultValue={team}
          onChange={(e) => setTeam(e.target.value) }
          />

        <button
          className="bg-fuchsia-600"
          type="submit"
          disabled={state.fetching}
        >
           {state.fetching ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateCredential;
