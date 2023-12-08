'use client';
import { Category, Programme } from '@/gql/graphql';
import { SERVER_URL } from '@/lib/urql';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import React, { useState } from 'react';
import { cacheExchange, fetchExchange } from 'urql';
import CreateProgram from './CreateProgram';
import DeleteProgramme from './DeleteProgram';
import ViewProgram from './ViewProgram';

interface Props {
  programmes: Programme[];
  categories: Category[];
}
function Programs(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [programs, setPrograms] = useState<Programme[]>(props.programmes);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState<Programme >();
  const [view , setIsView] = useState(false)
  const filteredData = programs.filter((program) => {
    return (
      program?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program?.programCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <>
      <div className="p-12 pt-0 lg:p-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center font-extrabold text-3xl text-primary mb-3">
            Program Search
          </h1>
          <div className="md:w-2/3 flex gap-2">
            <input
              type="text"
              placeholder="Search by name or chest number.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-dashed border-primary"
            />
            <button
              className="bg-primary rounded-xl px-4 py-2 "
              onClick={() => {
                setIsCreate(true);
              }}
            >
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
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {filteredData.map((program, index) => (
              <div onClick={
                ()=>{
                  setSelected(program)
                  setIsView(true)
                }
              } className="w-72 bg-secondary p-6 rounded-xl flex flex-col gap-2 items-start cursor-pointer">
                <div className="flex justify-between items-center w-full">
                  {' '}
                  <h1 className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                    {program.category?.name}
                  </h1>
                  <h1 className="text-primary font-semibold">
                    {program.candidateCount} Candidates
                  </h1>
                </div>
                <div className="line-clamp-2 border-2 h-16 p-3 my-2 border-primary flex items-center justify-center rounded-xl border-dashed w-full">
                  <p className="line-clamp-2 text-center">{program.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CreateProgram
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        categories={props.categories}
        setPrograms={setPrograms}
        programs={programs}
        />
        <ViewProgram
        isView={view}
        setIsView={setIsView}
        categories={props.categories}
        setPrograms={setPrograms}
        programs={programs}
        selected={selected as Programme}
        />
        <DeleteProgramme
         programmes={programs}
         setProgrammes={setPrograms}
         isDelete={isDelete}
         setIsDelete={setIsDelete}
         selected={selected as Programme}
        />
    </>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    cache: 'no-cache',
    credentials: 'include',
  },
}))(Programs);
