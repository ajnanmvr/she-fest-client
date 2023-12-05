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
  Mode,
  Team,
} from "@/gql/graphql";
import { useState } from "react";
import { OperationResult, useMutation, useQuery } from "urql";
import ViewCandidate from "./ViewTeamCandidate";

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
}

const OneTeamCandidate = (props: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);

  const [{ fetching, data }] = useQuery<
    GetOneCandidateQuery,
    GetOneCandidateQueryVariables
  >({
    query: GetOneCandidateDocument,
    variables: {
      id: props.id,
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
    <div>
      <div>
        {fetching ? (
          <p> loading... </p>
        ) : (
          <div>
            <p>name</p>
            <p className="text-blue-400">{Candidate?.name}</p>
            <p>id</p>
            <p className="text-blue-400">{Candidate?.id}</p>
            <p>adm no</p>
            <p className="text-blue-400">{Candidate?.adno}</p>
            <p>groupPoint</p>
            <p className="text-blue-400">{Candidate?.groupPoint}</p>
            <p>category</p>
            <p className="text-blue-400">{props.category}</p>
            <p>individualPoint</p>
            <p className="text-blue-400">{Candidate?.individualPoint}</p>
            <button
              className="bg-green-600"
              onClick={() => setIsViewOpen(true)}
            >
              View More
            </button>
          </div>
        )}
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} key={3}>
        <p>Are you sure Do you want to Delete ?</p>
        <button className="bg-red-600" onClick={HandleDelete}>
          Delete
        </button>
        <button className="bg-blue-500" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>

      <ViewCandidate
        data={props.data}
        setData={props.setData}
        modalOpen={isViewOpen}
        setModalOpen={setIsViewOpen}
        selectedCandidate={Candidate as Candidate}
      />
    </div>
  );
};

export default OneTeamCandidate;
