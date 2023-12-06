import Alert from '@/components/Alert';
import { EditTeamDocument, EditTeamMutation, EditTeamMutationVariables, Team } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React from 'react'
import { toast } from 'react-toastify';
import { OperationResult, useMutation } from 'urql';

interface Props {
  name: string;
  id: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Team[]
  setData: React.Dispatch<React.SetStateAction<Team[]>>
  color: string
  description: string
  shortName: string
}

const EditTeam = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(props.name);
  const [shortName, setShortName] = React.useState<string>(props.shortName);
  const [description, setDescription] = React.useState<string>(props.description);
  const [color, setColor] = React.useState<string>(props.color);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateTeamExecute] = useMutation(EditTeamDocument);


  const HandleSubmit = async (data: any) => {
    setIsLoading(true);
    const updatedData: OperationResult<EditTeamMutation, EditTeamMutationVariables> = await UpdateTeamExecute({
      id: props.id,
      name: data.name,
      color: data.color,
      description: data.description,
      shortName: data.shortName
    });

    if (updatedData.data?.updateTeam) {
      toast.success("Team Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateTeam?.id) {
          return value = updatedData.data?.updateTeam as Team
        } else {
          return value
        }
      })
      console.log(updatedDates);

      props.setData(updatedDates as Team[]);
    } else if (updatedData.error?.message) {
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);    }
    else {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
    <div className='w-full h-full flex justify-between'>


      <form
        className='w-full h-full flex justify-between flex-col'
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ name, color, description, shortName })
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

          <input type="color"
            className="input input-bordered input-secondary w-full max-w-xs mt-1 "
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
        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {isLoading ? "Loading..." : "Submit"}
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
      <Alert  isError={isError} setError={setIsError}  isSuccess={isSuccess}>
      </Alert>
    </div>
  );
}

export default EditTeam