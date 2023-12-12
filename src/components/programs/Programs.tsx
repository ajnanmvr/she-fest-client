'use client';
import { Candidate, Category, Programme, Roles, Type, Types, Zone } from '@/gql/graphql';
import { SERVER_URL } from '@/lib/urql';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import React, { useState } from 'react';
import { cacheExchange, fetchExchange } from 'urql';
import CreateProgram from './CreateProgram';
import DeleteProgramme from './DeleteProgram';
import ViewProgram from './ViewProgram';
import { useGlobalContext } from '@/context/context';

interface Props {
  programmes: Programme[];
  categories: Category[];
  candidates: Candidate[];
  zones: Zone[];
}
function Programs(props: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [programs, setPrograms] = useState<Programme[]>(props.programmes);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState<Programme>(props.programmes[0]);
  const [view, setIsView] = useState(false);

  const { data } = useGlobalContext();

  const filteredData = programs?.filter((program) => {
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
             {(data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
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
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {filteredData?.map((program, index) => (
              <div
                className="w-72 bg-secondary p-6 rounded-xl flex flex-col gap-2 items-start "
              >
                <div className="flex justify-between items-center w-full">
                  {' '}
                  <h1 className="px-2 py-1 bg-primary inline rounded-lg text-white font-semibold">
                    {program.category?.name}
                  </h1>
                  <h1 className="text-primary font-semibold">
                    {
                      program.type == Types.Single ? program.candidateCount + " Candidates" : program.candidateCount + "x" + program.groupCount + " Groups"
                    }
                  </h1>
                </div>
                <div 
                onClick={() => {
                  setSelected(program);
                  setIsView(true);
                }} className="line-clamp-2 border-2 h-16 p-3 my-2 border-primary flex cursor-pointer items-center justify-center rounded-xl border-dashed w-full">
                  <p className="line-clamp-2 text-center">{program.name}</p>
                </div>
                {
                  (data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
                    <div className="flex w-full justify-between">
                    <button onClick={()=>{
                      setIsUpdate(true)
                      setSelected( program )
                    }} className="bg-white border border-dashed border-primary rounded-xl px-4 py-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button onClick={()=>{
                      setIsDelete(true)
                      setSelected( program )
                    }}  className="bg-white border border-dashed border-primary rounded-xl px-4 py-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  )
                }
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
        setSelected={setSelected}
        candidates={props.candidates}
        zones={props.zones}
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
