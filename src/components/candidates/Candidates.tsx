'use client';
import { Candidate, Category, Team } from '@/gql/graphql';
import { SERVER_URL } from '@/lib/urql';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { cacheExchange, fetchExchange } from 'urql';
import CreateCandidate from './CreateCandidate';
import UpdateCandidate from './UpdateCandidate';
import DeleteCandidate from './DeleteCandidate';

interface Props {
  candidates: Candidate[];
  categories: Category[];
  teams: Team[];
}
function Candidates(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>(props.candidates);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState<Candidate | null>(null);
  const filteredData = candidates.filter((candidate) => {
    return (
      candidate?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate?.chestNO?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>

      <div className="p-12 pt-0 lg:p-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center font-extrabold text-3xl text-primary mb-3">
            Candidate Search
          </h1>
          <div className="md:w-2/3 flex gap-2">
            <input
              type="text"
              placeholder="Search by name or chest number.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-dashed border-primary"
            />
            <button className="bg-primary rounded-xl px-4 py-2 " onClick={
              ()=>{
                setIsCreate(true)
              }
            }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          <div 
           className="flex flex-wrap gap-2 justify-center mt-3">
            {filteredData.map((candidate, index) => (
              <div
                className="w-72 bg-secondary p-6 rounded-xl flex flex-col gap-2 items-start cursor-pointer"
                key={index}
                onClick={() => setSelected(candidate)}
              >
                <h1 className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                  {candidate.chestNO}
                </h1>
                <p className="line-clamp-2 h-12">{candidate.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateCandidate candidates={candidates} setCandidates={setCandidates} isCreate={isCreate} setIsCreate={setIsCreate} categories={props.categories} teams={props.teams}/>
      <UpdateCandidate candidates={candidates} setCandidates={setCandidates} isUpdate={isUpdate} setIsUpdate={setIsUpdate} selected={selected} categories={props.categories} teams={props.teams} />
      <DeleteCandidate candidates={candidates} setCandidates={setCandidates} isDelete={isDelete} setIsDelete={setIsDelete}/>
    </>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [ cacheExchange , fetchExchange ],
  fetchOptions: {
    cache: 'no-cache',
    credentials: 'include',
  },
}))(Candidates);
