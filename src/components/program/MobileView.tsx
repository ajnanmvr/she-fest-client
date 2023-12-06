"use client";

import { Programme } from "@/gql/graphql";
import { useEffect, useState } from "react";
import MobileCandidates from "./MobileCandidates";
import MobileResults from "./MobileResults";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

interface Props {
  programme: Programme;
}

export default function MobileView(props: Props) {
  const { programme } = props;

  const [candidatesOrResults, setCandidatesOrResults] = useState("candidates");
  const [dateTime, setDateTime] = useState<Date>();
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  const inactive = {
    button:
      "w-auto bg-white border-2 border-[#3D127A] text-[#3D127A] text-lg font-semibold rounded-3xl px-4",
  };
  const active = {
    button:
      "w-auto bg-[#3D127A] text-white text-lg font-semibold rounded-3xl px-4",
  };

  const router = useRouter();
  useEffect(() => {
    if (programme?.date) {
      setDateTime(new Date(programme?.date));
    }
    console.log(dateTime);
  }, []);

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  function timeFormat12Hour() {
    let h: any = dateTime?.getHours();
    let m: any = dateTime?.getMinutes();
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
    <div className="flex flex-col w-full h-screen bg-[#0E0123] xl:hidden ">
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
      <p className="text-white text-lg font-semibold p-5">Program Details</p>
      <div className="p-5 flex flex-col items-center">
        <div className="flex flex-col w-screen px-5 bigphone:items-center">
          <p className="text-white text-3xl bigphone:text-4xl font-semibold">
            {programme?.name ? programme?.name : ""}
          </p>
        </div>
        <div className="flex gap-2 mt-3">
          <p className="text-[#3F127A] text-xs bg-white rounded-xl px-2 py-[0.125rem] font-semibold">
            {programme?.mode ? programme?.mode?.replace("_", " ") : ""}
          </p>
          <p className="text-[#3F127A] text-xs bg-white rounded-xl px-2 py-[0.125rem] font-semibold">
            {programme?.model ? programme?.model?.toUpperCase() : ""}
          </p>
          <p className="text-[#3F127A] text-xs bg-white rounded-xl px-2 py-[0.125rem] font-semibold">
            {programme?.type ? programme?.type : ""}
          </p>
        </div>
      </div>
      <div className="w-full bg-white rounded-t-[3rem] h-full overflow-hidden">
        <div className="flex mt-2 w-full justify-between p-5">
          <div className="flex flex-col aspect-auto w-40 h-32 bigphone:h-36 bigphone:w-48 bg-[#E1DEFF] rounded-3xl py-2 px-4 justify-center">
            <p className="text-gray-600 text-lt bigphone:text-sm">Category</p>
            <p className="text-[#3D127A] text-xl bigphone:2xl font-bold">
              {programme ? programme?.category?.name : ""}
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-lt bigphone:text-xs text-gray-500">Code</p>
                <p className="text-lt bigphone:text-sm text-[#3D127A] font-bold">
                  {programme ? programme?.programCode : ""}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lt bigphone:text-xs text-gray-500">Count</p>
                <p className="text-lt bigphone:text-sm text-[#3D127A] font-bold ml-auto">
                  0{programme ? programme?.candidateCount : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col aspect-auto w-40 h-32 bigphone:h-36 bigphone:w-48 bg-[#E1DEFF] rounded-3xl py-2 px-4 justify-center">
            <p className="text-gray-600 text-lt bigphone:text-sm">Duration</p>
            <div className="flex">
              <p className="text-[#3D127A] text-xl bigphone:2xl font-bold">
                {programme ? programme?.duration : ""}
              </p>
              <p className="text-[#3D127A] mt-auto text-lt bigphone:text-sm">
                mts
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-lt bigphone:text-xs text-gray-500">Time</p>
                <p className="text-lt bigphone:text-sm text-[#3D127A] font-bold">
                  {/* {timeFormat12Hour()} */}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lt bigphone:text-xs text-gray-500 ml-auto">
                  Date
                </p>
                <p className="text-lt bigphone:text-sm text-[#3D127A] font-bold">
                  {/* {timeFormatDate()} */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          <button
            onClick={() => setCandidatesOrResults("candidates")}
            className={
              candidatesOrResults === "candidates"
                ? active.button
                : inactive.button
            }
          >
            Candidates
          </button>
          <button
            onClick={() => setCandidatesOrResults("results")}
            className={
              candidatesOrResults === "results"
                ? active.button
                : inactive.button
            }
          >
            Results
          </button>
        </div>
        <hr className="border mt-2" />
        {candidatesOrResults === "candidates" ? (
          <MobileCandidates programme={programme} />
        ) : (
          <MobileResults programme={programme} />
        )}
      </div>
    </div>
  );
}