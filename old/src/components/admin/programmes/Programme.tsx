"use client";
import InfoBar from "@/components/admin/InfoBar";
import RightSideBar from "@/components/admin/RightSideBar";
import { Programme, Category, Team, Skill } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import OneProgramme from "./SingleProgramme";
import { styled } from "styled-components";
import { ChevronLeft } from "@/icons/arrows";
import { PageChevronLeft, PageChevronRight } from "@/icons/pagination";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { AddIcon, DownLoadIcon } from "@/icons/action";

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

const Programme = (props: Props) => {
  const [allData, setAllData] = useState<Programme[]>(props.result);
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedProgramme, setSelectedProgramme] = useState<Programme>();
  const [isExcelUpload, setExcel] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Programme[]>(props.result);
  const [currentPage, setCurrentPage] = useState(1);
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);
  const [screenHeigh, setScreenHeight] = useState<number>(400);
  const ProgrammeRef = useRef<HTMLDivElement>(null);
  const [isClickedForQR, setIsClickedForQR] = useState<boolean>(false);
  const [ isScheduleUpload ,  setIsScheduleUpload ] = useState(false)

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

  useEffect(() => {
    // This code runs after the component has re-rendered with the updated state
    isClickedForQR ? downloadQRCodePdf(): null
    // You can access the updated state value here
  }, [isClickedForQR]);

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
    a.download = "Programme.csv";
    document.body.appendChild(a);
    a.click();
  }

  // download QR code of displayed programme
  const downloadQRCodePdf = () => {
    // setIsClickedForQR(true);
    //   const qrCodeArea = document.querySelector(".qr-code-area");
    //   (qrCodeArea as Element).innerHTML = `<QRCode
    //   id="qrcode"
    //   value="https://Tekton23.me/program/"
    //   size={150}
    //   level={"H"}
    //   includeMargin={false}
    // />`;
    // console.log(qrCodeArea);

    const canvas = document.getElementById("qrcode") as HTMLCanvasElement;
    const canvases = document.querySelectorAll(".qrcodes")
    console.log(canvases);
    const doc = new jsPDF("portrait", "px", "a4");
    const pdfSize = 75;
    canvases.forEach((qrcode : any, index) => {
      console.log(qrcode);
      var photoUrl = qrcode
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(photoUrl);
    fetch(photoUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const imgData = URL.createObjectURL(blob);
        console.log(imgData);
        
        var programNameY = 95;
        var programCodeY = 105;

        // currentData.forEach((a, i) => {
          var a = currentData[index]
          // doc.addPage("a4");
          // console.log(a);
          if (index % 15 == 0 && index != 0) {
            doc.addPage("a4");
            programNameY = 95;
            programCodeY = 105;
          }

          // Add the background image
          doc.addImage(imgData, "JPEG", 20, 10, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 180, 10, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 340, 10, pdfSize, pdfSize);

          doc.addImage(imgData, "JPEG", 20, 120, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 180, 120, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 340, 120, pdfSize, pdfSize);

          doc.addImage(imgData, "JPEG", 20, 230, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 180, 230, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 340, 230, pdfSize, pdfSize);

          doc.addImage(imgData, "JPEG", 20, 340, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 180, 340, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 340, 340, pdfSize, pdfSize);

          doc.addImage(imgData, "JPEG", 20, 450, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 180, 450, pdfSize, pdfSize);
          doc.addImage(imgData, "JPEG", 340, 450, pdfSize, pdfSize);

          // Set the font to Montserrat
          doc.setFont("Montserrat");

          // Add text and other content on top of the background image
          doc.setTextColor(0, 0, 0); // Set text color to black
          doc.setFontSize(7);
          doc.text(`${a.name}`, 20, programNameY);
          doc.setFontSize(15);
          doc.text(`${a.programCode}`, 20, programCodeY);
          doc.setFontSize(7);
          doc.text(`${a.name}`, 180, programNameY);
          doc.setFontSize(15);
          doc.text(`${a.programCode}`, 180, programCodeY);
          doc.setFontSize(7);
          doc.text(`${a.name}`, 340, programNameY);
          doc.setFontSize(15);
          doc.text(`${a.programCode}`, 340, programCodeY);
          if (index % 3 == 0 && index != 0) {
            programNameY += 110;
            programCodeY += 110;
          }
          // doc.setFontSize(7);
          // doc.text(`${a.name}`, 20, 205);
          // doc.setFontSize(15);
          // doc.text(`${a.programCode}`, 20, 215);

          // doc.text(`${a.programCode}`, 125, 205);
          // var aa = 265;
          // a.candidateProgramme?.map((item, i) => {
          //   aa = aa + 13.2;
          //   console.log(aa);
          //   doc.text(`${item.candidate?.chestNO}`, 67, aa);
          //   doc.text(`${item.candidate?.name}`, 112, aa);
          // });
        // });
        // const pdfBlob = doc.output("blob");
        // saveAs(pdfBlob, `judgeList.pdf`);
       
      });
    })
    console.log('finisd');
    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, `judgeList.pdf`);
    
    



    // const pngUrl = canvas
    //   .toDataURL("image/png")
    //   .replace("image/png", "image/octet-stream");
    // console.log(pngUrl);

    // const doc = new jsPDF("portrait", "px", "a4");
    // const pdfSize = 75;

    // fetch(pngUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const imgData = URL.createObjectURL(blob);
    //     console.log(imgData);
        
    //     var programNameY = 95;
    //     var programCodeY = 105;

    //     currentData.forEach((a, i) => {
    //       // doc.addPage("a4");
    //       // console.log(a);
    //       if (i % 15 == 0 && i != 0) {
    //         doc.addPage("a4");
    //         programNameY = 95;
    //         programCodeY = 105;
    //       }

    //       // Add the background image
    //       doc.addImage(imgData, "JPEG", 20, 10, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 180, 10, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 340, 10, pdfSize, pdfSize);

    //       doc.addImage(imgData, "JPEG", 20, 120, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 180, 120, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 340, 120, pdfSize, pdfSize);

    //       doc.addImage(imgData, "JPEG", 20, 230, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 180, 230, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 340, 230, pdfSize, pdfSize);

    //       doc.addImage(imgData, "JPEG", 20, 340, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 180, 340, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 340, 340, pdfSize, pdfSize);

    //       doc.addImage(imgData, "JPEG", 20, 450, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 180, 450, pdfSize, pdfSize);
    //       doc.addImage(imgData, "JPEG", 340, 450, pdfSize, pdfSize);

    //       // Set the font to Montserrat
    //       doc.setFont("Montserrat");

    //       // Add text and other content on top of the background image
    //       doc.setTextColor(0, 0, 0); // Set text color to black
    //       doc.setFontSize(7);
    //       doc.text(`${a.name}`, 20, programNameY);
    //       doc.setFontSize(15);
    //       doc.text(`${a.programCode}`, 20, programCodeY);
    //       doc.setFontSize(7);
    //       doc.text(`${a.name}`, 180, programNameY);
    //       doc.setFontSize(15);
    //       doc.text(`${a.programCode}`, 180, programCodeY);
    //       doc.setFontSize(7);
    //       doc.text(`${a.name}`, 340, programNameY);
    //       doc.setFontSize(15);
    //       doc.text(`${a.programCode}`, 340, programCodeY);
    //       if (i % 3 == 0 && i != 0) {
    //         programNameY += 110;
    //         programCodeY += 110;
    //       }
    //       // doc.setFontSize(7);
    //       // doc.text(`${a.name}`, 20, 205);
    //       // doc.setFontSize(15);
    //       // doc.text(`${a.programCode}`, 20, 215);

    //       // doc.text(`${a.programCode}`, 125, 205);
    //       // var aa = 265;
    //       // a.candidateProgramme?.map((item, i) => {
    //       //   aa = aa + 13.2;
    //       //   console.log(aa);
    //       //   doc.text(`${item.candidate?.chestNO}`, 67, aa);
    //       //   doc.text(`${item.candidate?.name}`, 112, aa);
    //       // });
    //     });

    //     // const pdfBlob = doc.output("blob");
    //     // saveAs(pdfBlob, `judgeList.pdf`);
    //   });

    // let downloadLink = document.createElement("a");
    // downloadLink.href = pngUrl;
    // downloadLink.download = "qrcode.png";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
    console.log(pdfBlob);
  setIsClickedForQR(false);
  // (document.querySelector("embed") as any).src = pdfBlob
  };



  return (
    <>
      {/* <div className="qr-code-area">
        <QRCode
          id="qrcode"
          value="https://Tekton23.me/program/$%7BprogramCode%7D"
          size={150}
          level={"H"}
          includeMargin={false}
        />
        <embed src="" type="application/pdf" className="overflow-auto w-full h-full"/>
        {
          isClickedForQR && (
            currentData.map((item : Programme, index) => {
             return(
              <QRCode
              className="qrcodes"
              value= {`https://Tekton23.me/program/${item.programCode}`}
              size={150}
              level={"H"}
              includeMargin={false}
            />
             )
            })
          
          )
        }
      </div> */}
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

              <div className="flex items-center ">
                <button
                  className="ml-1  mr-1 bg-secondary text-white rounded-full px-5 py-2 font-bold hidden md:block"
                  onClick={()=>{
                    // setIsClickedForQR(true)
                    // downloadQRCodePdf()
                  }}
                >
                  QR CODE
                </button>
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
                      className=" block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                      onClick={() => {
                        setIsCreate(true);
                        setIsEdit(false);
                        setIsRightSideBarOpen(true);
                        setExcel(false);
                        setIsImageUpload(false);
                        setIsScheduleUpload(false);
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
                        setIsScheduleUpload(false);
                      }}
                    >
                      IMPORT
                    </button>
                    <button
                      className="block px-2 py-1 text-md rounded-md hover:bg-secondary hover:text-white"
                      onClick={() => {
                        setIsCreate(false);
                        setIsEdit(false);
                        setExcel(false);
                        setIsRightSideBarOpen(true);
                        setIsImageUpload(false);
                        setIsScheduleUpload(true);
                      }}
                    >
                     SCHEDULE
                    </button>
                  </ul>
                </div>
                <button
                  className="hidden md:block ml-1 bg-secondary text-white rounded-full px-5 py-2 font-bold"
                  onClick={downloadExcel}
                >
                  Export
                </button>
                <button
                  className="ml-1 bg-secondary text-white rounded-full px-6 py-[10px] font-bold md:hidden"
                  onClick={downloadExcel}
                >
                  <DownLoadIcon className="w-6 h-6 cursor-pointer fill-white  transition-all"/>
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
                  ref={ProgrammeRef}
                  className={`grid gap-4 w-full transition-all grid-cols-1 ${
                    IsRightSideBarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
                >
                  {currentData?.map((item: Programme, index: number) => {
                    return (
                      <div
                        key={index}
                        className="transition-all bg-[#EEEEEE] rounded-xl mt-[1%] cursor-pointer flex p-5 gap-3 content-center items-center h-20"
                        onClick={() => {
                          setIsRightSideBarOpen(true);
                          setSelectedProgramme(item);
                          setIsEdit(false);
                          setIsCreate(false);
                          setExcel(false);
                          setIsImageUpload(false);
                          setIsScheduleUpload(false);
                        }}
                      >
                        <div className="text-white font-bold bg-secondary px-3 py-1 text-xl rounded-xl flex justify-center content-center items-center">
                          <p> {item.programCode}</p>
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
            <OneProgramme
              isExcelUpload={isExcelUpload}
              setIsExcelUpload={setExcel}
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
              categories={props.categories as Category[]}
              skill={SelectedProgramme?.skill?.name as string}
              skills={props.skills as Skill[]}
              setIsScheduleUpload= {setIsScheduleUpload}
              isScheduleUpload = {isScheduleUpload}
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
}))(Programme);
