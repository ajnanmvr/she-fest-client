import {
  EditTeamDocument,
  EditTeamMutation,
  EditTeamMutationVariables,
  Team,
  Category,
  Zone,
} from '@/gql/graphql';
import React, { useEffect, useState } from 'react';
import { OperationResult, useMutation } from 'urql';

interface Props {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  zones: Zone[];
  teams: Team[];
  selected: Team;
}

const UpdateTeam = (props: Props) => {
  const [state, UpdateTeamExecute] = useMutation(EditTeamDocument);
  const [name, setName] = useState<string>(
    props.selected?.name as string
  );
  const [zoneId, setZoneId] = useState<number>(
    props.selected?.zone as number
  );
  const [color, setColor] = useState<string>(
    props.selected?.color as string
  );
  const [description, setDescription] = useState<string>(
    props.selected?.description as string
  );
  const [shortName, setShortName] = useState<string>(
    props.selected?.shortName as string
  );

  useEffect(() => {
    setName(props.selected?.name as string);
    setZoneId(props.selected?.zone as number);
    setColor(props.selected?.color as string);
    setDescription(props.selected?.description as string);
    setShortName(props.selected?.shortName as string);
  }, [props.selected]);

  const HandleSubmit = async () => {
    const datas: OperationResult<EditTeamMutation, EditTeamMutationVariables> =
      await UpdateTeamExecute({
        id: props.selected.id as number,
        name: name,
        zoneId: zoneId,
        color: color,
        description: description,
        shortName: shortName,
      });
    console.log(datas);

    if (datas.data?.updateTeam) {
      props.setTeams([...props.teams, datas.data.updateTeam]);
      props.setIsUpdate(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${props.isUpdate ? 'block' : 'hidden'
        } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center max-w-[400px] text-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleSubmit();
          }}
          className={`p-3 text-left`}
        >
          <p className="text-sm mt-3 font-bold text-primary">Color</p>
          <input
            type="text"
            className="border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder={`color`}
          />
          <p className="text-sm mt-3 font-bold text-primary">Name</p>
          <input
            type="text"
            className="border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Name`}
          />
          <p className="text-sm mt-3 font-bold text-primary">Description</p>
          <input
            type="text"
            className="border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Description`}
          />{' '}
          <p className="text-sm mt-3 font-bold text-primary">ShortName</p>
          <input
            type="text"
            className="border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder={`ShortName`}
          />
          <p className="text-sm mt-3 font-bold text-primary">Zone</p>
          <select
            className="border-2  border-primary rounded-md placeholder:text-sm p-2 w-full"
            value={zoneId}
            onChange={(e) => setZoneId(+e.target.value)}
          >
            <option value="">Select Zone</option>
            {props.zones?.map((zone, index) => (
              <option key={index} value={zoneId || zone.id as number}>
                {props.zones.find((z) => z.id === zone.id)?.name}
              </option>
            ))}
          </select>
          <button className="w-full bg-primary text-white font-bold px-3 py-2 rounded-lg mt-3">
            Submit
          </button>
        </form>
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg"
          onClick={() => props.setIsUpdate(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateTeam;
