"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import {
  Programme,
  Category,
  Team,
  Skill,
  Mode,
  Types,
  CandidateProgramme,
} from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import { styled } from "styled-components";
import { PageChevronLeft, PageChevronRight } from "@/icons/pagination";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import {
  AddIcon,
  DownLoadIcon,
  EyeIcon,
  ManualUploadIcon,
  FilterIcon,
} from "@/icons/action";
import PointUpload from "./PointUpload";
import ManualUpload from "./ManualUpload";
import ViewResultAndEdit from "./ViewResultAndEdit";

// import launch from "puppeteer-extra"
// const puppeteer = require('puppeteer-extra')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin())

// import * as puppeteer from 'puppeteer-extra'

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Programme[];
  categories: Category[];
  skills: Skill[];
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

const Judges = (props: Props) => {
  const [allData, setAllData] = useState<Programme[]>(props.result);
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedProgramme, setSelectedProgramme] = useState<Programme>();
  const [isExcelUpload, setExcel] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  // const [dowloading, setDowloading] = useState<boolean>(false);
  // const [downloadAsBulk, setDownloadAsBulk] = useState<boolean>();
  const [data, setData] = useState<Programme[]>(props.result);
  const [currentPage, setCurrentPage] = useState(1);
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  const [screenHeigh, setScreenHeight] = useState<number>(400);
  const [judgeList, setJudgeList] = useState<string[]>([]);
  const [isEditJudge, setIsEditJudge] = useState<boolean>(false);
  const [count, setCount] = useState<number>(1);
  const [isPointUploadOpen, setIsPointUploadOpen] = useState<boolean>(false);
  const [isManualUploadOpen, setIsManualUploadOpen] = useState<boolean>(false);
  const [isResultBarOpen, setIsResultBarOpen] = useState<boolean>(false);
  const ProgrammeRef = useRef<HTMLDivElement>(null);

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

      // sort the candidateProgramme array in Programme object by chestNO

      let temp = [...props.result];

      // to sort by chestNO take the last three digits of chestNO and sort them as it is a string

      temp.map((item: Programme) => {
        item.candidateProgramme?.sort(
          (a: CandidateProgramme, b: CandidateProgramme) => {
            let chestNOA = a.candidate?.chestNO?.slice(-3);
            let chestNOB = b.candidate?.chestNO?.slice(-3);
            return Number(chestNOA) - Number(chestNOB);
          }
        );
      });

      setData(temp as Programme[]);
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

  //   useEffect(() => {
  // if (dowloading){
  // if (downloadAsBulk){
  //   downloadJudgeList()
  // } else{
  //   downloadJudgeList(SelectedProgramme,false)
  // }
  // }
  //   }, [dowloading]);

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

  // //   generatePdf();

  const downloadJudgeList = (
    programme: any = currentData,
    bulk: boolean = true,
    withName: boolean = true
  ) => {
    const doc = new jsPDF("portrait", "px", "a4");
    console.log(programme);

    // Load Montserrat font
    doc.addFont(
      "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf",
      "Montserrat",
      "normal"
    );

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    console.log("pdf", pdfWidth, pdfHeight);
    var program = bulk ? programme : [programme];
    program.forEach((a: any) => {
      doc.addPage("a4");

      const backgroundImageUrl = withName
        ? a.type === Types.Single
          ? "/a4.jpg"
          : "/a4g.jpg"
        : "/a4Comment.jpg";
      // Add the background image
      doc.addImage(backgroundImageUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);

      // Set the font to Montserrat
      doc.setFont("Montserrat");

      // Add text and other content on top of the background image
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Set text color to black

      doc.text(`${a.programCode}`, 125, 205);
      doc.text(`${a.name}`, 125, 218);
      doc.text(`${a.category?.name}`, 345, 205);
      var aa = 265;

      a.candidateProgramme?.map((item: any, i: number) => {
        aa = aa + 13.5;
        console.log(aa);
        // doc.text(`${item.candidate?.chestNO}`, 67, aa);

        
        if (withName==false){
          doc.text(`${item.candidate?.chestNO}`, 67, aa);
        } else{
          if (a.type == Types.Group) {
            aa = 284.75 + 27 * i;
            doc.text(`${item.candidate?.chestNO}`, 67, aa);
            console.log(item.candidatesOfGroup);
            let bb = 90;
  
            let groupPositionY: number;
  
            if ((item.candidatesOfGroup as any).length > 7) {
              console.log((item.candidatesOfGroup as any).length);
              if (i == 0) {
                groupPositionY = 265;
              } else {
                groupPositionY = 265 + 13.5 * 2 * i;
              }
            } else {
              groupPositionY = 284.75 + 27 * i;
            }
  
            item.candidatesOfGroup?.map((itm: any, index: number) => {
              if ((item.candidatesOfGroup as any).length > 7) {
                console.log((item.candidatesOfGroup as any).length);
                if (index == 0) {
                  groupPositionY = groupPositionY + 13.5;
                }
                if (index == 7) {
                  bb = 90;
                  groupPositionY = groupPositionY + 13.5;
                }
              }
              bb = bb + 22;
  
              var chestNO =
                index == (item.candidatesOfGroup as any).length - 1
                  ? itm.chestNO
                  : itm.chestNO + ",";
              doc.text(`${chestNO}`, bb, groupPositionY);
            });
          } else if (a.type == Types.House) {
            let positionY = 284.75 + 27 * i;
            doc.text(
              `${item.candidate?.chestNO.slice(0, -2) + "00"}`,
              67,
              positionY
            );
            doc.text(`${item.candidate?.team.name}`, 112, positionY);
          } else {
            doc.text(`${item.candidate?.chestNO}`, 67, aa);
            doc.text(`${item.candidate?.name}`, 112, aa);
          }
        }
      });
    });
    doc.deletePage(1);

    const pdfBlob = doc.output("blob");
    var filename = bulk
      ? `Judge List`
      : `${(programme as any).programCode} ${(programme as any).name}`;
    saveAs(pdfBlob, `${filename}.pdf`);
    // setDowloading(true)
  };

  return (
    <>
      <div className="w-full h-full " id="element-container">
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
                    allData.filter(
                      (item: any) =>
                        item.name
                          .toLocaleLowerCase()
                          .includes(e.target.value.toLocaleLowerCase()) ||
                        item.programCode
                          .toLocaleLowerCase()
                          .includes(e.target.value.toLocaleLowerCase())
                    )
                  );
                }}
              />

              <div>
                <div className="">
                  <div className="dropdown dropdown-end mr-1">
                    <label
                      tabIndex={0}
                      className="hidden md:inline-flex bg-secondary ml-1  text-white rounded-full px-5 py-2 font-bold"
                    >
                      Filter
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
                      className="md:hidden inline-flex bg-secondary ml-1  text-white rounded-full px-5 py-2 font-bold"
                    >
                      <FilterIcon className="w-7 h-7 fill-white cursor-pointer" />
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
                      {props.categories?.map(
                        (item: Category, index: number) => {
                          return (
                            <button
                              className=" block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                              onClick={() => {
                                setCurrentPage(1);
                                setData(
                                  allData.filter(
                                    (itm: Programme) =>
                                      itm?.category?.name?.toLocaleLowerCase() ===
                                      item?.name?.toLocaleLowerCase()
                                  )
                                );
                              }}
                            >
                              {item.name}
                            </button>
                          );
                        }
                      )}
                    </ul>
                  </div>

                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className=" md:hidden inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
                    >
                      <DownLoadIcon className="w-7 h-7 fill-white cursor-pointer" />
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
                      Download
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
                          downloadJudgeList(currentData, true, false);
                        }}
                      >
                        No Name
                      </button>

                      <button
                        className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                        onClick={async () => {
                          downloadJudgeList();
                        }}
                      >
                        With name
                      </button>
                    </ul>
                  </div>

                  {/* <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="inline-flex bg-secondary ml-1  text-white rounded-full px-5 py-2 font-bold"
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
                  </div> */}
                </div>
              </div>

            </div>
            <div className="flex flex-col items-center lg:justify-center w-full h-full">
              <ComponentsDiv
                height={`${
                  (itemsPerPage / (IsRightSideBarOpen ? 3 : 4)) * 6
                }rem`}
              >
                <div
                  ref={ProgrammeRef}
                  className={`grid gap-4 w-full transition-all grid-cols-1 ${
                    IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
                >
                  {currentData?.map((item: Programme, index: number) => {
                    return (
                      <div
                        key={index}
                        className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20 relative"
                        onClick={() => {
                          setIsRightSideBarOpen(true);
                          setSelectedProgramme(item);
                          setIsEdit(false);
                          setIsCreate(false);
                          setExcel(false);
                          setIsImageUpload(false);
                        }}
                      >
                        <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                          <p> {item.programCode}</p>
                        </div>

                        <p className="text-black leading-5 pr-[10%]">
                          {item.name}
                        </p>
                        <div
                          className={`${
                            item.anyIssue
                              ? "bg-error"
                              : item.resultPublished
                              ? "bg-success"
                              : item.resultEntered
                              ? "bg-info"
                              : "bg-warning"
                          }  absolute w-3 h-3 rounded-full right-3`}
                        ></div>
                      </div>
                    );
                  })}
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
          </div>
          
          <RightSideBar
            key={1}
            isOpen={IsRightSideBarOpen}
            setIsOpen={setIsRightSideBarOpen}
            isCreate={isCreate}
            isEdit={isEdit}
          >
            <div className="flex flex-col justify-between w-full h-full">
              <div>
                <h1 className="font-bold">{SelectedProgramme?.name}</h1>
                <h1>{SelectedProgramme?.programCode}</h1>
                <h1>{SelectedProgramme?.category?.name}</h1>
                {/* {[...Array(count)].map((_, i) => {

                  console.log(i + 1, count);

                  return (
                    <div key={i} className="bg-black">
                      <label htmlFor="">Judge {i + 1}</label>
                      <input
                        type="text"
                        placeholder={`JUDGE ${i + 1}`}
                        className="mb-2"
                      />
                      <input
                        type="text"
                        placeholder="judge@123"
                        className="mb-2"
                      />
                    </div>
                  );
                })}
                { }
                <button
                  className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
                  onClick={() => {
                    count < 2 ? null : setCount(count - 1);
                  }}
                >
                  rmv
                </button>
                <button className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold">
                  submit
                </button>
                <button
                  className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
                  onClick={() => {
                    // setIsEditJudge(true);
                    count < 7 ? setCount(count + 1) : null;
                  }}
                >
                  Add

                </button> */}
              </div>

              <div className="w-full flex justify-between">
                <div className=""></div>
                <button
                  className="bg-secondary p-1 rounded-md"
                  onClick={() => downloadJudgeList(SelectedProgramme, false, false)}
                >
                 <DownLoadIcon className="w-6 h-6 text-white" /> <p className="text-white">Without Name</p>
                </button>
                <button
                  className="bg-secondary p-1 rounded-md"
                  onClick={() => downloadJudgeList(SelectedProgramme, false)}
                >
                  <DownLoadIcon className="w-6 h-6 text-white" />
                </button>

                <button
                  className="bg-secondary p-1 rounded-md"
                  onClick={() => setIsManualUploadOpen(true)}
                >
                  <ManualUploadIcon className="w-6 h-6 text-white" />
                </button>

                {/* {!SelectedProgramme?.resultEntered && (
                  <button
                    className="bg-secondary p-1 rounded-md"
                    onClick={() => setIsPointUploadOpen(true)}
                  >
                    <AddIcon className="w-6 h-6 text-white" />
                  </button>
                )} */}

                {SelectedProgramme?.resultEntered && (
                  <button
                    className="bg-secondary p-1 rounded-md"
                    onClick={() => setIsResultBarOpen(true)}
                  >
                    <EyeIcon className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            </div>
          </RightSideBar>
          {/* </div> */}
        </DetailedDiv>

        {/* { */}

        {/* // } */}
      </div>

      {isPointUploadOpen && (
        <PointUpload
          Programme={SelectedProgramme as Programme}
          isPointUploadOpen
          setIsPointUploadOpen={setIsPointUploadOpen}
          allData={data as Programme[]}
          setAllData={setData}
        />
      )}

      {isResultBarOpen && (
        <ViewResultAndEdit
          Programme={SelectedProgramme as Programme}
          isResultBarOpen
          setIsViewResultAndEditOpen={setIsResultBarOpen}
          allData={data as Programme[]}
        />
      )}

      {isManualUploadOpen && (
        <ManualUpload
          Programme={SelectedProgramme as Programme}
          isManualUploadOpen
          setIsManualUploadOpen={setIsManualUploadOpen}
          allData={data as Programme[]}
          setAllData={setData}
        />
      )}
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
}))(Judges);
