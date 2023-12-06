import { EditCredentialDocument, EditCredentialMutation, EditCredentialMutationVariables, Credential, Roles, Type } from '@/gql/graphql';
import React, { useState } from 'react'
import { OperationResult, useMutation } from 'urql';

interface Props {
  name: string;
  id: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Credential[]
  setData: React.Dispatch<React.SetStateAction<Credential[]>>
}

const EditCredential = (props: Props) => {
   const [name, setName] = useState<string>(props.name);
   const [categories , setCategories ] = useState<string>("")
    const [password , setPassword ] = useState<string>("")
    const [roles , setRoles ] = useState<Roles>(Roles.Controller)
    const [team , setTeam ] = useState<string>("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateCredentialExecute] = useMutation(EditCredentialDocument);


  const HandleSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);

    const updatedData: OperationResult<EditCredentialMutation, EditCredentialMutationVariables> = await UpdateCredentialExecute({
      id: props.id,
      name,
      categories,
      password,
       roles,
      team
    });

    if (updatedData.data?.updateCredential) {
      alert("Credential Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateCredential?.id) {
          return value = updatedData.data?.updateCredential as Credential
        } else {
          return value
        }
      })
      console.log(updatedDates);

      props.setData(updatedDates as Credential[]);
    } else if (updatedData.error?.message) {
      alert(updatedData.error?.message.split(']')[1]);
    }
    else {
      alert("Credential Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
    <div>
      <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
        Back
      </button>
      <h1>Edit Credential</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({
            name,  
          })
        }}
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
          value={Roles.Admin}
          onChange={(e) => setRoles(e.target.value as Roles)}
        >
          <option value={Roles.Admin}>Group</option>
          <option value={Roles.Controller}>House</option>
          <option value={Roles.Media}>Single</option>
          <option value={Roles.TeamManager}>Single</option>
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
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default EditCredential