"use client";
import { Category } from "@/gql/graphql"
import { User2Icon } from "@/icons/home";
import { useState } from "react";

interface Props {
  toppers: Category[]
  categories: Category[]
}
export default function SecondRowFirstCard(props: Props) {
  const [selectedCategoryToppers, setSelectedCategoryToppers] = useState<Category>(props.toppers[0])

  
  return (
    <div className="2xl:w-[50%] w-[50%] rounded-3xl bg-[#F7F7F7] px-5 overflow-hidden h-[16rem] ">
      {/* title */}
      <div className="w-full h-[30%] flex items-center justify-between">
        <h1 className="text-4xl font-semibold leading-none">
          #Leading Now
        </h1>
        <div className="flex gap-2 h-full items-center">
          {/* <button className="h-6 bg-primary border border-primary rounded-xl flex items-center">
                      <p className="px-2 font-medium text-white text-sm">All</p>
                    </button> */}

          <select
            className="h-6 border border-primary rounded-xl flex items-center text-xs cursor-pointer"
            name=""
            id=""
            onChange={(e) => {
              const selected = props.categories.find((category) => {
                return category.name == e.target.value
              })

              // find the toppers of the selected category
              const selectedToppers = props.toppers.find((topper) => {
                return topper.name == selected?.name
              })

              setSelectedCategoryToppers(selectedToppers as Category)

            }}

          >
            {
              props.categories.map((category, index) => {
                // last category no need to show
                return (
                  <option className="text-[10px]" key={index} value={category.name as string}>{category.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      {/* Photos */}
      <div className="h-[80%] w-full overflow-x-scroll whitespace-nowrap overflow-y-hidden">
        {
          selectedCategoryToppers?.candidates?.map((candidate, index) => {
            return (
              <div className="h-full w-44 inline-block">
                <div className="relative  top-[1%]">
                  <div
                    className="2xl:w-28 2xl:h-28 w-20 h-20 rounded-full border-primary border mx-auto overflow-hidden"
                  >
                    {
                      candidate.imageId ?
                      <img
                      src={`https://drive.google.com/uc?export=view&id=${candidate?.imageId}`}
                      className="w-full h-full object-cover"
                      alt=""
                    /> 
                    :
                    <User2Icon className="h-full w-full rounded-full  border  fill-secondary bg-white p-2" />
                    }
                    
                  </div>
                  <span className="top-0  left-[58%] absolute h-6 w-6 bg-[#28B77B] rounded-full text-xs font-medium text-white flex items-center justify-center">
                    <h1 className="px-1">#{index + 1}</h1>
                  </span>
                  <span className="2xl:top-[6rem] left-[40%] top-[4.3rem]  absolute h-5 bg-[#28B77B] rounded-lg text-[10px] font-medium text-white flex items-center">
                    <h1 className="px-1">#{candidate.chestNO}</h1>
                  </span>
                  <div className="flex flex-col h-full w-full justify-center items-center mt-4">
                    <p className="text-xs font-semibold 2xl:left-[-.3rem] text-center 2xl:top-[7.3rem] left-[-1.3rem] top-[5.5rem]">
                      {candidate.name}
                    </p>
                    <p className="text-xs text-center 2xl:left-[.5rem] 2xl:top-[8.3rem] left-[-.5rem] top-[6.2rem]">
                      {candidate.category?.name}
                    </p>
                    <p className="text-[10px] text-center 2xl:left-[1.3rem] 2xl:top-[9.2rem] top-[7.1rem]">
                      Team {candidate.team?.name}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
        {/* end */}
      </div>
    </div>
  )
}