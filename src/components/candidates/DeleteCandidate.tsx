import { Candidate } from '@/gql/graphql';
import React from 'react'
interface Props {
  isDelete : boolean
  setIsDelete : React.Dispatch<React.SetStateAction<boolean>>;
  candidates : Candidate[];
  setCandidates : React.Dispatch<React.SetStateAction<Candidate[]>>;
}

function DeleteCandidate(props:Props) {
  return (
    <div>DeleteCandidate</div>
  )
}

export default DeleteCandidate