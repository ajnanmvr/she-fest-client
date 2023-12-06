import {
  AddCandidateProgrammeDocument,
  AddCandidateProgrammeMutation,
  AddCandidateProgrammeMutationVariables,
  Candidate,
  CandidateProgramme,
  Programme,
} from "@/gql/graphql";
import { MinusIcon, SubmitIcon } from "@/icons/action";
import { useState } from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  allCandidates: Candidate[];
  programmeCode: string;
  isCreate : boolean ;
  setIsCreate : React.Dispatch<React.SetStateAction<boolean>>;
  singleProgramme : Programme;
  setSingleProgramme : React.Dispatch<React.SetStateAction<Programme>>;
}

const CreateSingle = (props: Props) => {
  const [chestNo, setChestNo] = useState("");
  const [state, CreateSingleCPExecute] = useMutation(
    AddCandidateProgrammeDocument
  );

  const HandleSubmit = async () => {
    const data: OperationResult<
      AddCandidateProgrammeMutation,
      AddCandidateProgrammeMutationVariables
    > = await CreateSingleCPExecute({
      chestNO: chestNo,
      programCode: props.programmeCode,
    });

    if (data.data?.createCandidateProgramme) {
      toast.success(
        `Candidate ${chestNo} added to program ${props.programmeCode}`
      );

    const  AddedSingleProgramme = props.singleProgramme ;
    AddedSingleProgramme?.candidateProgramme?.push(data.data?.createCandidateProgramme as CandidateProgramme) 
    props.setSingleProgramme(AddedSingleProgramme as Programme)

    props.setIsCreate(false)
  } else {
      data.error?.message.split("]")[1].startsWith(" target")
        ? toast.error("server error")
        : toast.error(data.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="bg-white rounded-md m-1 p-2 ">
      <div className="flex justify-between">
        <div className="flex">
          <input
            type="text"
            className="text-lg font-bold w-8/12 border-2 border-secondary rounded-md "
            value={chestNo}
            onChange={(e) => {
              setChestNo(e.target.value);
              let findedCandiate = props.allCandidates.find(
                (c: Candidate, index: number) => {
                  return c.chestNO == e.target.value;
                }
              );

              (document.getElementById("to-add") as any).innerHTML =
                findedCandiate ? findedCandiate?.name : "Enter valid Chest No";
            }}
          />
          <div onClick={async()=>{
            await HandleSubmit()
          }}>
          <SubmitIcon className="w-7 h-7 text-secondary cursor-pointer"/>
          </div>
          <div onClick={(()=>{
            props.setIsCreate(false)
          })}
          className="mx-2">

          <MinusIcon className="w-7 h-7 text-secondary cursor-pointer" />
          </div>
        </div>
      </div>
      <p id="to-add">Enter valid Chest No</p>
    </div>
  );
};

export default CreateSingle;
