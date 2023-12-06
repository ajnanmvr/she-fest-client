import {
  EditCandidateProgrammeDocument,
  EditCandidateProgrammeMutation,
  EditCandidateProgrammeMutationVariables,
  Candidate,
  Programme,
  CandidateProgramme,
} from "@/gql/graphql";
import React, { useState } from "react";
import { OperationResult, useMutation } from "urql";
import { toast } from "react-toastify";

interface Props {
  candidate: Candidate;
  candidatesOfGroup: Candidate[];
  allCandidates: Candidate[];
  haveEditngChestNo: boolean;
  selectedProgramme: Programme;
  id: number;
  singleProgramme: Programme;
  setSingleProgramme: React.Dispatch<React.SetStateAction<Programme>>;
  toEditChestNo: string;
  setToEditChestNo: React.Dispatch<React.SetStateAction<string>>;
}

const CandiatesOfGroup = (props: Props) => {
  const DefoultChestNoms: string[] = props.candidatesOfGroup?.map(
    (obj: Candidate) => obj.chestNO
  ) as string[];
  const [chestNoms, setChestNoms] = useState<string[]>(DefoultChestNoms);

  const [state, EditSingleCPExecute] = useMutation(
    EditCandidateProgrammeDocument
  );

  const handleChestNomsChange = (index: number, value: string) => {
    const newChestNomsValues = [...chestNoms];
    newChestNomsValues[index] = value;
    setChestNoms(newChestNomsValues);
  };

  const HandleSubmit = async () => {
    console.log(props.selectedProgramme.programCode);
    console.log(props.selectedProgramme?.id);
    console.log(chestNoms);

    const data: OperationResult<
      EditCandidateProgrammeMutation,
      EditCandidateProgrammeMutationVariables
    > = await EditSingleCPExecute({
      chestNO: chestNoms[0] ? chestNoms[0] : ("" as string),
      programCode: props.selectedProgramme.programCode as string,
      candidatesOfProgramme: chestNoms,
      id: props.id as number,
    });

    if (data.data?.updateCandidateProgramme) {
      toast.success(
        `${chestNoms[0]} & team updated on program ${props.selectedProgramme?.programCode} successfully`
      );

      const programmeToEdit = props.singleProgramme;

      const EditedSingleProgramme: CandidateProgramme[] =
        programmeToEdit?.candidateProgramme?.map(
          (value: CandidateProgramme, index: number) => {
            if (value.id == data?.data?.updateCandidateProgramme?.id) {
              return (value = data?.data
                ?.updateCandidateProgramme as CandidateProgramme);
            } else {
              return value as CandidateProgramme;
            }
          }
        ) as CandidateProgramme[];

      programmeToEdit.candidateProgramme = EditedSingleProgramme;

      props.setSingleProgramme(programmeToEdit);
      props.setToEditChestNo("");

      //   props.setData([...props.data, datas.data?.createTeam as Team]);
    } else {
      data.error?.message.split("]")[1].startsWith(" target")
        ? toast.error("server error")
        : toast.error(data.error?.message.split("]")[1]);
    }
  };

  return (
    <div>
      {props.candidatesOfGroup?.map((item: Candidate, i: number) => {
        return (
          <div key={i} className="bg-base-200 m-2 rounded-lg p-2">
            {props.toEditChestNo === props.candidate?.chestNO ? (
              <div className="flex">
                <input
                  type="text"
                  className={`text-lg font-bold w-8/12 border-2 px-1 border-secondary rounded-md`}
                  defaultValue={item?.chestNO as string}
                  id={`input-${item?.chestNO}-${props.selectedProgramme.programCode}-${i}`}
                  onChange={(e) => {
                    handleChestNomsChange(i, e.target.value);
                    console.log(e.target.value);
                    props?.allCandidates?.map((candidate, index) => {
                      if (candidate.chestNO == e.target.value) {
                        console.log(candidate);
                        console.log(e.target.value);
                        // value.candidate?.chestNO = e.target.value

                        // (document.getElementById(`${value.candidate?.chestNO}`) as any).id = candidate.chestNO as string
                        (
                          document.getElementById(
                            `group-name-${item?.chestNO}-${props.selectedProgramme.programCode}-${i}`
                          ) as any
                        ).innerText = candidate.name as string;
                        return;
                      }
                      // else{
                      //   setHaveEditngChestNo(false)
                      // }
                    });
                  }}
                />
              </div>
            ) : (
              <input
                type="text"
                className="text-lg font-bold w-1/3 bg-inherit"
                defaultValue={item?.chestNO as string}
                disabled
              />
            )}

            <p
              id={`group-name-${item?.chestNO}-${props.selectedProgramme.programCode}-${i}`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
      {props.toEditChestNo === props.candidate?.chestNO && (
        <div className="w-full h-full flex items-center  justify-center">
          <button
            onClick={async () => {
              await HandleSubmit();
            }}
            className="bg-secondary py-[2px] px-4 text-white rounded-md"
          >
            Submit
          </button>
        </div>

      )}
    </div>
  );
};

export default CandiatesOfGroup;
