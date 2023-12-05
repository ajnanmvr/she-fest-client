"use client";
import InfoBar from "@/components/admin/InfoBar";
import OneCategory from "@/components/admin/category/SingleCategory";
import RightSideBar from "@/components/admin/RightSideBar";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { cacheExchange, fetchExchange } from "urql";
import { Category } from "@/gql/graphql";

interface Props {
  data: { 
    title: string;
    icon: any;
  }[];
  result: Category[];
}

const Category = (props: Props) => {
  const [IsRightSideBarOpen, setIsRightSideBarOpen] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState({ id: 0, name: "" });
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Category[]>(props.result);

  // write a function for download the result as excel file with border and header

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
    a.download = "Category.csv";
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
                    setData(
                      props.result.filter((item: any) =>
                        item.name
                          .toLocaleLowerCase()
                          .includes(e.target.value.toLocaleLowerCase())
                      )
                    );
                  }}
                />
              </div>
              <div className="w-1/3 h-full float-left">
                <button
                  className="bg-blue-600"
                  onClick={downloadExcel}
                >
                  Export
                </button>
              </div>
              <div className="w-1/3 h-full float-left">
                <button
                  className="bg-green-600"
                  onClick={() => {
                    setIsCreate(true);
                    setIsEdit(false);
                    setIsRightSideBarOpen(true);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="flex">

            <div className="grid grid-cols-4 gap-4 w-full">
              {data?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full h-full bg-base-100 rounded-lg mt-[1%] cursor-pointer "
                    onClick={() => {
                      setIsRightSideBarOpen(true);
                      setSelectedCategory(item);
                      setIsEdit(false);
                      setIsCreate(false);
                    }}
                  >
                    <div className="w-1/3">
                      <p className="text-base-content">{item.name}</p>
                    </div>
                    <div className="w-1/3 ">
                      <p className="text-base-content">{item.id}</p>
                    </div>
                  </div>
                );
              })}


            </div>


          </div>
        </div>
      </div>
      <RightSideBar
        key={1}
        isOpen={IsRightSideBarOpen}
        setIsOpen={setIsRightSideBarOpen}
      >
        <OneCategory
          key={1}
          name={SelectedCategory.name}
          id={SelectedCategory.id}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          data={data}
          setData={setData}
          isOpen={IsRightSideBarOpen}
          setIsOpen={setIsRightSideBarOpen}
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
}))(Category);
