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
  Team,
  Type,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  programs: Programme[];
  setPrograms: React.Dispatch<React.SetStateAction<Programme[]>>;
  categories: Category[];
}

const CreateProgram = (props: Props) => {
  const [state, CreateProgramExecute] = useMutation(AddProgrammeDocument);
  const [name, setName] = React.useState<string>("");
  const [candidateCount, setCandidateCount] = React.useState<number>(0);
  const [category, setCategory] = React.useState<string>("");
  const [duration, setDuration] = React.useState<number>(0);
  const [groupCount, setGroupCount] = React.useState<number>(0);
  const [programCode, setProgramCode] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [mode, setMode] = React.useState<string>("");
  const [conceptNote, setConceptNote] = React.useState<string>("");
  const typesOfProgram = Object.values(Type);
  const modesOfProgram = Object.values(Mode);

  const HandleSubmit = async () => {
    setName('');
    setCandidateCount(0);
    setCategory('');
    setDuration(0);
    setGroupCount(0);
    setProgramCode('');
    setType('');
    setMode('');
    setConceptNote('');
    const datas: OperationResult<
      AddProgrammeMutation,
      AddProgrammeMutationVariables
    > = await CreateProgramExecute({
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
      props.setPrograms([...props.programs as Programme[], datas.data.createProgramme as Programme]);
      props.setIsCreate(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${props.isCreate ? "block" : "hidden"
        } `}
    >
      <div className="bg-white p-3 rounded-xl flex flex-col items-center min-w-[400px]  max-w-[400px] max-h-[95vh] text-center ">
        <p className="text-lg mt-3 font-bold text-brown">Create Program</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            HandleSubmit();
          }}
          className={`w-full p-3 text-left overflow-y-auto`}
        >
          <p className="w-full text-sm font-bold text-brown">Name</p>
          <input
            type="text"
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Name`}
          />
          <p className="w-full text-sm mt-3 font-bold text-brown">Category</p>
          <select
            className="w-full border-2  border-brown rounded-md placeholder:text-sm p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {props.categories?.map((category, index) => (
              <option key={index} value={category.name as string}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="w-full text-sm mt-3 font-bold text-brown">Candidate Count</p>
          <input
            type="number"
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={candidateCount}
            onChange={(e) => setCandidateCount(parseInt(e.target.value))}
            placeholder={`Candidate Count`}
          />
          <p className="w-full text-sm mt-3 font-bold text-brown">Duration</p>
          <input
            type="number"
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            placeholder={`Duration`}
          />
          <p className="w-full text-sm mt-3 font-bold text-brown">Group Count</p>
          <input
            type="number"
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={groupCount}
            onChange={(e) => setGroupCount(parseInt(e.target.value))}
            placeholder={`Group Count`}
          />
          <p className="w-full text-sm mt-3 font-bold text-brown">Program Code</p>
          <input
            type="text"
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={programCode}
            onChange={(e) => setProgramCode(e.target.value)}
            placeholder={`Program Code`}
          />
          <p className="w-full text-sm mt-3 font-bold text-brown">Type</p>
          <select
            className="w-full border-2  border-brown rounded-md placeholder:text-sm p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            {typesOfProgram?.map((type, index) => (
              <option key={index} value={type as string}>
                {type}
              </option>
            ))}
          </select>
          <p className="w-full text-sm mt-3 font-bold text-brown">Mode</p>
          <select
            className="w-full border-2  border-brown rounded-md placeholder:text-sm p-2"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="">Select Mode</option>
            {modesOfProgram?.map((mode, index) => (
              <option key={index} value={mode as string}>
                {mode.replace("_", " ")}
              </option>
            ))}
          </select>
          <p className="w-full text-sm mt-3 font-bold text-brown">Concept Note</p>
          <textarea
            className="w-full border-2  border-brown rounded-md placeholder:text-sm py-2 px-3"
            value={conceptNote}
            onChange={(e) => setConceptNote(e.target.value)}
            placeholder={`Concept Note`}
          />
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

export default CreateProgram;
