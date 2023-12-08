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
    Team,
    Type,
  } from "@/gql/graphql";
  import React from "react";
  import { OperationResult, useMutation } from "urql";
  
  interface Props {
    isView: boolean;
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
    programs: Programme[];
    setPrograms: React.Dispatch<React.SetStateAction<Programme[]>>;
    categories: Category[];
  }
  
  const ViewProgram = (props: Props) => {
    const [state, ViewProgramExecute] = useMutation(AddProgrammeDocument);
    const [name, setName] = React.useState<string>("");
    const [candidateCount, setCandidateCount] = React.useState<number>(0);
    const [category, setCategory] = React.useState<string>("");
    const [duration, setDuration] = React.useState<number>(0);
    const [groupCount, setGroupCount] = React.useState<number>(0);
    const [programCode, setProgramCode] = React.useState<string>("");
    const [type, setType] = React.useState<string>("");
    const [mode, setMode] = React.useState<string>("");
    const [conceptNote, setConceptNote] = React.useState<string>("");
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
        props.setPrograms([...props.programs as Programme[], datas.data.createProgramme as Programme]);
        props.setIsView(false);
      }
    };
  
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
          props.isView ? "block" : "hidden"
        } `}
      >

        
        <div className="bg-white p-3 rounded-xl flex flex-col items-center max-w-[400px] text-center">
        <p className="text-sm mt-3 font-bold text-primary">Candidates</p>
        {
            // data && data.admin?.roles    

        }
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
            className={`p-3 text-left`}
          >
            <p className="text-sm mt-3 font-bold text-primary">Name</p>
            <input
              type="text"
              className="border-2  border-primary rounded-md placeholder:text-sm py-2 px-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Name`}
            />
            <p className="text-sm mt-3 font-bold text-primary">Category</p>
            <select
              className="border-2  border-primary rounded-md placeholder:text-sm p-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {props.categories.map((category, index) => (
                <option key={index} value={category.name as string}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <button className="w-full bg-primary text-white font-bold px-3 py-2 rounded-lg mt-3">
              Submit
            </button>
          </form> */}
          <button
            className="bg-red-700 text-white font-bold px-3 py-2 rounded-lg"
            onClick={() => props.setIsView(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ViewProgram;
  