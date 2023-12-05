import { EditTeamDocument, EditTeamMutation, EditTeamMutationVariables, Team } from '@/gql/graphql';
import React from 'react'
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
      alert("Team Updated");
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
      alert(updatedData.error?.message.split(']')[1]);
    }
    else {
      alert("Team Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
    <div>
      <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
        Back
      </button>
      <h1>Edit Team</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name , color , description , shortName })
        }}
      >
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>ShortName</p>
        <input
          type="text"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <p>Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Color</p>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
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

export default EditTeam