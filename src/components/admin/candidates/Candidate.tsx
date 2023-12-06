"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import { Candidate, Category, Programme, Team, Types } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import OneCandidate from "./SingleCandidate";
import { styled } from "styled-components";
import { ChevronLeft } from "@/icons/arrows";
import { PageChevronLeft, PageChevronRight } from "@/icons/pagination";
import { AddIcon, DownLoadIcon, FilterIcon } from "@/icons/action";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";


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
    a.download = "Candidate.csv";
    document.body.appendChild(a);
    a.click();
  }

  const downloadProgrameList = (programme: any = currentData, bulk: boolean = true) => {
    const doc = new jsPDF("portrait", "px", "a4");
    console.log(programme);
    console.log(data);
    console.log(allData);
    
    


    // Load Montserrat font
    doc.addFont(
      "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf",
      "Montserrat",
      "normal"
    );

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const backgroundImageUrl = "/a4program.jpg";

    console.log("pdf", pdfWidth, pdfHeight);
    var program = programme
    program.forEach((a: any) => {
      doc.addPage("a4");


      // Add the background image
      doc.addImage(backgroundImageUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);

      // Set the font to Montserrat
      doc.setFont("Montserrat");

      // Add text and other content on top of the background image
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0); // Set text color to black

      doc.text(`${a.chestNO}`, 110, 205);
      doc.text(`${a.name}`, 110, 218);
      doc.text(`${a.team?.name}`, 345, 205);
      doc.text(`${a.category?.name}`, 345, 218);
      var aa = 250;

      a.candidateProgrammes?.map((item: any, i: number) => {
        aa = aa + 15;
        console.log(aa);

        doc.text(`${item.programme?.programCode}`, 67, aa);
        doc.text(`${item.programme?.name}`, 126, aa);
      });
    });
    doc.deletePage(1)

    const pdfBlob = doc.output("blob");
    // var filename = bulk ? `Judge-List` : `${(programme as any).programCode} ${(programme as any).name}`
    saveAs(pdfBlob, `${programme.length}.pdf`);
    // setDowloading(true)
  };

  // console.log(allData);



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
                        .includes(e.target.value.toLocaleLowerCase()) ||
                      item.chestNO
                        .toLocaleLowerCase()
                        .includes(e.target.value.toLocaleLowerCase())
                    )
                  );
                }}
              />

              <div className=" flex items-center">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="hidden md:inline-flex bg-secondary text-white rounded-full px-5 py-2 font-bold"
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

                  <label
                    tabIndex={0}
                    className="md:hidden inline-flex bg-secondary text-white rounded-full px-4 py-[6px] font-bold"
                  >
                    <AddIcon className="w-7 h-7 fill-white cursor-pointer" />
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
{/* export option */}
                {/* <button
                  className="hidden md:block ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  onClick={downloadExcel}
                >
                  Export
                </button> */}
                <button
                  className="ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold md:hidden"
                  onClick={downloadExcel}
                >
                  <DownLoadIcon className="w-6 h-6 cursor-pointer fill-white  transition-all" />
                </button>


                {/* filtering option */}
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
                     <FilterIcon className="w-7 h-7 fill-white cursor-pointer"/>
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
                      {props.categories?.map((item: Category, index: number) => {
                        return (
                          <button
                            className=" block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                            onClick={() => {
                              setCurrentPage(1);
                              setData(
                                allData.filter(
                                  (itm: any) =>
                                    itm?.category?.name?.toLocaleLowerCase() ===
                                    item?.name?.toLocaleLowerCase()
                                )
                              );
                            }}
                          >
                            {item.name}
                          </button>
                        );
                      })}
                    </ul>
                  </div>
                  {/* download option */}
                <button
                  className="hidden md:block ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  onClick={() => downloadProgrameList(data)}
                >
                  Export
                </button>

              </div>
            </div>
            <div className="flex flex-col items-center lg:justify-center w-full h-full">
              <ComponentsDiv
                height={`${(itemsPerPage / (IsRightSideBarOpen ? 3 : 4)) * 6
                  }rem`}
              >
                <div
                  ref={candidateRef}
                  className={`grid gap-4 w-full transition-all grid-cols-1 ${IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
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
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ComponentsDiv>
              <div className="w-full flex items-center justify-center">
                <button
                  key={1}
                  onClick={() => {
                    currentPage != 1 && goToPage(currentPage - 1)
                  }}
                  className={`${"bg-[#ECE1FC]"
                    }  py-2 px-2  rounded-xl font-bold mx-1 my-5`}
                >
                  {
                    <PageChevronLeft className="w-6 h-6 fill-secondary" />
                  }
                </button>
                <button
                  key={1}
                  className={`${"bg-secondary text-white"

                    }  py-2 px-4 rounded-xl font-bold mx-1 my-5`}
                >
                  {currentPage}
                </button>
                <button
                  key={1}
                  onClick={() => totalPages > currentPage && goToPage(currentPage + 1)}
                  className={`${"bg-[#ECE1FC]"
                    }  py-2 px-2  rounded-xl font-bold mx-1 my-5`}
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
