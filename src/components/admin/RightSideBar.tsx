"use client";
import { ChevronLeft, ChevronRight } from "@/icons/arrows";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  isEdit?: boolean;
  isCreate?: boolean;
}

const RightSideBar = (props: Props) => {
  return (
    <div
      className={`${
        props.isOpen ? "lg:w-72 w-[95%] opacity-100" : "w-0 opacity-0"
      } bg-accent lg:ms-3 rounded-2xl fixed right-1/2 left-1/2 -translate-x-1/2
       lg:right-0 lg:left-0 lg:-translate-x-0 h-[90%] lg:h-full lg:static  content-between
        justify-between flex flex-col lg:ml-6 transition-all duration-500 overflow-hidden`}
    >
      <div className="flex justify-between bg-secondary h-15 items-center text-white p-5">
        <p className="font-bold w-3/5 leading-5">
          {props.isEdit ? "Edit" : props.isCreate ? "Create" : "View"}
        </p>
        <ChevronLeft
          className="w-7 h-7 cursor-pointer fill-accent  transition-all"
          SetOpen={props.setIsOpen }
          open={props.isOpen }
        />
      </div>

      <div className="p-5 flex-1 h-full w-full overflow-y-auto overflow-x-hidden">
        {props.children}
      </div>
    </div>
  );
};

export default RightSideBar;
