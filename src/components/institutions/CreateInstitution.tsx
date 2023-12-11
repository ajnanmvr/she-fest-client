import {
    AddTeamDocument,
    AddTeamMutation,
    AddTeamMutationVariables,
    Team,
    Category,
    Zone,
  } from '@/gql/graphql';
  import React from 'react';
  import { OperationResult, useMutation } from 'urql';
  
  interface Props {
    isCreate: boolean;
    setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    zones: Zone[];
    teams: Team[];
  }
  
  const CreateTeam = (props: Props) => {
    const [state, CreateTeamExecute] = useMutation(AddTeamDocument);
    const [name, setName] = React.useState<string>('');
    const [zoneId, setZoneId ] = React.useState<number>(0);
    const [color, setColor] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [shortName, setShortName] = React.useState<string>('');
  
    const HandleSubmit = async () => {
      const datas: OperationResult<
        AddTeamMutation,
        AddTeamMutationVariables
      > = await CreateTeamExecute({
        name: name,
        zoneId:zoneId,
        color : color,
        description : description,
        shortName : shortName
      });
      console.log(datas);
  
      if (datas.data?.createTeam) {
        props.setTeams([...props.teams , datas.data.createTeam]);
        props.setIsCreate(false);
      }
    };
  
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
          props.isCreate ? 'block' : 'hidden'
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
            <p className="text-sm mt-3 font-bold text-brown">Color</p>
            <input
              type="text"
              className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder={`color`}
            />
            <p className="text-sm mt-3 font-bold text-brown">Name</p>
            <input
              type="text"
              className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Name`}
            />
              <p className="text-sm mt-3 font-bold text-brown">Description</p>
            <input
              type="text"
              className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Description`}
            />  <p className="text-sm mt-3 font-bold text-brown">ShortName</p>
            <input
              type="text"
              className="border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder={`ShortName`}
            />

            <p className="text-sm mt-3 font-bold text-brown">Zone</p>
            <select
              className="border-2  border-brown rounded-md placeholder:text-sm p-2 w-full"
              value={zoneId}
              onChange={(e) => setZoneId(+e.target.value)}
            >
              <option value="">Select Zone</option>
              {props.zones?.map((zone, index) => (
                <option key={index} value={zone.id as number}>
                  {zone.name}
                </option>
              ))}
            </select>
          
            <button className="w-full bg-brown text-white font-bold px-3 py-2 rounded-lg mt-3">
              Submit
            </button>
          </form>
          <button
            className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg"
            onClick={() => props.setIsCreate(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default CreateTeam;
  