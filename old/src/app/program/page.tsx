"use client";
import NotFound from "@/components/candidate/NotFound";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NProgress from "nprogress";
// import "./styles/nprogress.css";

const page = () => {
  const [programCode, setProgramCode] = useState("");
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });
  const router = useRouter();

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  return (
    <div className="p-8 h-52 w-96 fixed top-1/2 -translate-y-1/2 bg-white rounded-xl left-1/2 shadow-2xl -translate-x-1/2 flex flex-col items-center gap-5">
      <img src="/img/realia-txt-black.png" alt="" className="h-12" />
      <input
        onChange={(e) => {
          setProgramCode(e.target.value);
        }}
        onKeyDown={(e) => {
          if (programCode.length == 4 && e.key === "Enter") {
            setRouterButtonClicked(true);
            router.push(`/candidate/${programCode}`);
          }
        }}
        type="text"
        className="bg-white border rounded-full h-12 w-1/2 text-center uppercase font-bold placeholder:font-light"
        placeholder="Program Code"
      />

      <div className="flex w-full justify-center gap-2">
        <button
          onClick={() => {
            setRouterButtonClicked(true);
            router.push(`/`);
          }}
          className="bg-secondary hover:bg-primary rounded-full h-8 w-1/4 text-lg text-white font-semibold transition-all duration-500"
        >
          BACK
        </button>
        <button
          onClick={() => {
            setRouterButtonClicked(true);
            router.push(`/program/${programCode}`);
          }}
          className="bg-secondary hover:bg-primary rounded-full h-8 w-1/4 text-lg text-white font-semibold transition-all duration-500"
        >
          SUBMIT
        </button>
      </div>
    </div>
    // <NotFound/>
  );
};

export default page;
