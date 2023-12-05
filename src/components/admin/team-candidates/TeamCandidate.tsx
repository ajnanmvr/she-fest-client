"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import { Candidate, Category, Team } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import OneTeamCandidate from "./SingleTeamCandidate";

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Candidate[];
  categories: Category[];
  teams : Team[];
}

const TeamCandidate = (props: Props) => {
  const [allData , setAllData] = useState<Candidate[]>(props.result);
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedCandidate, setSelectedCandidate] = useState<Candidate>();
  const [isExcelUpload, setExcel] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Candidate[]>(props.result);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = IsRightSideBarOpen ? 12 : 16;

  useEffect(()=>{
    const cookie = document.cookie;
    if (cookie) {
      const token = cookie.split("=")[1];
      const cv = parseJwt(token);
      setData( props.result.filter((item: any) => cv.categories?.includes(item.category.name)) as Candidate[])
      setAllData( props.result.filter((item: any) => cv.categories?.includes(item.category.name)) as Candidate[])
    }
  },[])

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the data for the current page
  const currentData = data.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Go to a specific page number
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Render the pagination controls
  const renderPaginationControls = () => {
    const controls = [];
    for (let page = 1; page <= totalPages; page++) {
      controls.push(
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`${
            currentPage === page ? "active" : ""
          } w-5 h-5 bg-black mx-1 my-5`}
        >
          {page}
        </button>
      );
    }
    return controls;
  };

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
    a.download = "Candidate.csv";
    document.body.appendChild(a);
    a.click();
  }

  return (
    <>
      <div className="w-full h-full">
        <InfoBar data={props.data} />

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
                    setCurrentPage(1);
                    setData(
                      allData.filter((item: any) =>
                        item.name
                          .toLocaleLowerCase()
                          .includes(e.target.value.toLocaleLowerCase())
                      )
                    );
                  }}
                />
              </div>
              <div className="m-1 float-left">
                <button
                  className="bg-blue-600"
                  onClick={downloadExcel}
                >
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className={`grid  gap-4 w-full transition-all ${
                IsRightSideBarOpen ? "grid-cols-3" : "grid-cols-4"
              }`} >
              {currentData?.map((item: Candidate, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full h-full bg-base-100  transition-all rounded-lg mt-[1%] cursor-pointer "
                    onClick={() => {
                      setIsRightSideBarOpen(true);
                      setSelectedCandidate(item);
                      setIsEdit(false);
                      setIsCreate(false);
                      setExcel(false);
                    }}
                  >
                    <div className="w-1/3">
                      <p className="text-base-content">{item.name}</p>
                    </div>
                    <div className="w-1/3 ">
                      <p className="text-base-content">{item.id}</p>
                    </div>
                    <div className="w-1/3 ">
                      <p className="text-base-content">{item.chestNO}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            {renderPaginationControls()}
          </div>
        </div>
      </div>
      <RightSideBar
        key={1}
        isOpen={IsRightSideBarOpen}
        setIsOpen={setIsRightSideBarOpen}
      >
        <OneTeamCandidate
          isExcelUpload={isExcelUpload}
          setIsExcelUpload={setExcel}
          isOpen={IsRightSideBarOpen}
          setIsOpen={setIsRightSideBarOpen}
          key={3}
          name={SelectedCandidate?.name as string}
          id={SelectedCandidate?.id as number}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          data={allData}
          setData={setAllData}
          category={SelectedCandidate?.category?.name as string}
          categories= {props.categories as Category[]}
          teams = {props.teams as Team[]}
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
}))(TeamCandidate);
