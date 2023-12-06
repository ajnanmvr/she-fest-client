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
  Team,
} from "@/gql/graphql";
import { useGlobalContext } from "@/context/context";
import RightSideBar from "../RightSideBar";
import OneCredential from "./SingleCredentials";

interface Props {
  result: Credential[];
  team: Team[];
}

const Credentials = (props: Props) => {
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [selectedCredential, SetSelectedCredential] = useState<Credential>();
  const [search, setSearch] = useState('')
  const [searchedData, setSearchedData] = useState<Credential>();
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data: user, setData: setUser } = useGlobalContext();

  const [{ fetching, data }] = useQuery<
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
          console.log(props.result.includes(item as any));
          if (props.result.includes(item as any)) {
            console.log(item);
            // SetSelectedData(itemMani);
          }
        });
      })
      : console.log("no data");
  });

  return (
    <>
      <div className="w-full h-full">
        {/* <InfoBar data={props.data} /> */}
        <div className="w-full h-screen lg:h-[90%] flex mt-[3%] ">
          <div className="flex-1 w-full">
            <div className="h-10 cursor-pointer flex justify-between mb-4">
              {/* search bar */}
              <input
                className="w-1/3 lg:w-1/4 rounded-full bg-[#EEEEEE] px-5 text-xl border-secondary"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  // setData(
                    

                  //   props.result.filter((item: any) =>
                  //     item?.name
                  //       .toLocaleLowerCase()
                  //       .includes(e.target.value.toLocaleLowerCase())
                  //   )
                  // );
                }}
              />
              <div>
                <button
                  className="inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  onClick={() => {
                    setIsCreate(true);
                    setIsEdit(false);
                    setIsRightSideBarOpen(true);
                  }}
                >
                  Create
                </button>
                <button
                  className="ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"
                // onClick={downloadExcel}
                >
                  Export
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full overflow-y-auto h-full">
              <div
                className={`grid gap-4 w-full transition-all grid-cols-1 ${IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
              >
                {data?.credentials?.map((item: Credential, index: number) => {
                  return (
                    <div
                      key={index}
                      className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"
                      onClick={() => {

                        setIsRightSideBarOpen(true);
                        SetSelectedCredential(item as Credential);
                        setIsEdit(false);
                        setIsCreate(false);
                      }}
                    >
                      <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                        <p>{index+1}</p>
                      </div>

                      <p className="text-black leading-5 pr-[10%]">
                        {item.username as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* </div> */}
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
              setData={setSearchedData as Dispatch<SetStateAction<Credential[]>>}
              teams={props.team}
            />
          </RightSideBar>
        </div>
      </div>
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
