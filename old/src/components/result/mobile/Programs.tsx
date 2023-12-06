"use client"
import { Category, Programme, Team, Types } from "@/gql/graphql"
import { User2Icon } from "@/icons/home"
import { useEffect, useState } from "react"

interface Props {
  programs: Programme[]
  categories: Category[]
  teams: Team[]
}

export default function Programs(props: Props) {
  const [sortedPrograms, setSortedPrograms] = useState<Programme[]>(props.programs)
  const [Search, setSearch] = useState<string>("")
  const [selectedProgram, setSelectedProgram] = useState<Programme | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [filteredSelectedProgram, setFilteredSelectedProgram] = useState<Programme | null>(selectedProgram)

  // sort the programs by createdAt a Date Type

  useEffect(() => {
    const sorted = props.programs?.sort((a, b) => {
      return (new Date(b?.createdAt as string).getTime() - new Date(a?.createdAt as string).getTime())
    })
    setSortedPrograms(sorted)
  }
    , [])


  return (
    <div className="h-[80vh] bigphone:h-[30rem] mx-auto min-h-14 w-[90%] flex gap-2 relative">
      {/* programs */}
      <div className="h-full w-full bg-gray-100 rounded-3xl overflow-hidden">
        <div className="h-1/5 w-full px-5 flex flex-col justify-end leading-tight">
          <h1 className="text-2xl bigphone:text-4xl font-bold">Programs</h1>
          <h1 className="text-xs bigphone:text-sm">Tap to view</h1>
        </div>
        <hr className="border-1 border-primary pb-2" />
        <div className="h-6 bigphone:h-10 w-full flex gap-2 items-center px-2">

          <select onChange={(e) => {
            // filter the programs by category
            if (e.target.value === 'all') {
              setSortedPrograms(props.programs)
            }
            else {
              const filtered = props.programs?.filter((program) => {
                return program.category?.name === e.target.value
              })
              setSortedPrograms(filtered)
            }
          }} className="h-6 bigphone:h-8 border rounded-xl flex items-center text-[10px]" name="" id="">
            <option value={'all'} key={1000} >All Category</option>
            {
              props.categories?.map((category, index) => {
                return (
                  <option key={index} value={category.name as string} >{category.name}</option>
                )
              })
            }
          </select>
          
          <form className="w-full rounded-xl overflow-hidden h-6 bigphone:h-8 border border-primary flex">
            <div className="relative flex items-center w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none w-full">
                <svg
                  className="w-2 h-2 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={Search} onChange={(e) => {
                  setSearch(e.target.value)
                  const filtered = props.programs?.filter((program) => {
                    return program.name?.toLowerCase().includes(e.target.value.toLowerCase()) || program.programCode?.toLowerCase().includes(e.target.value.toLowerCase())
                  })
                  setSortedPrograms(filtered)
                }}
                type="text"
                id="default-search"
                className="block w-full h-6 bigphone:h-8 pl-10 text-xs text-gray-900 rounded-lg bg-gray-50"
                placeholder="Search for programs..."
              />
            </div>
          </form>
        </div>
        <hr className="border-1 border-primary mt-2" />
        <div className="w-full h-[73%] p-2 overflow-y-auto">
          {sortedPrograms &&
            sortedPrograms.map((program, index) => {
              return (
                <div key={index} onClick={() => {
                  // firstly sort the candidates by their point
                  program?.candidateProgramme?.sort((a, b) => {
                    return (b?.point as number) - (a?.point as number)
                  })
                  setSelectedProgram(program)
                  setFilteredSelectedProgram(program)
                }}
                  className="flex h-14 w-full bg-accent rounded-3xl items-center justify-between px-2 mt-2">
                  <div className="flex gap-2">
                    <p className="font-semibold text-xs bigphone:text-sm">
                    {program.programCode}
                    </p>
                    <p className="text-xs bigphone:text-sm">
                    {program.name?.toUpperCase()}
                    </p>
                  </div>
                  <p className="text-xs bigphone:text-sm">{program.category?.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* Results */}
      <div
        className={`h-full w-full ${ !selectedProgram ? `translate-x-[120%]` : 'translate-x-0'} bg-gray-100 rounded-3xl transition-all duration-500 overflow-hidden absolute z-50 top-0 left-0`}
      >
        <div
          className="h-1/5 w-full px-5 flex items-center leading-tight justify-between"
        >
          <div className="flex flex-col">
          <h1 className="text-2xl bigphone:text-2xl font-bold">Results</h1>
          <h3 className="text-md  font-bold"> {selectedProgram?.name} </h3>
          <h3 className="text-sm  font-bold"> {selectedProgram?.category?.name} </h3>
          </div>

          <button onClick={()=>{
            setSelectedProgram(null)
            setFilteredSelectedProgram(null)
          }} className="p-2 text-white font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-primary h-10 w-10 bigphone:h-14 bigphone:w-14" viewBox="0 -960 960 960"><path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </button>
        </div>

        <hr className="border-1 border-primary" />

        <div className="w-full h-[80%] p-2 overflow-y-auto">

          {
            filteredSelectedProgram ?
            (
              filteredSelectedProgram.candidateProgramme?.map((candidate, index) => {

                if(!candidate.position && !candidate.grade){
                  return <div></div>
                }

                return (

                  <div
                  className="flex h-14 w-full bg-accent rounded-3xl items-center justify-between pr-2 pl-9 mt-2 relative"
                >
                  {/* <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="" className="h-8 rounded-full absolute left-0" /> */}
                  {candidate.candidate?.imageId ? <img
                      src={`https://drive.google.com/uc?export=view&id=${candidate.candidate?.imageId}`}
                      alt=""
                      className="h-8 w-8 rounded-full absolute -left-1"
                    /> :
                      <User2Icon className="h-8 w-8 rounded-full absolute border -left-1 fill-secondary bg-white p-2" />

                    }
                  <div className="flex gap-2">
                    <p className="font-semibold text-[10px] bigphone:text-xs">{candidate.position?.value}{candidate.position?.value == 1 ? 'st' : candidate.position?.value == 2 ? 'nd' : candidate.position?.value == 3 ? 'rd' : ''  }</p>
                    <p className=" text-[10px] bigphone:text-xs">{candidate.candidate?.chestNO}</p>
                    <p className="text-[10px] bigphone:text-xs">{ selectedProgram?.type  == Types.Group ?
                        candidate.candidate?.name + " & team" :
                        selectedProgram?.type  == Types.Single ?
                          candidate.candidate?.name :
                          candidate.candidate?.team?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[10px] bigphone:text-xs">{candidate.candidate?.team?.name}</p>
      
                    <p className="text-[10px] bigphone:text-xs">{candidate.grade?.name}</p>
                  </div>
      
                </div>
                )
              }
              )
            ) : (
              <div></div>
            )
            }


        </div>
      </div>
    </div>
  )
}