"use client";

import { useGlobalContext } from "@/context/context";
import { Roles } from "@/gql/graphql";
import { useRouter } from "next/navigation";

export default function Page() {
    const roter = useRouter();

    const { data, setData } = useGlobalContext();

    if (data === null) {
        roter.push("/login");
    }
  return (
    <div className="w-full h-screen flex flex-col  items-center justify-center gap-2">
      <div onClick={()=>{
        roter.push('/admin/candidates')
      }} className="cursor-pointer w-72 h-12 flex items-center justify-center hover:bg-light border-primary border rounded-lg text-white px-3 py-1 gap-2 bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        <p className="font-semibold text-lg">Candidates</p>
      </div>
      <div onClick={()=>{
        roter.push('/admin/programs')
      }} className="cursor-pointer w-72 h-12 flex items-center justify-center hover:bg-light border-primary border rounded-lg text-white px-3 py-1 gap-2 bg-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-semibold text-lg">Programs</p>
      </div>
      {
         (data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
          <div onClick={()=>{
            roter.push('/admin/institutions')
          }} className="cursor-pointer w-72 h-12 flex items-center justify-center hover:bg-light border-primary border rounded-lg text-white px-3 py-1 gap-2 bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
            <p className="font-semibold text-lg">Institutions</p>
          </div>
         )    }
      
      <div onClick={()=>{
        roter.push('/login')
      }} className="cursor-pointer w-72 h-12 flex items-center justify-center hover:bg-light border-red-600 border rounded-lg text-white px-3 py-1 gap-2 bg-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>

        <p className="font-semibold text-lg">Logout</p>
      </div>
    </div>
  );
}
