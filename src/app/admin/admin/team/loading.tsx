import React from 'react'


const dataTopBar = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },

]

const mainData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },

]


const loading = () => {
  return (
    <>
      <div className="w-full h-full ">
        {/* <InfoBar dataTopBar={props.dataTopBar} /> */}

        {/* <div className="w-full flex flex-wrap md:flex-nowrap gap-10 justify-between  px-0 my-0 overflow-hidden">
          {
            dataTopBar.map((item, i) => (
              <div key={i} className="rounded-3xl flex-1 py-3 bg-[#EEEEEE] hidden lg:flex items-center justify-center flex-row animate-pulse ">
                <div class="flex items-center mt-4 space-x-3 animate-pulse">
                  <svg class="w-10 h-10 text-gray-200 dark:text-gray-700 fill-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div className=''>
                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div class="w-48 h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                  </div>
                </div>
                <div>

                </div>
              </div>
            ))
          }


        </div> */}


        {/* clode */}
        <div className="w-full h-screen lg:h-[90%] flex mt-[3%] ">
          <div className="flex-1 w-full">
            <div className="h-10 cursor-pointer flex justify-between mb-4 mx-0">
              {/* search bar */}
              <input disabled
                className="w-1/3 lg:w-1/4 rounded-full bg-[#EEEEEE] px-5 text-xl border-secondary animate-pulse"
                type="text"

              />
              <div className='flex items-center justify-center gap-0'>
                <button
                  className="inline-flex  text-white rounded-full px-9 py-4 font-bold bg-[#EEEEEE] animate-pulse"
                >

                </button>
                <button
                  className="ml-1  text-white rounded-full px-9 py-4 font-bold bg-[#EEEEEE] animate-pulse"
                >

                </button>
              </div>
            </div>

            <div className="flex ">
              <div className="co w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 m-0  ">
                {/* components */}
                {
                  mainData.map((item, i) => (
                    <div  key={i} className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-24  "  >
                      <div className="text-white font-bold bg-gray-300   px-7 py-3 animate-pulse text-xl rounded-xl flex justify-center content-center items-center ">  </div>
                      <p className="text-black leading-5 pr-[10%]" >

                      </p>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default loading