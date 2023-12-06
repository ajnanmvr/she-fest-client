"use client";
import DesktopSidebar from "@/components/result/desktop/Sidebar";
import { app } from "@/components/live/firebaseConfig";
import {
  CandidateProgramme,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
  Programme,
  Team,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import { useEffect, useRef, useState } from "react";
import Live from "@/components/live/Live";
var firebasedb = require("firebase/database");
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import NProgress from "nprogress";
// import "./styles/nprogress.css";

export default function page({ params }: { params: { chestNo: string } }) {
  // const { client } = getUrqlClient();
  // const [liveData , setLiveData] = useState<any>(null)

  // const teams = await client.query<
  //   GetAllTeamsQuery,
  //   GetAllTeamsQueryVariables
  // >(GetAllTeamsDocument, { api_key: API_KEY });

  const delay = 0;
  const [index, setIndex] = useState<any>(0);
  const [programs, setPrograms] = useState<any>([]);
  const [value, setValue] = useState<any>();
  const timeoutRef = useRef<any>(null);
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  const router = useRouter();

  const { data, setData } = useGlobalContext();

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const [FirstCnd, setFirstCnd] = useState<CandidateProgramme>();
  const [ScndtCnd, setScndCnd] = useState<CandidateProgramme>();
  const [ThrdtCnd, setThrdCnd] = useState<CandidateProgramme>();

  useEffect(() => {
    resetTimeout();
    console.log(index);

    timeoutRef.current =
      programs.length != 0
        ? setTimeout(() => setIndex((prevIndex: any) => prevIndex + 1), delay)
        : null;

    return () => {
      resetTimeout();
    };
  }, [value]);

  useEffect(() => {
    value ? setPrograms([...programs, value]) : null;
    console.log(programs);
  }, [value]);

  useEffect(() => {
    var db = firebasedb.getDatabase(app);
    var ref = firebasedb.ref(db, "current");

    firebasedb.onValue(ref, (snapshot: any) => {
      const data = snapshot.val();
      if (data == "no data") {
        console.log("show end");
        setValue("show end");
      } else if (data == "congratulations") {
        console.log("display congratulations");
        setValue("display congratulations");
      } else {
        var dateDiff = new Date().getTime() / 1000 - data.startTime / 1000;
        console.log(dateDiff);
        console.log(data);
        setValue(data);

        // if (dateDiff < 3) {
        //   console.log("Bedore", data);
        //   setValue(data);
        //   setTimeout(() => {
        //     console.log("After", data);
        //     setValue(data);
        //   }, 1000);
        // } else {
        //   console.log("After", data);
        //   setValue(data);
        // }
      }
    });
  }, []);

  useEffect(() => {
    console.log(routerButtonClicked);

    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  return (
    <main className="bg-primary lg:bg-accent">
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
      {/* Mobile View */}
      <div className="h-screen w-screen font-sans overflow-hidden flex flex-col gap-4 lg:hidden pt-5">
        {/* Page Name */}
        <div className="h- w-full flex items-star">
          <h1 className="text-base font-semibold px-6 text-white">
            Live Result
          </h1>
        </div>
        {/* heading */}
        <div className="h- flex items-center pt-5 justify-center">
          <h1 className="text-3xl font-semibold px-6 text-white leading-none">
            {/* #Live Results */}
          </h1>
        </div>
        {/* judge Card */}
        <div
          className="whitespace-nowrap ease-slow-to-speed transition duration-[1200ms] h-full"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {programs.map((item: any) => {
            return (
              <>
                {item == "show end" ? (
                  <div className="bg-white h-full w-full rounded-t-large inline-block">
                    <div className="h-[84%] w-full pt-8 leading-tight text-center">
                      <div className="h-[14%] relative top-1/2 -translate-y-1/2  flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-medium px-6 text-primary mb-2">
                          {"No results are live"}
                        </h1>
                        <p
                          onClick={() => {
                            setRouterButtonClicked(true);
                            router.push(`${data.admin ? "/admin" : "/"}`);
                          }}
                          className="rounded-md bg-secondary px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secodarybg-secondary cursor-pointer"
                        >
                          Go back home
                        </p>
                      </div>
                    </div>
                  </div>
                ) : item == "display congratulations" ? (
                  <div className="bg-white h-full w-full rounded-t-large inline-block">
                    <div className="h-[84%] w-full pt-8 leading-tight text-center">
                      <div className="h-[14%] relative">
                        <h1 className="text-2xl font-extrabold px-6 text-primary absolute top-[350%] left-1/2 -translate-x-1/2">
                          {"Congratulations for all team"}
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white h-[120%] w-full rounded-t-large inline-block">
                    {" "}
                    {/* all */}
                    <div className="h-[84%] w-full pt-8 leading-tight text-center">
                      {/* titles */}
                      <div className="h-[14%]">
                        <h1 className="text-2xl font-extrabold px-6 text-primary">
                          {item.name ? item.name : null}
                        </h1>
                        <h1 className="text-xl font-bold px-6 text-[#3757AA]">
                          {item.name ? item.category.name : null}
                        </h1>
                      </div>
                      {/* photos */}
                      <div className="h-[100%] overflow-y-auto pb-5 md:mt-10">
                        <div className="flex justify-center">
                          {/* first */}
                          {item?.candidateProgramme?.map(
                            (itm: CandidateProgramme, i: number) => {
                              if (itm.position?.value === 1) {
                                return (
                                  <div className="relative md:h-72 md:w-72 h-64 w-64 mt-5 md:mt-0">
                                    <div className="bg-green-500 md:h-8 md:w-8 h-5 w-5 rounded-full absolute left-1/2 translate-x-8 top-[2%] flex justify-center items-center">
                                      <h1 className="text-[10px] md:text-base font-semibold text-white">
                                        #1
                                      </h1>
                                    </div>
                                    <div className="bg-green-500 h-4 md:h-6 rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 md:top-[25%] md:translate-y-[7.6rem] flex justify-center items-center">
                                      <h1 className="text-[8px] md:text-sm font-semibold text-white px-2">
                                        {itm?.candidate?.chestNO}
                                      </h1>
                                    </div>
                                    <div className="md:h-52 h-32 w-32 md:w-52 gbg-gray-100 rounded-full mx-auto">
                                      <img
                                        src={
                                          itm.candidate?.imageId
                                            ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                            : "/img/avatar.jpg"
                                        }
                                        className="rounded-full md:h-52 h-32 mx-auto mt-6"
                                        alt=""
                                      />
                                    </div>

                                    <h1 className="md:text-base text-xs mt-2 md:mt-4">
                                      {itm?.candidate?.name}
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs">
                                      Team{" "}
                                      <span className="font-bold">
                                        {" "}
                                        {itm?.candidate?.team?.name}
                                      </span>
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs font-semibold">
                                      {/* Grade {itm?.grade ? itm?.grade?.name : '-' } */}
                                    </h1>
                                  </div>
                                );
                              }
                              return;
                            }
                          )}
                        </div>

                        <div className="flex justify-center -mt-10 md:mt-2">
                          {/* sec */}
                          {item?.candidateProgramme?.map(
                            (itm: CandidateProgramme, i: number) => {
                              if (itm.position?.value === 2) {
                                return (
                                  <div className="relative md:h-72 md:w-72 h-64 w-64 mt-5 md:mt-0">
                                    <div className="bg-green-500 md:h-8 md:w-8 h-5 w-5 rounded-full absolute left-1/2 translate-x-8 top-[2%] flex justify-center items-center">
                                      <h1 className="text-[10px] md:text-base font-semibold text-white">
                                        #2
                                      </h1>
                                    </div>
                                    <div className="bg-green-500 h-4 md:h-6 rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 md:top-[25%] md:translate-y-[7.6rem] flex justify-center items-center">
                                      <h1 className="text-[8px] md:text-sm font-semibold text-white px-2">
                                        {itm?.candidate?.chestNO}
                                      </h1>
                                    </div>
                                    <div className="md:h-52 h-32 w-32 md:w-52 gbg-gray-100 rounded-full mx-auto">
                                      <img
                                        src={
                                          itm.candidate?.imageId
                                            ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                            : "/img/avatar.jpg"
                                        }
                                        className="rounded-full md:h-52 h-32 mx-auto mt-6"
                                        alt=""
                                      />
                                    </div>

                                    <h1 className="md:text-base text-xs mt-2 md:mt-4">
                                      {itm?.candidate?.name}
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs">
                                      Team{" "}
                                      <span className="font-bold">
                                        {" "}
                                        {itm?.candidate?.team?.name}
                                      </span>
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs font-semibold">
                                      {/* Grade {itm?.grade ? itm?.grade?.name : '-' } */}
                                    </h1>
                                  </div>
                                );
                              }
                              return;
                            }
                          )}

                          {/* thir */}
                          {item?.candidateProgramme?.map(
                            (itm: CandidateProgramme, i: number) => {
                              if (itm.position?.value === 3) {
                                return (
                                  <div className="relative md:h-72 md:w-72 h-64 w-64 mt-5 md:mt-0">
                                    <div className="bg-green-500 md:h-8 md:w-8 h-5 w-5 rounded-full absolute left-1/2 translate-x-8 top-[2%] flex justify-center items-center">
                                      <h1 className="text-[10px] md:text-base font-semibold text-white">
                                        #3
                                      </h1>
                                    </div>
                                    <div className="bg-green-500 h-4 md:h-6 rounded-xl absolute left-1/2 -translate-x-1/2 top-1/2 md:top-[25%] md:translate-y-[7.6rem] flex justify-center items-center">
                                      <h1 className="text-[8px] md:text-sm font-semibold text-white px-2">
                                        {itm?.candidate?.chestNO}
                                      </h1>
                                    </div>
                                    <div className="md:h-52 h-32 w-32 md:w-52 gbg-gray-100 rounded-full mx-auto">
                                      <img
                                        src={
                                          itm.candidate?.imageId
                                            ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                            : "/img/avatar.jpg"
                                        }
                                        className="rounded-full md:h-52 h-32 mx-auto mt-6"
                                        alt=""
                                      />
                                    </div>

                                    <h1 className="md:text-base text-xs mt-2 md:mt-4">
                                      {itm?.candidate?.name}
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs">
                                      Team{" "}
                                      <span className="font-bold">
                                        {" "}
                                        {itm?.candidate?.team?.name}
                                      </span>
                                    </h1>
                                    <h1 className="text-[10px] md:text-xs font-semibold">
                                      {/* Grade {itm?.grade ? itm?.grade?.name : '-' } */}
                                    </h1>
                                  </div>
                                );
                              }
                              return;
                            }
                          )}
                        </div>
                        {/* grades */}
                        {/* <div className="md:h-72  h-64 mx-auto -mt-24 md:mt-0  md:p-10 p-5">
                          <div className="flex items-center h-20 justify-center">
                            <div className="bg-gray-200 h-8 w-8 md:h-12 md:w-12 rounded-xl flex items-center justify-center">
                              <h1 className="text-green-500 font-bold">A</h1>
                            </div>
                            <div className="flex flex-col gap-3 items-end mt-6 md:mt-2 h-14">
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center h-20 mt-6 md:mt-16 justify-center">
                            <div className="bg-gray-200 h-8 w-8 md:h-12 md:w-12 rounded-xl flex items-center justify-center">
                              <h1 className="text-green-500 font-bold">B</h1>
                            </div>
                            <div className="flex flex-col gap-3 items-end mt-6 md:mt-2 h-14">
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                              <div className="flex justify-between items-center text-xs md:text-lg gap-3 px-2">
                                <p>SS123</p>
                                <p>Muhammed Midlaj Av</p>
                                <p>Team Chronicle</p>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {/* Desktop View */}
      <div className="w-screen h-screen lg:flex overflow-hidden hidden">
        {/* sidebar */}
        {/* <DesktopSidebar teams={teams.data?.teams as Team[]}/> */}
        {/* main content */}

        <div
          className="bg-cover bg-center w-full h-full "
          style={{ backgroundImage: 'url("/img/live-result-bg.jpg")' }}
        >
          <div className="h-full xl:w-full xl:bg-cover  flex items-center justify-center ">
            <div className="w-[90%] h-[90%] overflow-hidden">
              {/* top */}
              <div className="h-[16%] flex justify-center items-center text-6xl font-bold text-primary">
                {/* <h1>#Live Results</h1> */}
              </div>
              {/* photos */}

              {/* animation url - https://codepen.io/bnsddk/pen/dyXaNod */}

              <div
                className="whitespace-nowrap ease-slow-to-speed transition duration-[1200ms] h-full"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
              >
                {programs.map((item: any) => {
                  // const FirstCndN = item?.candidateProgramme?.find((itm : CandidateProgramme , i : number )=>{
                  //   return itm.position?.value === 1
                  // })

                  // setFirstCnd(FirstCndN)

                  // const ScdCndN = item?.candidateProgramme?.find((itm : CandidateProgramme , i : number )=>{
                  //   return itm.position?.value === 2
                  // })

                  // setFirstCnd(ScdCndN)

                  // const ThrdCndM = item?.candidateProgramme?.find((itm : CandidateProgramme , i : number )=>{
                  //   return itm.position?.value === 3
                  // })

                  // setFirstCnd(ThrdCndM)

                  console.log(item);

                  return (
                    <div className="bg-white h-[78%] w-full rounded-[2rem] text-center pt-2 lg:pt-5 overflow-hidden inline-block">
                      {item == "show end" ? (
                        <div className="relative top-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                          <h1 className="text-4xl lg:text-3xl 2xl:text-5xl font-semibold lg:mb-2 2xl:mb-4">
                            {"No results are live"}
                          </h1>
                          <p
                            onClick={() => {
                              setRouterButtonClicked(true);
                              router.push(`${data.admin ? "/admin" : "/"}`);
                            }}
                            className="rounded-md bg-secondary px-3.5 py-2.5 lg:text-sm 2xl:text-base font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secodarybg-secondary cursor-pointer"
                          >
                            Go back home
                          </p>
                        </div>
                      ) : item == "display congratulations" ? (
                        <h1 className="text-4xl lg:text-3xl 2xl:text-5xl font-semibold relative top-1/2 -translate-y-1/2">
                          {"Congratulations for all team"}
                        </h1>
                      ) : (
                        <>
                          <h1 className="text-4xl lg:text-3xl 2xl:text-5xl font-semibold">
                            {item.name ? item.name : ""}
                          </h1>
                          <h1 className="text-3xl lg:text-2xl 2xl:text-2xl font-semibold">
                            {item.category.name ? item.category.name : ""}
                          </h1>
                          <div className="h-[60%] whitespace-nowrap overflow-hidden">
                            {item?.candidateProgramme?.map(
                              (itm: CandidateProgramme, i: number) => {
                                if (itm.position?.value === 1) {
                                  return (
                                    <div className="w-72 h-full inline-block text-center relative">
                                      <div className="bg-green-500 h-10 w-10 rounded-full absolute left-1/2 translate-x-12 top-6 flex items-center justify-center">
                                        <h1 className="font-semibold text-white 2xl:text-base">
                                          #1
                                        </h1>
                                      </div>
                                      <div className="bg-green-500 h-6 rounded-full absolute left-1/2 -translate-x-1/2 top-[65%] 2xl:top-[65%] flex items-center justify-center">
                                        <h1 className="font-semibold text-white text-sm px-2">
                                          {itm?.candidate?.chestNO}
                                        </h1>
                                      </div>
                                      <div className="h-36 2xl:h-64 w-36 2xl:w-64 gbg-gray-100 rounded-full mx-auto">
                                        <img
                                          src={
                                            itm.candidate?.imageId
                                              ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                              : "/img/avatar.jpg"
                                          }
                                          className="rounded-full h-36 2xl:h-64 mx-auto mt-6"
                                          alt=""
                                        />
                                      </div>
                                      <p className="absolute left-1/2 -translate-x-1/2 top-[73%] 2xl:top-[70%]">
                                        {itm?.candidate?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[80%] 2xl:top-[75%]">
                                        Team {itm?.candidate?.team?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[85%] 2xl:top-[80%]">
                                        {/* Grade <span className="font-semibold">{itm?.grade?.name}</span> */}
                                      </p>
                                    </div>
                                  );
                                }
                                return;
                              }
                            )}

                            {item?.candidateProgramme?.map(
                              (itm: CandidateProgramme, i: number) => {
                                if (itm.position?.value === 2) {
                                  return (
                                    <div className="w-72 h-full inline-block text-center relative">
                                      <div className="bg-green-500 h-10 w-10 rounded-full absolute left-1/2 translate-x-12 top-6 flex items-center justify-center">
                                        <h1 className="font-semibold text-white 2xl:text-base">
                                          #2
                                        </h1>
                                      </div>
                                      <div className="bg-green-500 h-6 rounded-full absolute left-1/2 -translate-x-1/2 top-[65%] 2xl:top-[65%] flex items-center justify-center">
                                        <h1 className="font-semibold text-white text-sm px-2">
                                          {itm?.candidate?.chestNO}
                                        </h1>
                                      </div>
                                      <div className="h-36 2xl:h-64 w-36 2xl:w-64 gbg-gray-100 rounded-full mx-auto">
                                        <img
                                          src={
                                            itm.candidate?.imageId
                                              ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                              : "/img/avatar.jpg"
                                          }
                                          className="rounded-full h-36 2xl:h-64 mx-auto mt-6"
                                          alt=""
                                        />
                                      </div>
                                      <p className="absolute left-1/2 -translate-x-1/2 top-[73%] 2xl:top-[70%]">
                                        {itm?.candidate?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[80%] 2xl:top-[75%]">
                                        Team {itm?.candidate?.team?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[85%] 2xl:top-[80%]">
                                        {/* Grade <span className="font-semibold">{itm?.grade?.name}</span> */}
                                      </p>
                                    </div>
                                  );
                                }
                                return;
                              }
                            )}

                            {item?.candidateProgramme?.map(
                              (itm: CandidateProgramme, i: number) => {
                                if (itm.position?.value === 3) {
                                  return (
                                    <div className="w-72 h-full inline-block text-center relative">
                                      <div className="bg-green-500 h-10 w-10 rounded-full absolute left-1/2 translate-x-12 top-6 flex items-center justify-center">
                                        <h1 className="font-semibold text-white 2xl:text-base">
                                          #3
                                        </h1>
                                      </div>
                                      <div className="bg-green-500 h-6 rounded-full absolute left-1/2 -translate-x-1/2 top-[65%] 2xl:top-[65%] flex items-center justify-center">
                                        <h1 className="font-semibold text-white text-sm px-2">
                                          {itm?.candidate?.chestNO}
                                        </h1>
                                      </div>
                                      <div className="h-36 2xl:h-64 w-36 2xl:w-64 gbg-gray-100 rounded-full mx-auto">
                                        <img
                                          src={
                                            itm.candidate?.imageId
                                              ? `https://drive.google.com/uc?export=view&id=${itm.candidate?.imageId}`
                                              : "/img/avatar.jpg"
                                          }
                                          className="rounded-full h-36 2xl:h-64 mx-auto mt-6"
                                          alt=""
                                        />
                                      </div>
                                      <p className="absolute left-1/2 -translate-x-1/2 top-[73%] 2xl:top-[70%]">
                                        {itm?.candidate?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[80%] 2xl:top-[75%]">
                                        Team {itm?.candidate?.team?.name}
                                      </p>
                                      <p className="absolute left-1/2 -translate-x-1/2 text-sm top-[85%] 2xl:top-[80%]">
                                        {/* Grade <span className="font-semibold">{itm?.grade?.name}</span> */}
                                      </p>
                                    </div>
                                  );
                                }
                                return;
                              }
                            )}
                          </div>

                          {/* grades */}
                          {/* <div className=" 2xl:h-[24.5%] h-[28.2%] flex justify-center items-center ">
                            <div className="w-full h-full  flex p-2 px-5 gap-5 overflow-y-auto ">
                              <div className="flex flex-wrap content-start gap-4 w-full">
                                student 1
                                <div className="flex justify-between items-center w-[45%] h-10 text-sm">
                                  <div className="bg-gray-200 h-10 w-10 rounded-xl text-xl font-bold text-green-500 flex items-center justify-center">
                                    <p>A</p>
                                  </div>
                                  <p>SS123</p>
                                  <p>Muhammed Midlaj Av</p>
                                  <p>Chronicle</p>
                                </div>
                                <div className="flex justify-between items-center w-[45%] h-10 text-sm">
                                  <div className="bg-gray-200 h-10 w-10 rounded-xl text-xl font-bold text-green-500 flex items-center justify-center">
                                    <p>A</p>
                                  </div>
                                  <p>SS123</p>
                                  <p>Muhammed Midlaj Av</p>
                                  <p>Chronicle</p>
                                </div>
                                <div className="flex justify-between items-center w-[45%] h-10 text-sm">
                                  <div className="bg-gray-200 h-10 w-10 rounded-xl text-xl font-bold text-green-500 flex items-center justify-center">
                                    <p>A</p>
                                  </div>
                                  <p>SS123</p>
                                  <p>Muhammed Midlaj Av</p>
                                  <p>Chronicle</p>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
