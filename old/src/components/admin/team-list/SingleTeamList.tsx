"use client";
import Modal from "@/components/Modal";
import {
  Programme,
  Candidate,
  DeleteCandidateProgrammeDocument,
  DeleteCandidateProgrammeMutation,
  DeleteCandidateProgrammeMutationVariables,
  Category,
  Skill,
  GetDetailedProgrammeQuery,
  GetDetailedProgrammeQueryVariables,
  GetDetailedProgrammeDocument,
  Type,
  CandidateProgramme,
} from "@/gql/graphql";

import { useEffect, useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import ExcelUploadProgramme from "./ExcelUploadTeamList";
import ExcelUploadGroupTeamList from "./ExcelUploadGroupTeamList";
import { API_KEY } from "@/lib/env";
import { DeleteIcon, EditIcon } from "@/icons/action";
import { IconArrowDown, IconArrowUp } from "@/icons/arrows";
import CreateSingle from "./CreateSingle";
import CreateGroup from "./CreateGroup";
import EditableSingle from "./EditableSingle";
import CandiatesOfGroup from "./CandiatesOfGroup";
import { toast } from "react-toastify";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Programme[];
  setData: React.Dispatch<React.SetStateAction<Programme[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  skill: string;
  category: string;
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  isExcelGroupUpload: boolean;
  setExcelGroupUpload: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  skills: Skill[];
  selectedProgramme: Programme;
  allCandidates: Candidate[];
}

const OneProgramme = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toEditChestNo, setToEditChestNo] = useState<string>("");
  const [openedGroup, setOpenedGroup] = useState<string>("");
  const [toDelete, setToDelete] = useState<CandidateProgramme>();
  const [SingleProgramme, setSingleProgramme] = useState<Programme>()

  const [{ fetching, data, error }] = useQuery<
    GetDetailedProgrammeQuery,
    GetDetailedProgrammeQueryVariables
  >({
    query: GetDetailedProgrammeDocument,
    variables: {
      id: props.selectedProgramme?.id as number,
      api_key: API_KEY,
    },
  });

  useEffect(() => {
    if (data?.programme) {
      setSingleProgramme(data.programme); // Set the data to your state
    }
  }, [data]);

  const [ state , DeleteCandidateProgrammeExecute ] = useMutation(
    DeleteCandidateProgrammeDocument
  );

  const HandleDelete = async () => {
    const deletedData: OperationResult<
      DeleteCandidateProgrammeMutation,
      DeleteCandidateProgrammeMutationVariables
    > = await DeleteCandidateProgrammeExecute({
      id: toDelete?.id as number,
    });

    if (deletedData.data?.removeCandidateProgramme?.__typename) {
      toast.success(
        `candidate ${toDelete?.candidate?.chestNO} ${(Programme?.type as unknown as Type) != Type.Single && '& team'} removed from Program ${props.selectedProgramme?.programCode} successfully`
      );
      const programmeToDelete: Programme = SingleProgramme as Programme;

      const DeletedSingleProgramme: CandidateProgramme[] = programmeToDelete?.candidateProgramme?.filter((value: CandidateProgramme, index: number) => {
        console.log(value.candidate?.chestNO, "  ", toDelete);

        return value.candidate?.chestNO !== toDelete?.candidate?.chestNO
      }) as CandidateProgramme[]

      programmeToDelete.candidateProgramme = DeletedSingleProgramme;

      console.log(programmeToDelete);


      setSingleProgramme(programmeToDelete);

    } else {
      toast.error('data not deleted');
    }
    console.log(deletedData);

    setModalOpen(false);
  };



  const Programme = data?.programme;

  const totalCandidatesCount = Programme?.candidateProgramme?.length;
  const outOfCandidatesCount =
    (Programme?.type as unknown as Type) == Type.Single
      ? (Programme?.candidateCount as number) * 4
      : (Programme?.groupCount as number) * 4;

  return (
    <div
      onClick={() => {
        console.log(props.selectedProgramme?.id);
      }}
    >
      {props.isExcelUpload ? (
        <ExcelUploadProgramme
          data={props.data}
          setData={props.setData}
          isExcelUpload={props.isExcelUpload}
          setIsExcelUpload={props.setIsExcelUpload}
          key={1}
        />
      ) : props.isExcelGroupUpload ? (
        <ExcelUploadGroupTeamList
          data={props.data}
          setData={props.setData}
          isExcelUpload={props.isExcelUpload}
          setIsExcelUpload={props.setIsExcelUpload}
          key={1}
        />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="">
              <p>{data?.programme?.programCode}</p>
              <p>{data?.programme?.name}</p>
              <p>
                Candidates{" "}
                <span className="text-black font-extrabold">
                  {" "}
                  {totalCandidatesCount} / {outOfCandidatesCount}{" "}
                </span>
              </p>
              {SingleProgramme?.candidateProgramme?.map((value, index) => {
                // setCandidateName(value.candidate?.name as string)
                return (
                  <div
                    key={index}
                    className="bg-white rounded-md m-1 p-2 transition-all"
                  >
                    <div className="flex justify-between">
                      {/* <p className="text-lg font-bold">{value.candidate?.chestNO}</p> */}
                      {(Programme?.type as unknown as Type) == Type.Single &&
                        toEditChestNo === value.candidate?.chestNO ? (
                        <EditableSingle
                          key={index}
                          allCandidates={props.allCandidates}
                          candidate={value.candidate}
                          haveEditngChestNo
                          selectedProgramme={props.selectedProgramme}
                          id={value.id as number}
                          setSingleProgramme={setSingleProgramme as any}
                          singleProgramme={SingleProgramme as Programme}
                          setToEditChestNo={setToEditChestNo}
                          toEditChestNo={toEditChestNo}
                        />
                      ) : (
                        <input
                          type="text"

                          value={value.candidate?.chestNO as string}
                          className="text-lg font-bold w-1/3 bg-inherit text-secondary"
                          disabled
                        />
                      )}

                      <div className="flex ">
                        <div
                          onClick={() => {
                            setToEditChestNo(
                              value.candidate?.chestNO as string
                            );
                            console.log(
                              toEditChestNo === value.candidate?.chestNO
                            );
                            (Programme?.type as unknown as Type) !=
                              Type.Single &&
                              setOpenedGroup(
                                value.candidate?.chestNO as string
                              );
                          }}
                          className="m-2 cursor-pointer"
                        >
                          <div className="border-2 border-secondary py-1 px-1 rounded-md">

                            <EditIcon className="fill-secondary w-3 h-3 "></EditIcon>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            setToDelete(value as CandidateProgramme);
                            setModalOpen(true);
                          }}
                          className="m-2 cursor-pointer"
                        >
                          <div className="border-2 border-secondary py-1 px-1 rounded-md">
                            <DeleteIcon className="fill-secondary w-3 h-3 "></DeleteIcon>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {/* candiates name , if group programme then leaders name */}
                      <p
                        className="text-secondary font-semibold"
                        id={`name-${value.candidate?.chestNO}-${props.selectedProgramme?.programCode}`}
                      >
                        {value.candidate?.name}{" "}
                        {(Programme?.type as unknown as Type) == Type.Single
                          ? ""
                          : "& Team"}
                      </p>
                      {(Programme?.type as unknown as Type) == Type.Single ? (
                        ""
                      ) : // if group programme , the icon to see and hide all candidates of group
                        openedGroup != value.candidate?.chestNO ? (
                          <div
                            onClick={() => {
                              setOpenedGroup(value.candidate?.chestNO as string);
                              console.log(
                                openedGroup === value.candidate?.chestNO
                              );
                              console.log(openedGroup);
                            }}
                          >
                            <div className="p-[2px] bg-white border-2 border-secondary rounded-md mr-2">
                            <IconArrowDown className="w-4 h-4 cursor-pointer text-secondary text-semibold" />
                            </div>
                              
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setOpenedGroup("");
                              setToEditChestNo("");
                            }}
                          >
                            <div className="p-[2px] bg-white border-2 border-secondary rounded-md mr-2">
                            <IconArrowUp className="w-4 h-4 cursor-pointer text-secondary text-semibold" />
                            </div>
                          </div>
                        )}
                    </div>
                    {openedGroup === value.candidate?.chestNO ? (
                      (Programme?.type as unknown as Type) == Type.Single ? (
                        ""
                      ) : (
                        <CandiatesOfGroup
                          allCandidates={props.allCandidates as Candidate[]}
                          candidate={value.candidate}
                          candidatesOfGroup={
                            value?.candidatesOfGroup as Candidate[]
                          }
                          haveEditngChestNo
                          selectedProgramme={
                            props.selectedProgramme as Programme
                          }
                          toEditChestNo={toEditChestNo}
                          key={index}
                          id={value.id as number}
                          setSingleProgramme={setSingleProgramme as any}
                          setToEditChestNo={setToEditChestNo}
                          singleProgramme={SingleProgramme as Programme}
                        />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              {props.isCreate ? (
                (Programme?.type as unknown as Type) == Type.Single ? (
                  <CreateSingle
                    allCandidates={props.allCandidates}
                    programmeCode={props.selectedProgramme?.programCode as string}
                    isCreate={props.isCreate}
                    setIsCreate={props.setIsCreate}
                    setSingleProgramme={setSingleProgramme as any}
                    singleProgramme={SingleProgramme as Programme}
                  />
                ) : (
                  <CreateGroup
                    Programme={Programme as Programme}
                    allCandidates={props.allCandidates}
                    setIsCreate={props.setIsCreate}
                    setSingleProgramme={setSingleProgramme as any}
                    singleProgramme={SingleProgramme as Programme}
                  />
                )
              ) : null}

              {!props.isCreate &&
                <div className="w-full h-full flex items-center justify-center">
                  <button
                    className={` ${totalCandidatesCount == outOfCandidatesCount
                        ? "bg-base-300 py-1 px-7 rounded-md cursor-not-allowed"
                        : "bg-green-400 py-1 px-7 rounded-md "
                      } `}
                    onClick={
                      () => {
                        totalCandidatesCount != outOfCandidatesCount &&
                          props.setIsCreate(true);
                      }
                      // props.setIsOpen(true)
                    }
                  >
                    Add
                  </button>
                </div>
              }
            </div>
          )}
        </div>
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
        <p>Are you sure Do you want to Delete {toDelete?.candidate?.chestNO} {(Programme?.type as unknown as Type) != Type.Single && '& team'} from program {props.selectedProgramme?.programCode} ?</p>
        <button className="bg-red-600" onClick={HandleDelete}>
          Delete
        </button>
        <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default OneProgramme;
