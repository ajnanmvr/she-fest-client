"use client";
import InfoBar from "@/components/admin/InfoBar";
import SingleSection from "@/components/admin/section/SingleSection";
import RightSideBar from "@/components/admin/RightSideBar";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import { styled } from "styled-components";
import { Section } from "@/gql/graphql";

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Section[];
}

const ComponentsDiv: any = styled.div<{ height: string }>`
  width: 100%;
  overflow: scroll;
  height: 75%;

  @media (min-width: 1024px) {
    width: 100%;
    overflow: hidden;
    height: ${(props) => (props.height ? props.height : "100%")};
  }
`;

const DetailedDiv: any = styled.div<{ height: string }>`
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 3%;

  @media (min-width: 1024px) {
    height: ${(props) => (props.height ? props.height : "75vh")};
  }
`;
const Section = (props: Props) => {
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedSection, setSelectedSection] = useState({ id: 0, name: "" });
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Section[]>(props.result);

  function downloadExcel() {
    const data = props.result;
    const replacer = (key: any, value: any) => (value === null ? "" : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    let csvArray = csv.join("\r\n");

    var a = document.createElement("a");
    a.href = "data:attachment/csv," + csvArray;
    a.target = "_Blank";
    a.download = "Section.csv";
    document.body.appendChild(a);
    a.click();
  }

  return (
    <>
      <div className="w-full h-full">
        <InfoBar data={props.data} />
        <div className="w-full h-screen lg:h-4/5 flex mt-[3%] ">
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
                  setData(
                    props.result.filter((item: any) =>
                      item.name
                        .toLocaleLowerCase()
                        .includes(e.target.value.toLocaleLowerCase())
                    )
                  );
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
                  onClick={downloadExcel}
                >
                  Export
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full overflow-y-auto h-full">
              <div
                className={`grid gap-4 w-full transition-all grid-cols-1 ${
                  IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
              >
                {data?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"
                      onClick={() => {
                        setIsRightSideBarOpen(true);
                        setSelectedSection(item);
                        setIsEdit(false);
                        setIsCreate(false);
                      }}
                    >
                      <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                        <p>{item.id}</p>
                      </div>

                      <p className="text-black leading-5 pr-[10%]">
                        {item.name}
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
              <SingleSection
                isOpen={IsRightSideBarOpen}
                setIsOpen={setIsRightSideBarOpen}
                key={3}
                name={SelectedSection.name}
                id={SelectedSection.id}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isCreate={isCreate}
                setIsCreate={setIsCreate}
                data={data}
                setData={setData}
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
}))(Section);
