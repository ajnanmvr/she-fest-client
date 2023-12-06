"use client";
import { Category, Programme, Team, Type } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
// import { useEffect, useRef, useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
// import { styled } from "styled-components";
// import { ChevronLeft } from "@/icons/arrows";
// import { PageChevronLeft, PageChevronRight } from "@/icons/pagination";
// // ag grid imports

// interface Props {
//   data: {
//     title: string;
//     icon: any;
//   }[];
//   result: Candidate[];
//   categories: Category[];
//   teams: Team[];
// }

// const maxProgram = 5;
// const minProgram = 5;
// const minSingle = 5;
// const maxSingle = 5;
// const maxGroup = 5;

// const AGrid = (props: Props) => {
//   const [allData, setAllData] = useState<Candidate[]>(props.result);
//   const [data, setData] = useState<Candidate[]>(props.result);

//   useEffect(() => {
//     const cookie = document.cookie;
//     if (cookie) {
//       const token = cookie.split("=")[1];
//       const cv = parseJwt(token);
//       setData(
//         props.result.filter((item: any) =>
//           cv.categories?.includes(item.category.name)
//         ) as Candidate[]
//       );
//       setAllData(
//         props.result.filter((item: any) =>
//           cv.categories?.includes(item.category.name)
//         ) as Candidate[]
//       );
//     }

//     console.log(data);
//   }, []);

//   function downloadExcel() {
//     const data = props.result;
//     const replacer = (key: any, value: any) => (value === null ? "" : value); // specify how you want to handle null values here
//     const header = Object.keys(data[0]);
//     let csv = data.map((row: any) =>
//       header
//         .map((fieldName) => JSON.stringify(row[fieldName], replacer))
//         .join(",")
//     );
//     csv.unshift(header.join(","));
//     let csvArray = csv.join("\r\n");

//     var a = document.createElement("a");
//     a.href = "data:attachment/csv," + csvArray;
//     a.target = "_Blank";
//     a.download = "Candidate.csv";
//     document.body.appendChild(a);
//     a.click();

//   }

//   return (
//     <>
//       <div className="w-full h-full">

//       </div>
//     </>
//   );
// };

// export default withUrqlClient(() => ({
//   url: SERVER_URL,
//   exchanges: [fetchExchange, cacheExchange],
//   fetchOptions: {
//     cache: "no-cache",
//     credentials: "include",
//   },
// }))(AGrid);

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ICellRendererParams } from "ag-grid-community";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

interface Props {
  data: {
    title: string;
    icon: any;
  }[];
  result: Programme[];
  categories: Category[];
  teams: Team[];
}

var countDownDirection = true;
function startInterval(api: GridApi, columnApi: ColumnApi) {
  var actionIndex = 0;
  resetCountdown();
  executeAfterXSeconds();
  function executeAfterXSeconds() {
    setTimeout(function () {
      var action = getActions()[actionIndex];
      action(api, columnApi);
      actionIndex++;
      if (actionIndex >= getActions().length) {
        actionIndex = 0;
      }
      resetCountdown();
      executeAfterXSeconds();
    }, 3000);
  }
  setTitleFormatted(null);
}

function resetCountdown() {
  (document.querySelector("#animationCountdown") as any).style.width =
    countDownDirection ? "100%" : "0%";
  countDownDirection = !countDownDirection;
}

function setTitleFormatted(
  apiName: null | string,
  methodName?: string,
  paramsName?: string
) {
  var html;
  if (apiName === null) {
    html = '<span class="code-highlight-yellow">command:> </span>';
  } else {
    html =
      '<span class="code-highlight-yellow">command:> </span> ' +
      '<span class="code-highlight-blue">' +
      apiName +
      "</span>" +
      '<span class="code-highlight-blue">.</span>' +
      '<span class="code-highlight-yellow">' +
      methodName +
      "</span>" +
      '<span class="code-highlight-blue"></span>' +
      '<span class="code-highlight-blue">(</span>' +
      '<span class="code-highlight-green">' +
      paramsName +
      "</span>" +
      '<span class="code-highlight-blue">)</span>';
  }
  document.querySelector("#animationAction")!.innerHTML = html;
}

function getActions() {
  return [
    function (api: GridApi, columnApi: ColumnApi) {
      columnApi.applyColumnState({
        state: [{ colId: "country", sort: "asc" }],
        defaultState: { sort: null },
      });
      setTitleFormatted("api", "applyColumnState", "country: 'asc'");
    },
    function (api: GridApi, columnApi: ColumnApi) {
      columnApi.applyColumnState({
        state: [
          { colId: "year", sort: "asc" },
          { colId: "country", sort: "asc" },
        ],
        defaultState: { sort: null },
      });
      setTitleFormatted(
        "api",
        "applyColumnState",
        "year: 'asc', country 'asc'"
      );
    },
    function (api: GridApi, columnApi: ColumnApi) {
      columnApi.applyColumnState({
        state: [
          { colId: "year", sort: "asc" },
          { colId: "country", sort: "desc" },
        ],
        defaultState: { sort: null },
      });
      setTitleFormatted(
        "api",
        "applyColumnState",
        "year: 'asc', country: 'desc'"
      );
    },
    function (api: GridApi, columnApi: ColumnApi) {
      columnApi.applyColumnState({
        defaultState: { sort: null },
      });
      setTitleFormatted("api", "applyColumnState", "clear sort");
    },
  ];
}
interface ImageCellRendererParams extends ICellRendererParams {
  rendererImage: string;
}

const AGridProgramme = (props: Props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [allData, setAllData] = useState<Programme[]>(props.result);
  const [data, setData] = useState<Programme[]>(props.result);
  const [rowData, setRowData] = useState<IOlympicData[]>();

  // ///////////////////////////////////////
  const createImageSpan = (imageMultiplier: number, image: string) => {
    const resultElement = document.createElement("span");
    for (let i = 0; i < imageMultiplier; i++) {
      const imageElement = document.createElement("img");
      imageElement.src =
        "https://www.ag-grid.com/example-assets/weather/" + image;
      resultElement.appendChild(imageElement);
    }
    return resultElement;
  };
  class RainPerTenMmRenderer {
    private eGui!: HTMLElement;

    init(params: ImageCellRendererParams) {
      const rainPerTenMm = params.value / 10;
      this.eGui = createImageSpan(rainPerTenMm, params.rendererImage);
    }
    getGui() {
      return this.eGui;
    }
  }

  const candidateCountFormatter = (params: any) => {
    console.log(params.value);

    const selectedProgramme = allData.find((program: Programme, index) => {
      return program.programCode === params.value;
    })

    // console.log(selectedProgramme);


    const totalCandidatesCount = selectedProgramme?.candidateProgramme?.length;
    const outOfCandidatesCount =
      (selectedProgramme?.type as unknown as Type) == Type.Single
        ? (selectedProgramme?.candidateCount as number) * 4
        : (selectedProgramme?.groupCount as number) * 4;
    // console.log(`${totalCandidatesCount} / ${outOfCandidatesCount}`);

    return `${totalCandidatesCount} / ${outOfCandidatesCount}`

  }

  // const booleanFormatter = (params:any)=>{
  //   if (params.value == true){}
  // }


  ////////////////////////////////////////////////
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "programCode", headerName: "Program Code", minWidth: 110 },
    { field: "name", headerName: "Name" },
    { field: "category.name", headerName: "Category" },
    { field: "model", headerName: "Item" },
    { field: "skill.name", headerName: "Skill" },
    { field: "date", headerName: "Date" },
    { field: "duration", headerName: "Duration" },
    { field: "venue", headerName: "Venue" },
    { field: "programCode", headerName: "Candidate count", cellRenderer: candidateCountFormatter },
    { field: "type", headerName: "Type" },
    // { field: "groupCount", headerName: "Group Count" },
    { field: "resultEntered", headerName: "Result Entered" },
    { field: "resultPublished", headerName: "Result Published" },
    { field: "anyIssue", headerName: "Issue" },
  ]);

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

    console.log(data);
  }, []);

  const maxProgram = 5;
  const minProgram = 5;
  const minSingle = 5;
  const maxSingle = 5;
  const maxGroup = 5;

  const textFormatter = (params: any) => {
    return params.value === null
      ? "-"
      : params.value === true
        ? <div className="flex items-center h-full">
          <svg fill="#11ff00" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" stroke="#11ff00" strokeWidth="0.0049"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "></polygon> </g></svg>
        </div>
        : params.value === false
          ? <div className="flex items-center h-full">
            <svg fill="#ff0000" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490" stroke="#ff0000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
          </div>
          : params.value;
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
      // editable: true,
      resizable: true,

      // valueFormatter: 'e'
      cellRenderer: textFormatter,
    };
  }, []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      // to get 'athlete' showing in the leaf level in this column
      cellRenderer: "agGroupCellRenderer",
      headerName: "Athlete",
      minWidth: 200,
      field: "athlete",
    };
  }, []);

  // const statusBar = useMemo<ColDef>(() => {
  //   return {
  //     statusPanels: [
  //       { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
  //       { statusPanel: 'agTotalRowCountComponent', align: 'center' },
  //       { statusPanel: 'agFilteredRowCountComponent' },
  //       { statusPanel: 'agSelectedRowCountComponent' },
  //       { statusPanel: 'agAggregationComponent' },
  //     ],
  //   }
  // }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => {
        var a = data.slice(0, 50);
        console.log(a);

        setRowData(a);
        // startInterval(params.api!, params.columnApi!);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={gridStyle} className="ag-theme-alpine ag-theme-acmecorp">
          {/* https://stackblitz.com/edit/react-1oe9w4?file=public%2Frobots.txt,src%2FApp.js */}
          <AgGridReact //<props.result>
            rowData={allData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            suppressAggFuncInHeader={true}
            // autoGroupColumnDef={autoGroupColumnDef}
            // statusBar={ statusBar }
            pagination={true}
            enableRangeSelection={true}
            rowSelection="multiple"
          // onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(AGridProgramme);
