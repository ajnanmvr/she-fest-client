import { Candidate } from '@/gql/graphql';
import React from 'react'


interface Props {
  isView: boolean;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  selected: Candidate;
  setSelected: React.Dispatch<React.SetStateAction<Candidate>>;
}

const ViewCandidates = (props: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center  ${props.isView ? 'block' : 'hidden'
        } `}
    >
      <div className="p-5 bg-white rounded-xl gap-4">



        <div className='w-full flex justify-center gap-2 mt-2'>
          <div className="w-full   overflow-y-auto">
            {props.selected?.candidateProgrammes?.map((cp) => {
              return (
                <div className="border-2 border-primary rounded-lg p-3 my-2 w-full justify-between">
                  <p className="text-white font-black text-2xl bg-primary rounded-md  mx-auto">
                    {cp.programme?.programCode}
                  </p>
                  <p className="text-primary font-bold">
                    {cp.programme?.name}
                  </p>
                </div>
              );
            })}
          </div>
          <button
            className="bg-red-600 text-white py-1 px-2 rounded-md text-base"
            onClick={() => props.setIsView(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewCandidates