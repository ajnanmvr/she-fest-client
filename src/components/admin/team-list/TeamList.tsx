"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import { Candidate, CandidateProgramme, Category, Programme, Skill } from "@/gql/graphql";
import OneProgramme from "./SingleTeamList";
import { parseJwt } from "@/lib/cryptr";
import BulkUploadTeamList from "./BulkUploadTeamList";
import NormalUploadTeamList from "./NormalUploadTeamList";
import styled from "styled-components";
import { PageChevronLeft, PageChevronRight } from "@/icons/pagination";
import { AddIcon } from "@/icons/action";

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Programme[];
  categories: Category[];
  skills: Skill[];
  candidates: Candidate[];
}


const ComponentsDiv: any = styled.div<{ height: string }>`
  width: 100%;
  overflow: auto;
  height: 75%;

  @media (min-width: 1024px) {
    width: 100%;
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

const TeamList = (props: Props) => {
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedProgramme, setSelectedProgramme] = useState<Programme>();
  const [isExcelUpload, setIsExcelUpload] = useState<boolean>(false);
  const [isExcelGroupUpload, setIsExcelGroupUpload] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Programme[]>(props.result);
  const [allData, setAllData] = useState<Programme[]>(props.result);
  const [isBulk, setIsBulk] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  const [screenHeigh, setScreenHeight] = useState<number>(400);
  const ProgrammeRef = useRef<HTMLDivElement>(null);

  // const itemsPerPage = IsRightSideBarOpen ? 12 : 16;

  useEffect(() => {
    const cookie = document.cookie;
    if (cookie) {
      const token = cookie.split("=")[1];
      const cv = parseJwt(token);
      setData(
        props.result.filter((item: any) =>
          cv.categories?.includes(item.category.name)
        ) as Programme[]
      );
      setAllData(
        props.result.filter((item: any) =>
          cv.categories?.includes(item.category.name)
        ) as Programme[]
      );
    }


       // sort the candidateProgramme array in Programme object by chestNO

       let temp = [...props.result]

       // to sort by chestNO take the last three digits of chestNO and sort them as it is a string

       temp.map((item:Programme)=>{
         item.candidateProgramme?.sort((a: CandidateProgramme, b: CandidateProgramme)=>{
           let chestNOA = a.candidate?.chestNO?.slice(-3)
           let chestNOB = b.candidate?.chestNO?.slice(-3)
           return Number(chestNOA) - Number(chestNOB)
         })
       })

       setData(temp as Programme[])

    // window height settings
    const windowWidth = window.innerWidth;

    setItemsPerPage(calculateBreakPoint(window.innerHeight));

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    console.log(windowWidth);

    if (IsRightSideBarOpen) {
      setItemsPerPage((calculateBreakPoint(window.innerHeight) / 4) * 3);
    } else {
      setItemsPerPage(calculateBreakPoint(window.innerHeight));
      setCurrentPage(1);
    }
  }, [IsRightSideBarOpen]);

  useEffect(() => {
    // when screen height changes

    console.log(screenHeigh);
    setIsRightSideBarOpen(false);

    const shh = calculateBreakPoint(window.innerHeight);

    setItemsPerPage(shh);
    console.log(shh);
  }, [screenHeigh]);

  const calculateBreakPoint = (sh: number) => {
    return Math.floor((sh + 30 - 300) / 100) * 4;
  };



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
          className={`${currentPage === page ? "bg-secondary text-white" : "bg-[#ECE1FC]"
            }  py-2 px-4 rounded-xl font-bold mx-1 my-5`}
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
    a.download = "Programme.csv";
    document.body.appendChild(a);
    a.click();
  }

  return (
    <>
      <div className="w-full h-full">
        <InfoBar data={props.data} />
        <DetailedDiv
          height={`${(itemsPerPage / (IsRightSideBarOpen ? 3 : 4)) * 6 + 8}rem`}
        >

          <div className="w-full h-5/6  rounded-lg mt-[1%]">
            <div>
              {/* search bar */}
              <div className="h-10 cursor-pointer flex justify-between mb-4 ">

                <input
                  type="text"
                  placeholder="Search"
                  className="w-1/3 lg:w-1/4 rounded-full bg-[#EEEEEE] px-5 text-xl border-secondary"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    setData(
                      allData.filter(
                        (item: Programme) =>
                          item.name
                            ?.toLocaleLowerCase()
                            .includes(e.target.value.toLocaleLowerCase()) ||
                          item.programCode
                            ?.toLocaleLowerCase()
                            .includes(e.target.value.toLocaleLowerCase())
                      )
                    );
                  }}
                />

                <div className=" ">
                  <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className=" md:hidden inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  >
                    <AddIcon className="w-7 h-7 fill-white cursor-pointer"/>
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>

                  <label
                    tabIndex={0}
                    className="hidden  md:inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  >
                    Add
                    <svg
                      className="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 font-bold"
                    >
                      <button
                        className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"

                        onClick={() => {
                          setIsCreate(false);
                          setIsEdit(false);
                          setIsRightSideBarOpen(true);
                          setIsExcelUpload(true);
                          setIsExcelGroupUpload(false)
                        }}
                      >
                        Import
                      </button>

                      <button 
                      
                        className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                        onClick={() => {
                          setIsCreate(false);
                          setIsEdit(false);
                          setIsRightSideBarOpen(true);
                          setIsExcelUpload(false);
                          setIsExcelGroupUpload(true)
                        }}
                      >
                        Import Group
                      </button>
                    </ul>
                  </div>
                  {/* <button className="ml-1 bg-secondary text-white rounded-full w-20 h-8 font-bold" onClick={downloadExcel}>
                  Export
                </button> */}
                  {/* bulk upload */}
                  {/* <input

                    type="checkbox"
                    className="toggle toggle-md ml-1 "
                    checked={isBulk}
                    onChange={(e) => {
                      setIsRightSideBarOpen(false)
                      setIsBulk(e.target.checked);
                    }}
                  /> */}
                </div>
              </div>
            </div>
            <ComponentsDiv
              height={`${(itemsPerPage / (IsRightSideBarOpen ? 3 : 4)) * 6
                }rem`}
            >
              <div>
                {isBulk ? (
                  <BulkUploadTeamList
                    IsRightSideBarOpen={IsRightSideBarOpen}
                    setIsRightSideBarOpen={setIsRightSideBarOpen}
                    currentData={currentData}
                    setIsCreate={setIsCreate}
                    setIsEdit={setIsEdit}
                    setIsExcelUpload={setIsExcelUpload}
                    setSelectedProgramme={setSelectedProgramme}
                    key={1}
                    candidates={props.candidates}
                  />
                ) : (
                  <NormalUploadTeamList
                    IsRightSideBarOpen={IsRightSideBarOpen}
                    setIsRightSideBarOpen={setIsRightSideBarOpen}
                    currentData={currentData}
                    setIsCreate={setIsCreate}
                    setIsEdit={setIsEdit}
                    setIsExcelUpload={setIsExcelUpload}
                    setSelectedProgramme={setSelectedProgramme}
                    key={1}
                  />
                )}
              </div>
            </ComponentsDiv>

            <div className="w-full flex items-center justify-center">
              <button
                key={1}
                onClick={() => {
                  currentPage != 1 && goToPage(currentPage - 1);
                }}
                className={`${"bg-[#ECE1FC]"}  py-2 px-2  rounded-xl font-bold mx-1 my-5`}
              >
                {<PageChevronLeft className="w-6 h-6 fill-secondary" />}
              </button>
              <button
                key={1}
                className={`${"bg-secondary text-white"}  py-2 px-4 rounded-xl font-bold mx-1 my-5`}
              >
                {currentPage}
              </button>
              <button
                key={1}
                onClick={() =>
                  totalPages > currentPage && goToPage(currentPage + 1)
                }
                className={`${"bg-[#ECE1FC]"}  py-2 px-2  rounded-xl font-bold mx-1 my-5`}
              >
                <PageChevronRight className="w-6 h-6 fill-secondary" />
              </button>
            </div>

          </div>
        </DetailedDiv>
      </div>

      <RightSideBar
        isCreate={isCreate}
        isEdit={isEdit}
        key={1}
        isOpen={IsRightSideBarOpen}
        setIsOpen={setIsRightSideBarOpen}
      >
       <OneProgramme
        selectedProgramme={SelectedProgramme as Programme}
          isExcelUpload={isExcelUpload}
          setIsExcelUpload={setIsExcelUpload}
          isOpen={IsRightSideBarOpen}
          setIsOpen={setIsRightSideBarOpen}
          key={3}
          name={SelectedProgramme?.name as string}
          id={SelectedProgramme?.id as number}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          data={allData}
          setData={setAllData}
          category={SelectedProgramme?.category?.name as string}
          skill={SelectedProgramme?.skill?.name as string}
          categories={props.categories}
          skills={props.skills}
          isExcelGroupUpload = {isExcelGroupUpload}
          setExcelGroupUpload={setIsExcelGroupUpload}
          allCandidates={props.candidates}
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
}))(TeamList);
