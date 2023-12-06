"use client";
import { Category } from "@/gql/graphql"
import { User2Icon } from "@/icons/home";
import { useState } from "react"

interface Props {
  toppers: Category[]
  categories: Category[]
}
export default function Toppers(props: Props) {
  const [selectedCategoryToppers, setSelectedCategoryToppers] = useState<Category>(props.toppers[0])
  return (
    <div className="h-[30rem] mx-auto min-h-14 min-w-[80%] w-[96%] flex gap-2 flex-col relative">

      {/* deleted content */}

      {/* toppers */}
      <div className="h-full w-full overflow-hidden">
        <div
          className="h-1/6 w-full flex items-center justify-between px-2 bigphone:px-10"
        >
          <h1 className="text-2xl bigphone:text-4xl font-bold">
            #Leading Now
          </h1>
          <div className="flex">
            <div className="flex items-center gap-5">
              {/* <button
            className="h-6 bigphone:h-8 bg-primary border rounded-xl flex items-center"
          >
            <h1
              className="text-xs bigphone:text-base px-2 text-white font-bold"
            >
              All
            </h1>
          </button> */}
              <button
                className="h-6 bigphone:h-8 border rounded-xl flex items-center"
              >
                <select onChange={(e) => {
                  const selected = props.categories.find((category) => {
                    return category.name == e.target.value
                  })

                  // find the toppers of the selected category
                  const selectedToppers = props.toppers.find((topper) => {
                    return topper.name == selected?.name
                  })

                  setSelectedCategoryToppers(selectedToppers as Category)

                }}
                  name="" id="" className="h-6 bigphone:h-8 border rounded-xl flex items-center text-[10px]">
                  {
                    props.categories.map((category, index) => {
                      return (
                        <option className="text-[10px]" key={index} value={category.name as string}>{category.name}</option>
                      )
                    })
                  }
                </select>
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-[98%] h-4/5 bigphone:h-full mx-auto overflow-x-auto whitespace-nowrap overflow-y-hidden"
        >
          {
             
              selectedCategoryToppers?.candidates?.map((candidate, index) => {
                return (
                  <div className="h-full w-48 pt-[15%] inline-block relative ml-6">
                    <div className="rounded-full h-44 w-44 mx-auto border-4 border-primary overflow-hidden">
                      
                    { candidate.imageId ?
                      <img
                      src={`https://drive.google.com/uc?export=view&id=${candidate?.imageId}`}
                      alt=""
                      className=""
                    />
                    :
                      <User2Icon className="h-full w-full rounded-full  border  fill-secondary bg-white p-2" />
                    }
                    
                    </div>
                  
      
                  <div
                    className="bg-green-500 h-8 w-8 rounded-full absolute top-[15%] bigphone:top-[22%] left-[65%] pt-[.1rem]"
                  >
                    <h1 className="text-center font-bold text-white text-lg">
                      #{index + 1}
                    </h1>
                  </div>
      
                  <div
                    className="bg-green-500 h-5 rounded-full absolute top-[56%] left-[39%] bigphone:left-[32%] bigphone:top-[58%] pt-[.02rem]"
                  >
                    <h1 className="text-center font-bold text-white text-sm px-2">
                    {candidate.chestNO}
                    </h1>
                  </div>
      
                  <p className="text-center pt-1 font-semibold mt-2">
                  {candidate.name}
                  </p>
                  <p className="text-center text-sm">{candidate.category?.name}</p>
                  <p className="text-center text-sm">Team {candidate.team?.name}</p>
                </div>
                )
              })
          }
        </div>
      </div>
      {/* end */}
    </div>
  )
}