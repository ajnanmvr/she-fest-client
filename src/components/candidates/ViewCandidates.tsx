import { Candidate } from '@/gql/graphql';
import React from 'react'


interface Props {
    isView: boolean;
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
    selected: Candidate;
    setSelected: React.Dispatch<React.SetStateAction<Candidate>>;
  }

const ViewCandidates = (props:Props) => {
  return (
    <div
    className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${
      props.isView ? 'block' : 'hidden'
    } `}
  >
    <div className="p-5 bg-white rounded-xl gap-4">
    <p className='text-center text-lg'>
      Are you sure, do you want to visView candidate{' '}
      <span className="font-bold">{props.selected?.name}</span>?
    </p>
    <div className='w-full flex justify-center gap-2 mt-2'>
      <button
        className="bg-primary text-white py-1 px-2 rounded-md text-base"
        onClick={() => props.setIsView(false)}
      >
        Cancel
      </button>
    </div>
    </div>
  </div>
  )
}

export default ViewCandidates