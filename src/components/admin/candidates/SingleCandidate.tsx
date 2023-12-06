"use client";
import Modal from "@/components/Modal";
import {
  Candidate,
  Category,
  DeleteCandidateDocument,
  DeleteCandidateMutation,
  DeleteCandidateMutationVariables,
  GetOneCandidateDocument,
  GetOneCandidateQuery,
  GetOneCandidateQueryVariables,
  Team,
} from "@/gql/graphql";
import { useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import EditCandidate from "./EditCandidate";
import CreateCandidate from "./CreateCandidate";
import ViewCandidate from "./ViewCandidate";
import ExcelUploadCandidate from "./ExcelUploadCandidate";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import { EditIcon, DeleteIcon } from "@/icons/action";
import { API_KEY } from "@/lib/env";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Candidate[];
  setData: React.Dispatch<React.SetStateAction<Candidate[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  isExcelUpload: boolean;
  setIsExcelUpload: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Category[];
  teams: Team[];
  isImageUpload: boolean;
  setIsImageUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

const OneCandidate = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOneCandidateQuery,
    GetOneCandidateQueryVariables
  >({
    query: GetOneCandidateDocument,
    variables: {
      id: props.id,
      api_key : API_KEY
    },
    pause: props.isCreate || props.isEdit || props.isExcelUpload,
  });

  const [state, DeleteCandidateExecute] = useMutation(DeleteCandidateDocument);

  const HandleDelete = async () => {
    const deletedData: OperationResult<
      DeleteCandidateMutation,
      DeleteCandidateMutationVariables
    > = await DeleteCandidateExecute({
      id: props.id,
    });

    if (deletedData.data?.removeCandidate?.__typename) {
      const deleted = props.data.filter((value, index) => {
        return value.id !== props.id;
      });

      props.setData(deleted);
      props.setIsOpen(false);
    }
    setModalOpen(false);
  };

  const Candidate = data?.candidate;

  return (
    <>
      {props.isEdit ? (
        <EditCandidate
          key={1}
          setIsEdit={props.setIsEdit}
          isEdit={props.isEdit}
          data={props.data}
          setData={props.setData}
          selectedCandidate={Candidate as Candidate}
          categories={props.categories as Category[]}
          teams={props.teams as Team[]}
        />
      ) : props.isCreate ? (
        <CreateCandidate
          key={1}
          data={props.data}
          setData={props.setData}
          categories={props.categories}
          teams={props.teams}
        />
      ) : props.isExcelUpload ? (
        <ExcelUploadCandidate
          data={props.data as Candidate[]}
          setData={props.setData}
          isExcelUpload={props.isExcelUpload}
          setIsExcelUpload={props.setIsExcelUpload}
          key={1}
        />
      ) : props.isImageUpload ? (
        <ImageUpload />
      ) : (
        <>
          {fetching ? (
            <p> loading... </p>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <span></span>
              <div className="flex flex-col items-center max-h-full overflow-hidden">
                <div
                  className="h-36 w-36 rounded-full border-8 border-secondary"
                  style={{
                    backgroundImage: `url('https://drive.google.com/uc?id=${
                      Candidate?.imageId
                        ? Candidate?.imageId
                        : "1469PGeDEgnK5caEumLfGGUufCI0MY133"
                    }')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p className="bg-secondary px-2 text-white font-bold text-2xl -mt-5 rounded-md">
                  {Candidate?.chestNO}
                </p>
                <p className="font-bold text-2xl leading-7 mt-2 text-center">
                  {Candidate?.name}   
                </p>
                <p className=" font-bold">Team {Candidate?.team?.name}</p>
                <p className="">{Candidate?.category?.name}</p>
                <div className="flex justify-center gap-3 mt-3 ">
                  <div className="flex flex-col items-center justify-center content-center w-20 h-20 rounded-xl  border-2 border-dashed border-secondary">
                    <p className="font-bold">Arts</p>
                    <p className="font-bold text-5xl text-secondary">{Candidate?.individualPoint || 0}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center content-center w-20 h-20 rounded-xl  border-2 border-dashed border-secondary">
                    <p className="font-bold">Sports</p>
                    <p className="font-bold text-5xl text-secondary">{Candidate?.individualSportsPoint || 0}</p>
                  </div>

                </div>
              </div>
              <div className="flex w-full justify-center gap-2">
                <button
                  className="bg-secondary border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
                  onClick={() => setIsViewOpen(true)}
                >
                  View More
                </button>
                <button
                  className=" border-2 text-white px-3 py-2 border-secondary rounded-xl font-bold"
                  onClick={() => {
                    props.setIsEdit(true);
                    props.setIsCreate(false);
                  }}
                >
                  <EditIcon
                    className="w-4 h-4 cursor-pointer fill-secondary  transition-all"
                  /> 
                </button>
                <button
                  className=" border-2 text-white px-3 py-2 border-secondary rounded-xl font-bold"
                  onClick={() => setModalOpen(true)}
                >
                  <DeleteIcon
                    className="w-4 h-4 cursor-pointer fill-secondary  transition-all"
                  />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
        <p className=" font-[500] ">Are you sure Do you want to Delete ?</p>
        <div className="w-full h-full flex gap-2 mt-1 p-2">
        <button className="focus:outline-none text-white bg-error hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={HandleDelete}>
          Delete
        </button>
        <button className="text-white bg-info hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
        </div>
     
      </Modal>

      <ViewCandidate
        data={props.data}
        setData={props.setData}
        modalOpen={isViewOpen}
        setModalOpen={setIsViewOpen}
        selectedCandidate={Candidate as Candidate}
      />
    </>
  );
};

export default OneCandidate;
