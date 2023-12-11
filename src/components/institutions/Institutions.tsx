"use client";
import { Roles, Team, Zone } from "@/gql/graphql";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import CreateTeam from "./CreateInstitution";
import UpdateTeam from "./UpdateInstitution";
import DeleteTeam from "./DeleteInstitution";
import { useGlobalContext } from "@/context/context";
interface Props {
  teams: Team[];
  zones : Zone[]
}
function Institutions(props: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [institutions, setInstitutions] = useState<Team[]>(props.teams);
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selected, setSelected] = useState<Team | null>(null);

  const { data } = useGlobalContext();
  const filteredData = institutions.filter((institution) => {
    return (
      institution?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return <>
  <div className="p-12 pt-0 lg:p-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center font-extrabold text-3xl text-brown mb-3">
            Institution Search
          </h1>
          <div className="md:w-2/3 flex gap-2">
            <input
              type="text"
              placeholder="Search by name or chest number.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-dashed border-brown"
            />
            {(data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
               <button
               className="bg-brown rounded-xl px-4 py-2 "
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
            {filteredData.map((institution, index) => (
              <div
                className="w-72 bg-secondary p-6 rounded-xl flex flex-col gap-2 items-start "
                key={index}
                onClick={() => setSelected(institution)}
              >
                <h1 className="px-2 py-1 bg-brown inline rounded-lg text-white font-semibold">
                  {institution.zone?.name ? institution.zone?.name : "NIL"}
                </h1>
                <p className="line-clamp-2 h-12">{institution.name}</p>
                {
                  (data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
                    <div className="flex w-full justify-between">
                    <button onClick={()=>{
                      setIsUpdate(true)
                      setSelected( institution )
                    }} className="bg-white border border-dashed border-brown rounded-xl px-4 py-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-brown"
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
                      setSelected( institution )
                    }}  className="bg-white border border-dashed border-brown rounded-xl px-4 py-2 ">
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

      <CreateTeam
      isCreate={isCreate}
      setIsCreate={setIsCreate}
      teams={institutions}
      setTeams={setInstitutions}
      zones={props.zones}
      />
      <UpdateTeam
      isUpdate={isUpdate}
      setIsUpdate={setIsUpdate}
      teams={institutions}
      setTeams={setInstitutions}
      zones={props.zones}
      selected={selected as Team}
      />
      <DeleteTeam
        candidates={institutions}
        setTeams={setInstitutions}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        selected={selected}
      />
  </>;
}
export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(Institutions);
