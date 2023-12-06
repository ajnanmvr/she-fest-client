"use client";

import { CandidateProgramme, Programme } from "@/gql/graphql";
import { useEffect, useState } from "react";
import TabCandidates from "./TabCandidates";
import TabResults from "./TabResults";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

interface Props {
  programme: Programme;
}

export default function TabView(props: Props) {
  const router = useRouter();
  const { programme } = props;

  const [candidatesOrResults, setCandidatesOrResults] = useState("candidates");
  const [dateTime, setDateTime] = useState<Date>();
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  const active = {
    div: "rounded-xl text-sm h-8 bg-primary border border-primary flex items-center",
    button: "px-3 text-white text-lg",
  };
  const inactive = {
    div: "rounded-xl text-sm h-8 border border-primary flex items-center",
    button: "px-3 text-primary text-lg",
  };

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  useEffect(() => {
    if (programme?.date) {
      setDateTime(new Date(programme?.date));
    }
    console.log(dateTime);
  }, []);

  function timeFormat12Hour() {
    let h: any = dateTime?.getUTCHours();
    let m: any = dateTime?.getUTCMinutes();
    let ampm = h >= 12 ? "pm" : "am";

    h = h % 12;
    h = h ? h : 12;

    m = m?.toString().padStart(2, "0");
    const formatedTimeString = h + ":" + m + " " + ampm;
    return formatedTimeString;
  }

  function timeFormatDate() {
    console.log(dateTime?.getUTCMonth());
    let day: any = dateTime?.getUTCDate();
    let month: any = dateTime?.getUTCMonth();
    let year: any = dateTime?.getUTCFullYear();

    const formatedTimeString = day + "-" + month + "-" + year;
    return formatedTimeString;
  }

  return (
    <div className="xl:flex h-full w-full hidden 2xl:hidden">
      <button
        onClick={() => {
          setRouterButtonClicked(true);
          router.push("/");
        }}
        type="button"
        data-te-ripple-init=""
        data-te-ripple-color="light"
        className="inline-block fixed top-5 right-8 bg-white hover:bg-gray-300 rounded-full md:bg-primary p-2 uppercase leading-normal text-white md:shadow-black shadow-white shadow-[0_4px_9px_-4px_#3b71ca] md:hover:bg-secondary transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      >
        <svg
          className="h-6 w-6  lg:w-8 lg:h-8 md:fill-white fill-primary"
          viewBox="0 -960 960 960"
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      </button>
      {/* sidebar */}
      <div className="flex flex-col h-full w-72 min-w-[18rem] bg-primary justify-center items-center gap-3">
        <h1 className="text-white text-5xl px-3 leading-tight font-bold">
          Program Details
        </h1>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Name</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${programme?.name ? programme?.name : ""}`}
          />
        </div>
        <div className="flex w-full px-4">
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Code</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${
                programme?.programCode ? programme?.programCode : ""
              }`}
            />
          </div>
          <div className="flex flex-col w-2/3">
            <label className="text-accent text-sm pl-2">Candidate Count</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`0${
                programme?.candidateCount ? programme?.candidateCount : ""
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Category</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${
              programme?.category?.name ? programme?.category?.name : ""
            }`}
          />
        </div>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Duration</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${programme?.duration ? programme?.duration : ""}`}
          />
        </div>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Date and Time</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            // placeholder={`${timeFormat12Hour()}, ${timeFormatDate()}`}
          />
        </div>
        <div className="flex w-full px-4">
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Mode</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${
                programme?.mode ? programme?.mode?.replace("_", " ") : ""
              }`}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Model</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${
                programme?.model ? programme?.model?.toUpperCase() : ""
              }`}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Type</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${programme?.type ? programme?.type : ""}`}
            />
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col h-full w-full justify-center px-5">
        <h1 className="text-5xl font-semibold pl-5">Detailed View</h1>
        {/* Card */}
        <div className="flex flex-col w-10/11 h-5/6 bg-white rounded-big overflow-hidden pb-10 pt-4">
          {/* sliders */}
          <div className="flex h-16 justify-center items-center gap-5">
            <div
              onClick={() => setCandidatesOrResults("candidates")}
              className={
                candidatesOrResults === "candidates" ? active.div : inactive.div
              }
            >
              <button
                className={
                  candidatesOrResults === "candidates"
                    ? active.button
                    : inactive.button
                }
              >
                Candidates
              </button>
            </div>
            <div
              onClick={() => setCandidatesOrResults("results")}
              className={
                candidatesOrResults !== "candidates" ? active.div : inactive.div
              }
            >
              <button
                className={
                  candidatesOrResults !== "candidates"
                    ? active.button
                    : inactive.button
                }
              >
                Results
              </button>
            </div>
          </div>
          <hr className="border" />
          {/* sort buttons */}
          {candidatesOrResults === "candidates" ? (
            <TabCandidates programme={programme} />
          ) : (
            <TabResults programme={programme} />
          )}
        </div>
      </div>
    </div>
  );
}
