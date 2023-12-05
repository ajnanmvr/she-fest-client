"use client";
import InfoBar from '@/components/admin/InfoBar'
import RightSideBar from '@/components/admin/RightSideBar'
import { withUrqlClient } from 'next-urql';
import { useState } from 'react'
import { cacheExchange, fetchExchange } from 'urql';

interface Props {
    data: {
        title: string;
        icon: JSX.Element;
    }[];
}

const DashBoard = (props : Props) => {

    const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false)

  return (
    <>
    <div className="w-full h-full">
        <InfoBar data={props.data} />

        <div className="w-full h-5/6 bg-base-200 rounded-lg mt-[1%]" onClick={()=> setIsRightSideBarOpen(!IsRightSideBarOpen)} ></div>
      </div>
      <RightSideBar  isOpen={IsRightSideBarOpen} setIsOpen={setIsRightSideBarOpen} > 
      fs
      </RightSideBar>
    </>
  )
}


export default withUrqlClient(() => ({
  url: "https://result-dusky.vercel.app/graphql",
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
  },
}))(DashBoard);