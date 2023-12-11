import { useGlobalContext } from "@/context/context";
import {
  AddCandidateDocument,
  AddCandidateMutation,
  AddCandidateMutationVariables,
  AddProgrammeDocument,
  AddProgrammeMutation,
  AddProgrammeMutationVariables,
  Candidate,
  Category,
  Mode,
  Programme,
  Roles,
  Team,
  Type,
  Zone,
} from "@/gql/graphql";
import React, { useEffect } from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  programs: Programme[];
  setPrograms: React.Dispatch<React.SetStateAction<Programme[]>>;
  categories: Category[];
  selected: Programme;
  candidates: Candidate[];
  zones: Zone[];
}

const ViewProgram = (props: Props) => {
  const [state, ViewProgramExecute] = useMutation(AddProgrammeDocument);
  const [name, setName] = React.useState<string>("");
  const [chestNo, setChestNo] = React.useState<string>("");
  const [zone, setZone] = React.useState<string>("");
  const [candidates, setCandidates] = React.useState<Candidate[]>(props.candidates);
  const [zones, setZones] = React.useState<Zone[]>(props.zones);
  const [candidateCount, setCandidateCount] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>("");
  const [duration, setDuration] = React.useState<number>(0);
  const [groupCount, setGroupCount] = React.useState<number>(0);
  const [programCode, setProgramCode] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [mode, setMode] = React.useState<string>("");
  const [conceptNote, setConceptNote] = React.useState<string>("");
  const [lookUp, setLookUp] = React.useState<string>("");
  const { data, setData } = useGlobalContext();

  const HandleSubmit = async () => {
    const datas: OperationResult<
      AddProgrammeMutation,
      AddProgrammeMutationVariables
    > = await ViewProgramExecute({
      name: name,
      category: category,
      candidateCount: candidateCount,
      duration: duration,
      groupCount: groupCount,
      programCode: programCode,
      type: type as Type,
      mode: mode as Mode,
      conceptNote: conceptNote,
    });
    console.log(datas);

    if (datas.data?.createProgramme) {
      props.setPrograms([
        ...(props.programs as Programme[]),
        datas.data.createProgramme as Programme,
      ]);
      props.setIsView(false);
    }
  };

  const searchCandidate = (e: any) => {
    setChestNo(e.target.value);
    return props.candidates.filter((candidate) => {
      candidate.chestNO == chestNo && setName(candidate.name as string);
      candidate.chestNO == chestNo && console.log(candidate.name);

    });
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${props.isView ? "block" : "hidden"
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
                      <option value="" className="text-center">Select Zone</option>
                      {zones?.map((zone, index) => (
                        <option className="text-center" key={index} value={zone.name as string}>
                          {zone.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full   overflow-y-auto">
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                    <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                      <p className="text-white font-black text-2xl bg-primary rounded-md w-1/3 mx-auto">
                        2333{" "}
                      </p>
                      <p className="text-primary font-bold">Muhammed Hashim</p>
                      <p className="text-primary font-semibold">
                        Vahdiyya Kondotty
                      </p>
                    </div>
                  </div>
                </>
              }
            </>
          )}

        {data.roles == Roles.TeamManager && (
          <div>
            <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between items-center">
              <p className="text-primary font-bold">Muhammed Hashim T</p>
              <p className="text-primary font-semibold">Vahdiyya Kondotty</p>
            </div>
            <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between items-center">
              <p className="text-primary font-bold">Muhammed Hashim</p>
              <p className="text-primary font-semibold">Vahdiyya Kondotty</p>
            </div>
          </div>
        )}
        {data && data.roles == Roles.TeamManager && (
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
            {candidates?.map((candidate, index) => (
              candidate.chestNO == chestNo && (
                <p className="text-sm mt-1 font-bold text-primary">
                {candidate.name}
              </p>
              )
            ))}
            {candidates?.map((candidate, index) => (
              candidate.chestNO !== chestNo && (
                <p className="text-sm mt-1 font-bold text-primary">
                Candidate Not Found
              </p>
              )
            ))}
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
