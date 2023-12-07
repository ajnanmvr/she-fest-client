import {
  Candidate,
  DeleteCandidateDocument,
  DeleteCandidateMutation,
  DeleteCandidateMutationVariables,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";
interface Props {
  isDelete: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  selected: Candidate | null;
}

function DeleteCandidate(props: Props) {
  const [state, DeleteCandidateExecute] = useMutation(DeleteCandidateDocument);

  const HandleDelete = async () => {
    const deletedData: OperationResult<
      DeleteCandidateMutation,
      DeleteCandidateMutationVariables
    > = await DeleteCandidateExecute({
      id: props.selected?.id as number,
    });

    if (deletedData.data?.removeCandidate?.__typename) {
      const deleted = props.candidates.filter((value, index) => {
        return value.id !== props.selected?.id;
      });

      props.setCandidates(deleted);
      props.setIsDelete(false);
    }
  };

  return (
    <div>
      <button onClick={() => [HandleDelete()]}>Delete</button>
    </div>
  );
}

export default DeleteCandidate;
