"use client";
import { Candidate, Category, Team } from "@/gql/graphql";
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
import { ICellRendererParams } from 'ag-grid-community';
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
  result: Candidate[];
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

const AGrid = (props: Props) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [allData, setAllData] = useState<Candidate[]>(props.result);
  const [data, setData] = useState<Candidate[]>(props.result);
  const [rowData, setRowData] = useState<IOlympicData[]>();

  // ///////////////////////////////////////
  const createImageSpan = (imageMultiplier: number, image: string) => {
    const resultElement = document.createElement('span');
    for (let i = 0; i < imageMultiplier; i++) {
      const imageElement = document.createElement('img');
      imageElement.src =
        'https://www.ag-grid.com/example-assets/weather/' + image;
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
  


  const avatarFormatter = ( params:  any ) => {
    console.log(params.value);  
    var imageLink
    if (params.value){
      imageLink = 'https://drive.google.com/uc?id='+params.value
    } else {
      imageLink = '/img/avatar.jpg'
    }
    return <img src={imageLink} alt="Avatar" width="50px" height="50px"  className="rounded-full"/>
  }
  ////////////////////////////////////////////////
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "adno", headerName: "Ad No", defaultAggFunc: "sum", width: 100 },
    { field: "name", headerName: "Name", minWidth: 200 },
    { field: "chestNO", headerName: "Chest No", minWidth: 70 },
    { field: "class", headerName: "Class" },
    { field: "category.name", headerName: "Category", minWidth: 150 },
    { field: "team.name", headerName: "Team", minWidth: 100 },
    { field: "imageId", headerName: "Avatar", minWidth: 120 ,  cellRenderer: avatarFormatter},
    { field: "groupPoint", headerName: "Group Point" },
    { field: "groupSportsPoint", headerName: "Group Sports Point" },
    { field: "individualPoint", headerName: "Individual Point" },
    { field: "individualSportsPoint", headerName: "Individual Sports Point" },
    
  ]);

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

    console.log(data);
  }, []);

  const maxProgram = 5;
  const minProgram = 5;
  const minSingle = 5;
  const maxSingle = 5;
  const maxGroup = 5;

  const textFormatter = (params: any) => {
    return params.value === null ? "-" : params.value;
  };

  

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
      // editable: true,
      resizable: true,
      // valueFormatter: 'e'
      valueFormatter: textFormatter,
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
        {/* <div className="example-header">
          <div
            style={{
              display: 'inline-block',
              height: '10px',
              marginTop: '5px',
              marginRight: '10px',
              width: '100px',
              border: '1px solid grey',
            }}
          >
            <div
              id="animationCountdown"
              className="transition-width"
              style={{ backgroundColor: 'grey', height: '100%', width: '0%' }}
            ></div>
          </div>
          <span id="animationAction"></span>
        </div> */}

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact //<props.result>
            rowData={allData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowHeight={60}
            pagination={true}
            // paginationPageSize={5}
            suppressAggFuncInHeader={true}
            autoGroupColumnDef={autoGroupColumnDef}
            // onGridReady={onGridReady}
            // <AgGridColumn/>
          >
          </AgGridReact>
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
}))(AGrid);
