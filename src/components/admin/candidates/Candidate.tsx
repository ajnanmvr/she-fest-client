"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import { Candidate, Category, Team } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import OneCandidate from "./SingleCandidate";
import { styled } from "styled-components";

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Candidate[];
  categories: Category[];
  teams: Team[];
}

// styled components

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

const Candidate = (props: Props) => {
  const [allData, setAllData] = useState<Candidate[]>(props.result);
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedCandidate, setSelectedCandidate] = useState<Candidate>();
  const [isExcelUpload, setExcel] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Candidate[]>(props.result);
  const [currentPage, setCurrentPage] = useState(1);
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  const [screenHeigh, setScreenHeight] = useState<number>(400);
  const candidateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookie = document.cookie;
    if (cookie) {
      const token = cookie.split("=")[1];
      const cv = parseJwt(token);
      setData(
        props.result.filter((item: any) =>
          cv.categories?.includes(item.category.name)
        ) as Candidate[]
      );
      setAllData(
        props.result.filter((item: any) =>
          cv.categories?.includes(item.category.name)
        ) as Candidate[]
      );
    }

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
          className={`${
            currentPage === page ? "bg-secondary text-white" : "bg-[#ECE1FC]"
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
    a.download = "Candidate.csv";
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
          <div className="flex-1 h-full">
            <div className="h-10 cursor-pointer flex justify-between mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-1/3 lg:w-1/4 rounded-full bg-[#EEEEEE] px-5 text-xl border-secondary"
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

              <div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
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
                      className=" block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                      onClick={() => {
                        setIsCreate(true);
                        setIsEdit(false);
                        setIsRightSideBarOpen(true);
                        setExcel(false);
                        setIsImageUpload(false);
                      }}
                    >
                      CREATE
                    </button>

                    <button
                      className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                      onClick={() => {
                        setIsCreate(false);
                        setIsEdit(false);
                        setExcel(true);
                        setIsRightSideBarOpen(true);
                        setIsImageUpload(false);
                      }}
                    >
                      IMPORT
                    </button>

                    <button
                      className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                      onClick={() => {
                        setIsCreate(false);
                        setIsEdit(false);
                        setIsRightSideBarOpen(true);
                        setExcel(false);
                        setIsImageUpload(true);
                      }}
                    >
                      IMAGE UPLOAD
                    </button>
                  </ul>
                </div>
                <button
                  className="ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  onClick={downloadExcel}
                >
                  Export
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center lg:justify-center w-full h-full">
              <ComponentsDiv
                height={`${
                  (itemsPerPage / (IsRightSideBarOpen ? 3 : 4)) * 6
                }rem`}
              >

                <div
                  ref={candidateRef}
                  className={`grid gap-4 w-full transition-all grid-cols-1 ${
                    IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
                >
                  {currentData?.map((item: Candidate, index: number) => {
                    return (
                      <div
                        key={index}
                        className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"
                        onClick={() => {
                          setIsRightSideBarOpen(true);
                          setSelectedCandidate(item); 
                          setIsEdit(false);
                          setIsCreate(false);
                          setExcel(false);
                          setIsImageUpload(false);
                        }}
                      >
                        <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                          <p> {item.chestNO}</p>
                        </div>

                        <p className="text-black leading-5 pr-[10%]">
                          {item.name} Muhammad P
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ComponentsDiv>
              <div className="w-full flex items-center justify-center">
                {renderPaginationControls()}
              </div>
            </div>
          </div>
          <RightSideBar
            key={1}
            isOpen={IsRightSideBarOpen}
            setIsOpen={setIsRightSideBarOpen}
            isCreate={isCreate}
            isEdit={isEdit}
          >
            <OneCandidate
              isExcelUpload={isExcelUpload}
              setIsExcelUpload={setExcel}
              isImageUpload={isImageUpload}
              setIsImageUpload={setIsImageUpload}
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
              categories={props.categories as Category[]}
              teams={props.teams as Team[]}
            />
          </RightSideBar>
          {/* </div> */}
        </DetailedDiv>
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
}))(Candidate);
