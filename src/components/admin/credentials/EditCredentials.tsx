import Alert from '@/components/Alert';
import { EditCredentialDocument, EditCredentialMutation, EditCredentialMutationVariables, Credential, Roles, Type, Team } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { OperationResult, useMutation } from 'urql';

interface Props {
  name: string;
  id: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Credential[]
  setData: React.Dispatch<React.SetStateAction<Credential[]>>
  teams:Team[]
  team?: string;
  roles : Roles
}

const EditCredential = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

   const [name, setName] = useState<string>(props.name);
    const [password , setPassword ] = useState<string >("password")
    const [roles , setRoles ] = useState<Roles>(props.roles)
    const [team , setTeam ] = useState<string>(props.team as string)
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateCredentialExecute] = useMutation(EditCredentialDocument);


  const HandleSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);

     const updatedData: OperationResult<EditCredentialMutation, EditCredentialMutationVariables> = await UpdateCredentialExecute({
      id: props.id,
      name,
      categories : "",
      password,
       roles,
      team
    });

    if (updatedData.data?.updateCredential) {
  
      toast.success("Credential Updated");
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
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
    }
    else {
      toast.error("Credential Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
    
    <div className='w-full h-full flex justify-between'>


      <form
        className='w-full h-full flex justify-between flex-col'
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name });
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
        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          >
            <ChevronRight
              className="w-7 h-7 cursor-pointer fill-secondary  transition-all  "
              SetOpen={props.setIsEdit}
              open={props.isEdit}
            />
          </div>
        </div>
      </form>
      <Alert isSuccess={isSuccess as boolean} isError={isError as boolean} setError={setIsError}  >

      </Alert>
    </div>
  );
}

export default EditCredential