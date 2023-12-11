"use client";
import { useGlobalContext } from "@/context/context";
import { Roles } from "@/gql/graphql";
import Link from "next/link";
import React from "react";

function Header() {
  const { data } = useGlobalContext();
  return (
    <>
      <div className="hidden md:flex w-full  items-center justify-center p-2">
        {" "}
        <Link
          className="bg-white text-primary p-2 hover:bg-secondary font-bold rounded-2xl mx-1"
          href="/admin/"
        >
          Home
        </Link>
        <Link
          className="bg-white text-primary p-2 hover:bg-secondary font-bold rounded-2xl mx-1"
          href="/admin/programs"
        >
          Programs
        </Link>
        <Link
          className="bg-white text-slate-800 p-2 hover:bg-secondary font-bold rounded-2xl mx-1"
          href="/admin/candidates/"
        >
          Candidates
        </Link>
        {(data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
              <Link
              className="bg-white text-slate-800 p-2 hover:bg-secondary font-bold rounded-2xl mx-1"
              href="/admin/institutions/"
            >
              institutions
            </Link>
            )}
        
      </div>
      <div className="flex fixed bottom-0 shadow-lg shadow-black bg-white md:hidden w-full  items-center justify-center p-2 ">
        {" "}
        <Link
          className=" bg-white text-primary p-2 hover:bg-secondary text-xs rounded-2xl mx-1 flex flex-col items-center justify-center"
          href="/admin/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M11.47 3.84a.7 5.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <p>Home</p>
        </Link>
        <Link
          className=" bg-white text-primary p-2 hover:bg-secondary text-xs rounded-2xl mx-1 flex flex-col items-center justify-center"
          href="/admin/programs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Programs
        </Link>
        <Link
          className=" bg-white text-primary p-2 hover:bg-secondary text-xs rounded-2xl mx-1 flex flex-col items-center justify-center"
          href="/admin/candidates/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
          Candidates
        </Link>
      
        {(data.roles == Roles.Controller || data.roles == Roles.Admin ) && (
               <Link
               className=" bg-white text-primary p-2 hover:bg-secondary text-xs rounded-2xl mx-1 flex flex-col items-center justify-center"
               href="/admin/institutions/"
             >
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 fill="currentColor"
                 className="w-6 h-6"
               >
                 <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                 <path
                   fillRule="evenodd"
                   d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z"
                   clipRule="evenodd"
                 />
                 <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
               </svg>
               institutions
             </Link>
            )}
      </div>
    </>
  );
}

export default Header;
