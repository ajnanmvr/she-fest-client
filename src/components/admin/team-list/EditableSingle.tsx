import { SubmitIcon } from "@/icons/action";
import React, { useState } from "react";
import {
  EditCandidateProgrammeDocument,
  EditCandidateProgrammeMutation,
  EditCandidateProgrammeMutationVariables,
  Candidate,
  Programme,
  CandidateProgramme,
} from "@/gql/graphql";
import { OperationResult, useMutation } from "urql";
import { toast } from "react-toastify";

interface Props {
  candidate: Candidate;
  selectedProgramme: Programme;
  allCandidates: Candidate[];
  haveEditngChestNo: boolean;
  id: number;
  singleProgramme : Programme;
  setSingleProgramme : React.Dispatch<React.SetStateAction<Programme>>;
  toEditChestNo : string;
  setToEditChestNo : React.Dispatch<React.SetStateAction<string>>;
}

const EditableSingle = (props: Props) => {
  const [chestNo, setChestNo] = useState<string>(
    props.candidate?.chestNO as string
  );
  const [state, EditSingleCPExecute] = useMutation(
    EditCandidateProgrammeDocument
  );

  const HandleSubmit = async () => {
    const data: OperationResult<
      EditCandidateProgrammeMutation,
      EditCandidateProgrammeMutationVariables
    > = await EditSingleCPExecute({
      chestNO: chestNo as string,
      programCode: props.selectedProgramme.programCode as string,
      id: props.id,
    });

    if (data.data?.updateCandidateProgramme) {
      toast.success(
        `Candidate ${props.candidate?.chestNO} changed by ${chestNo} on program ${props.selectedProgramme?.programCode} successfully`
      );

      const programmeToEdit = props.singleProgramme;

      const EditedSingleProgramme : CandidateProgramme[] = programmeToEdit?.candidateProgramme?.map((value : CandidateProgramme, index : number) => {
        if (value.id == data?.data?.updateCandidateProgramme?.id) {
          return value = data?.data?.updateCandidateProgramme as CandidateProgramme
        } else {
          return value as CandidateProgramme
        }
      }) as CandidateProgramme[]

      programmeToEdit.candidateProgramme = EditedSingleProgramme;

      props.setSingleProgramme(programmeToEdit);
      props.setToEditChestNo('')

    } else {
      data.error?.message.split("]")[1].startsWith(" target")
        ? toast.error("server error")
        : toast.error(data.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        value={chestNo as string}
        className={`text-lg font-bold w-8/12 border-2 border-secondary rounded-md`}
        id={`input-${props.candidate?.chestNO}-${props.selectedProgramme.programCode}`}
        onChange={(e) => {
          setChestNo(e.target.value);
          console.log(e.target.value);
          props?.allCandidates?.map((candidate, index) => {
            if (candidate.chestNO == e.target.value) {
              console.log(candidate);
              console.log(e.target.value);

              (
                document.getElementById(
                  `name-${props.candidate?.chestNO}-${props.selectedProgramme.programCode}`
                ) as any
              ).innerText = candidate.name as string;
              return;
            }
          });
        }}
      />
      <div
        onClick={async() => {
          console.log("clicked");

          await HandleSubmit()

          // var newChestNo: any = (
          //   document.getElementById(
          //     `input-${props.candidate?.chestNO}-${props.selectedProgramme.programCode}`
          //   ) as any
          // ).value;
          // console.log(newChestNo);
          // const updatedCandidate = props.candidate as any;
          // updatedCandidate.chestNO = newChestNo;
          // props?.allCandidates?.map((candidate, index) => {
          //   if (candidate.chestNO == newChestNo) {
          //     updatedCandidate.name = candidate.name;
          //   }
          // });
        }}
      >

      <SubmitIcon className="w-7 h-7 bg-white cursor-pointer text-secondary" />
      </div>
    </div>
  );
};

export default EditableSingle;
