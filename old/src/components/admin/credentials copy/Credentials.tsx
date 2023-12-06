"use client";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cacheExchange, fetchExchange, useQuery } from "urql";
import {
  Category,
  Credential,
  GetAllCredentialsDocument,
  GetAllCredentialsQuery,
  GetAllCredentialsQueryVariables,
  Roles,
} from "@/gql/graphql";
import { useGlobalContext } from "@/context/context";
import RightSideBar from "../RightSideBar";
import OneCredential from "./SingleCredentials";

interface Props {
  result: Category[];
}

const Credentials = (props: Props) => {
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [selectedCredential, SetSelectedCredential] = useState<Credential>();
  const [search , setSearch] = useState('')
  const [searchedData , setSearchedData ] =  useState<Credential>();
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data: user , setData : setUser } = useGlobalContext();

  const [{ fetching,  data }] = useQuery<
    GetAllCredentialsQuery,
    GetAllCredentialsQueryVariables
  >({
    query: GetAllCredentialsDocument,
  })

  useEffect(() => {
    // check the data and categories if data.categories include all categories , then add to an array
    // then set the array to data
    console.log("Hai");

    data
      ? data.credentials.map((itemMani: Credential) => {
          itemMani.categories?.map((item) => {
            console.log(props.result.includes(item));
            if (props.result.includes(item)) {
              console.log(item);

              // SetSelectedData(itemMani);
            }
          });
        })
      : console.log("no data");
  });

  return (
    // <>
    //   <div
    //     className="w-full h-full"
    //     onClick={() => {
    //       console.log(data, fetching);
    //       console.log(props.result);
    //     }}
    //   >
    //     credentials
    //     {data && <h1>{data.credentials[0].username}</h1>}
    //   </div>
    // </>
    <>
    <div className="w-full h-full">
      {/* <InfoBar data={props.data} /> */}

      <div className="w-full h-5/6 bg-base-200 rounded-lg mt-[1%]">
        <div>
          {/* search bar */}
          <div className="w-full h-10 bg-base-300 rounded-lg mt-[1%] cursor-pointer">
            <div className="w-1/3 h-full float-left">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  // setSearchedData(
                  //   // data?.credentials.filter((item: Credential) =>
                      
                  //   // )
                  // );
                }}
              />
            </div>
            <div className="w-1/3 h-full float-left">
              <button
                className="bg-blue-600"
                // onClick={downloadExcel}
              >
                Export
              </button>
            </div>
            <div className="w-1/3 h-full float-left">
              <button
                className="bg-green-600"
                onClick={() => {
                  setIsCreate(true);
                  setIsEdit(false);
                  setIsRightSideBarOpen(true);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="grid grid-cols-4 gap-4 w-full">
            {
            data?.credentials?.map((item: Credential, index: number) => {
              if(item.roles != user.admin?.roles && user.admin?.roles != Roles.Admin){
                return
              }
              // if(item.roles == Roles.TeamManager && item.team?.name == user.admin?.team?.name){
              //   console.log(item.team?.name);
                
              //   return
              // }
              return (
                <div
                  key={index}
                  className="w-full h-full bg-base-100 rounded-lg mt-[1%] cursor-pointer "
                  onClick={() => {
                    setIsRightSideBarOpen(true);
                    SetSelectedCredential(item as Credential);
                    setIsEdit(false);
                    setIsCreate(false);
                  }}
                >
                  <div className="w-1/3">
                    <p className="text-base-content">{item.username}</p>
                  </div>
                  <div className="w-1/3 ">
                    <p className="text-base-content">{item.roles}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <RightSideBar
    isCreate={isCreate}
    isEdit={isEdit}
      key={1}
      isOpen={IsRightSideBarOpen}
      setIsOpen={setIsRightSideBarOpen}
    >
      <OneCredential
        isOpen={IsRightSideBarOpen}
        setIsOpen={setIsRightSideBarOpen}
        key={3}
        name={selectedCredential?.username as string}
        id={selectedCredential?.id as number}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        data={data?.credentials as Credential[]}
        setData={setSearchedData as Dispatch<SetStateAction<Credential[]>> }
      />
    </RightSideBar>
  </>
  );
};

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(Credentials);
