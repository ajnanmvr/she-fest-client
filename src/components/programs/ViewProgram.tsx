import { useGlobalContext } from '@/context/context';
import {
  AddCandidateProgrammeDocument,
  AddCandidateProgrammeMutation,
  AddCandidateProgrammeMutationVariables,
  Candidate,
  CandidateProgramme,
  Category,
  Mode,
  Programme,
  Roles,
  Team,
  Type,
  Zone,
} from '@/gql/graphql';
import React, { useEffect } from 'react';
import { OperationResult, useMutation } from 'urql';

interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  programs: Programme[];
  setPrograms: React.Dispatch<React.SetStateAction<Programme[]>>;
  categories: Category[];
  selected: Programme;
  setSelected: React.Dispatch<React.SetStateAction<Programme>>;
  candidates: Candidate[];
  zones: Zone[];
}

const ViewProgram = (props: Props) => {
  const [state, ViewProgramExecute] = useMutation(
    AddCandidateProgrammeDocument
  );
  const [name, setName] = React.useState<string>('');
  const [chestNo, setChestNo] = React.useState<string>('');
  const [zone, setZone] = React.useState<string>('');
  const [candidates, setCandidates] = React.useState<Candidate[]>(
    props.candidates
  );
  const [zones, setZones] = React.useState<Zone[]>(props.zones);
  const [candidateCount, setCandidateCount] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>("");
  const [duration, setDuration] = React.useState<number>(0);
  const [groupCount, setGroupCount] = React.useState<number>(0);
  const [programCode, setProgramCode] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [mode, setMode] = React.useState<string>("");
  const [conceptNote, setConceptNote] = React.useState<string>("");
  let filteredCandidate = candidates?.find((candidate) => {
    return candidate?.chestNO?.toLowerCase() == chestNo.toLowerCase();
  });
  const { data, setData } = useGlobalContext();

  const HandleSubmit = async () => {
    const datas: OperationResult<
      AddCandidateProgrammeMutation,
      AddCandidateProgrammeMutationVariables
    > = await ViewProgramExecute({
      chestNO: chestNo,
      programCode: props.selected?.programCode as string,
    });
    console.log(datas);

    if (datas.data?.createCandidateProgramme) {
      props.setSelected({
        ...props.selected,
        candidateProgramme: [...props.selected?.candidateProgramme as CandidateProgramme[],
        datas.data?.createCandidateProgramme as CandidateProgramme]
      })
      // props.setIsView(false);
    }
    // if (datas.data?.createCandidateProgramme) {
    //   const newProgramme = datas.data?.createCandidateProgramme as CandidateProgramme;
    //   const existingProgramIndex = props.programs.findIndex(
    //     (program) => program.id === newProgramme.programme?.id
    //   );

    //   if (existingProgramIndex !== -1) {
    //     // Update existing program
    //     const updatedPrograms = [...props.programs];
    //     updatedPrograms[existingProgramIndex].candidateProgramme?.push(newProgramme)
    //     props.setPrograms(updatedPrograms);
    //   } else {
    //     // Add new program
    //     props.setPrograms([...props.programs]);
    //   }

    //   props.setIsView(false);
    // }

  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${props.isView ? 'block' : 'hidden'
        } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
        {(data.admin?.roles == Roles.Admin ||
          data.admin?.roles == Roles.Controller ||
          data?.roles == Roles.Controller) && (
            <>
              {
                <>
                  <p className="text-lg mt-3 font-bold text-primary">
                    Candidates
                  </p>
                  <div className="flex w-full gap-1">
                    <input
                      type="text"
                      className="w-3/5 border-2  border-primary rounded-md placeholder:text-sm py-2 px-3 my-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={`Search by name or chest number..`}
                    />
                    <select
                      className="w-2/5 border-2  border-primary rounded-md placeholder:text-sm py-2 px-3 my-2"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      <option value="" className="text-center">
                        Select Zone
                      </option>
                      {zones?.map((zone, index) => (
                        <option
                          className="text-center"
                          key={index}
                          value={zone.name as string}
                        >
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full   overflow-y-auto">
                    {props.selected?.candidateProgramme?.map((cp) => {
                      return (
                        <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                          <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                            {cp.candidate?.chestNO}{' '}
                          </p>
                          <p className="text-primary font-bold">
                            {cp.candidate?.name}
                          </p>
                          <p className="text-primary font-semibold">
                            {cp.candidate?.team?.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </>
              }
            </>
          )}

        {data.roles == Roles.TeamManager && (
          <div
            onClick={() => {
              console.log(
                (props.selected?.candidateProgramme?.filter((cp) => {
                  return cp.candidate?.team?.name == data.team.name;
                }).length as any) < (props.selected?.candidateCount as any)
              );
            }}
          >
            {props.selected?.candidateProgramme?.map((cp, i) => {
              if (cp.candidate?.team?.name == data.team.name) {
                return (
                  <div
                    key={i}
                    className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between"
                  >
                    <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                      {cp.candidate?.chestNO}{' '}
                    </p>
                    <p className="text-primary font-bold">
                      {cp.candidate?.name}
                    </p>
                    <p className="text-primary font-semibold">
                      {cp.candidate?.team?.name}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
        {data &&
          data.roles == Roles.TeamManager &&
          (props.selected?.candidateProgramme?.filter((cp) => {
            return cp.candidate?.team?.name == data.team.name;
          }).length as any) < (props.selected?.candidateCount as any) && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                HandleSubmit();
              }}
              className={`w-full p-3 text-left`}
            >
              <p className="text-lg mt-3 font-bold text-primary text-center">
                Add Candidates
              </p>
              <p className="text-sm mt-3 font-bold text-primary">Chest No</p>
              <input
                type="text"
                className="w-full border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
                value={chestNo}
                onChange={(e) => {
                  setChestNo(e.target.value);
                }}
                placeholder={`Chest No`}
              />
              <p className="text-sm mt-1 font-bold text-primary">
                {chestNo.length > 0
                  ? !filteredCandidate
                    ? 'No candidates font'
                    : filteredCandidate?.name
                  : ''}
              </p>
              <button className="w-full bg-primary text-white font-bold px-3 py-2 rounded-lg mt-3">
                Add Candidate
              </button>
            </form>
          )}
        <button
          className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg mt-3"
          onClick={() => {
            props.setIsView(false);
            console.log(data);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewProgram;
