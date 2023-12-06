"use client";
import { Candidate, CandidateProgramme, Programme, Type } from "@/gql/graphql";
import React, { useEffect, useState } from "react";
import ProgramListIpad from "./ProgramListIpad";
import ResultListIpad from "./ResultListIpad";
import ProgramListPhone from "./ProgramListPhone";
import ResultListPhone from "./ResultListPhone";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
interface Props {
  candidate: Candidate;
candidateSportsPoint: number;
  candidateArtsPoint: number;
}

export default function ProgramAndResultDesktop(props: Props) {
  const [publishedResults, setPublishedResults] = useState<
    CandidateProgramme[]
  >([]);
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });
  

  const router = useRouter();

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  useEffect(() => {
    let candidateProgrammes: CandidateProgramme[] = [];
    props?.candidate?.candidateProgrammes?.map((candidateProgramme) => {
      candidateProgramme?.programme?.resultPublished &&
        candidateProgrammes.push(candidateProgramme);
    });

    setPublishedResults(candidateProgrammes);
  }, []);

  const [programsOrResults, setProgramsOrResults] = useState("programs");
  const [allOrIndividualOrGroup, setAllOrIndividualOrGroup] = useState("all");
  const [allOrIndividualOrGroupResult, setAllOrIndividualOrGroupResult] =
    useState("all");



  const allPrograms = props?.candidate?.candidateProgrammes;
  const individualPrograms = props?.candidate?.candidateProgrammes?.filter(
    function (programme) {
      return programme?.programme?.type === (Type.Single as any);
    }
  );
  const groupPrograms = props?.candidate?.candidateProgrammes?.filter(function (
    programme
  ) {
    return programme?.programme?.type === (Type.Group as any);
  });

  const programsButton = {
    div: "bg-primary border h-3/5 flex items-center rounded-2xl",
    button: "px-3 text-lg text-white font-bold",
  };

  const resultsButton = {
    div: "bg-transparent border h-3/5 flex items-center rounded-2xl",
    button: "px-3 text-lg text-primary",
  };

  const specialButtonProgram = {
    div: "bg-primary text-primary h-6 rounded-xl outline outline-1",
    button: "px-2 text-white font-bold",
  };
  const commonButtonProgram = {
    div: "bg-transparent h-6 rounded-xl outline outline-1",
    button: "px-2 text-primary",
  };

  const allPublishedResults = publishedResults;
  const individualPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Single as any)
  );
  const groupPublishedResults = allPublishedResults.filter(
    (result) => result?.programme?.type === (Type.Group as any)
  );

  const specialButtonResults = {
    div: "bg-primary text-primary h-6 rounded-xl outline outline-1",
    button: "px-2 text-white font-bold",
  };
  const commonButtonResults = {
    div: "bg-transparent h-6 rounded-xl outline outline-1",
    button: "px-2 text-primary",
  };

  return (
    <>
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
      {/* Profile Desktop */}
      <div className="hidden md:hidden lg:block w-full h-screen bg-accent">
        <div className="flex h-1/6 items-end">
          <h1 className="text-primary font-extrabold text-6xl ml-10">
            Profile
          </h1>
        </div>
        <div className="cards mx-10 flex content-around gap-10 md:hidden lg:flex h-5/6 pt-10">
          <div className="bg-white h-5/6 w-1/2 rounded-3xl overflow-hidden">
            <h1 className="text-3xl text-primary font-bold mx-5 mt-5">
              Programs
            </h1>
            <hr className="border" />
            <div className="mx-5 py-3 flex gap-3">
              <div
                className={`${
                  allOrIndividualOrGroup === "all"
                    ? specialButtonProgram.div
                    : commonButtonProgram.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("all");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "all"
                      ? specialButtonProgram.button
                      : commonButtonProgram.button
                  }`}
                >
                  All
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroup === "individual"
                    ? specialButtonProgram.div
                    : commonButtonProgram.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("individual");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "individual"
                      ? specialButtonProgram.button
                      : commonButtonProgram.button
                  }`}
                >
                  Individual
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroup === "group"
                    ? specialButtonProgram.div
                    : commonButtonProgram.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroup("group");
                  }}
                  className={`${
                    allOrIndividualOrGroup === "group"
                      ? specialButtonProgram.button
                      : commonButtonProgram.button
                  }`}
                >
                  Group
                </button>
              </div>
            </div>
            <hr className="border" />
            {/* list */}

            <div className="mx-5 flex flex-col items-center overflow-y-auto gap-5 h-[80%] py-5">
              {/* programslist Desktop */}
              {allOrIndividualOrGroup === "all"
                ? allPrograms?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm px-5">
                      <h1 className="mt-4">
                        {programme?.programme?.programCode}
                      </h1>
                      <h1 className="mt-4">{programme?.programme?.name}</h1>
                      <div className="text-lt flex flex-col items-end mt-2">
                        {/* <p>-</p> */}
                        {/* <p>-</p> */}
                      </div>
                    </div>
                  ))
                : allOrIndividualOrGroup === "individual"
                ? individualPrograms?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm px-5">
                      <h1 className="mt-4">
                        {programme?.programme?.programCode}
                      </h1>
                      <h1 className="mt-4">{programme?.programme?.name}</h1>
                      <div className="text-lt flex flex-col items-end mt-2">
                        {/* <p>-</p> */}
                        {/* <p>-</p> */}
                      </div>
                    </div>
                  ))
                : allOrIndividualOrGroup === "group"
                ? groupPrograms?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm px-5">
                      <h1 className="mt-4">
                        {programme?.programme?.programCode}
                      </h1>
                      <h1 className="mt-4">{programme?.programme?.name}</h1>
                      <div className="text-lt flex flex-col items-end mt-2">
                        {/* <p>-</p> */}
                        {/* <p>-</p> */}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className="bg-white h-5/6 w-2/3 rounded-3xl overflow-hidden">
            <h1 className="text-3xl text-primary font-bold mx-5 mt-5">
              Results
            </h1>
            <hr className="border" />
            <div className="mx-5 py-3 flex gap-3">
              <div
                className={`${
                  allOrIndividualOrGroupResult === "all"
                    ? specialButtonResults.div
                    : commonButtonResults.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroupResult("all");
                  }}
                  className={`${
                    allOrIndividualOrGroupResult === "all"
                      ? specialButtonResults.button
                      : commonButtonResults.button
                  }`}
                >
                  All
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroupResult === "individual"
                    ? specialButtonResults.div
                    : commonButtonResults.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroupResult("individual");
                  }}
                  className={`${
                    allOrIndividualOrGroupResult === "individual"
                      ? specialButtonResults.button
                      : commonButtonResults.button
                  }`}
                >
                  Individual
                </button>
              </div>
              <div
                className={`${
                  allOrIndividualOrGroupResult === "group"
                    ? specialButtonResults.div
                    : commonButtonResults.div
                }`}
              >
                <button
                  onClick={() => {
                    setAllOrIndividualOrGroupResult("group");
                  }}
                  className={`${
                    allOrIndividualOrGroupResult === "group"
                      ? specialButtonResults.button
                      : commonButtonResults.button
                  }`}
                >
                  Group
                </button>
              </div>
            </div>
            <hr className="border" />
            {/* list */}
            <div className="mx-5 flex flex-col items-center overflow-y-auto gap-5 h-41/50 pt-5">
              {/* 1 */}
              {publishedResults.length > 0 ? (
                allOrIndividualOrGroupResult === "all" ? (
                  allPublishedResults?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm items-center px-5">
                      <div className="flex gap-8 text-sm">
                        <p className="">{programme?.programme?.programCode}</p>
                        <p className="">{programme?.programme?.name}</p>
                      </div>
                      <div className="text-sm flex gap-2 flex-row items-end -pt-2 ml-24">
                        <p>
                          {programme?.position?.name
                            ? programme?.position?.name
                            : `Nil`}
                        </p>
                        <p>
                          {programme?.grade?.name
                            ? programme?.grade?.name
                            : `Nil`}
                        </p>
                        <p>{programme?.point}pts</p>
                      </div>
                    </div>
                  ))
                ) : allOrIndividualOrGroupResult === "individual" ? (
                  individualPublishedResults?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm items-center px-5">
                      <div className="flex gap-8 text-sm">
                        <p className="">{programme?.programme?.programCode}</p>
                        <p className="">{programme?.programme?.name}</p>
                      </div>
                      <div className="text-sm flex gap-2 flex-row items-end -pt-2 ml-24">
                        <p>
                          {programme?.position?.name
                            ? programme?.position?.name
                            : `Nil`}
                        </p>
                        <p>
                          {programme?.grade?.name
                            ? programme?.grade?.name
                            : `Nil`}
                        </p>
                        <p>{programme?.point}pts</p>
                      </div>
                    </div>
                  ))
                ) : allOrIndividualOrGroupResult === "group" ? (
                  groupPublishedResults?.map((programme) => (
                    <div className="h-12 rounded-xl w-full bg-accent flex flex-row justify-between text-sm items-center px-5">
                      <div className="flex gap-8 text-sm">
                        <p className="">{programme?.programme?.programCode}</p>
                        <p className="">{programme?.programme?.name}</p>
                      </div>
                      <div className="text-sm flex gap-2 flex-row items-end -pt-2 ml-24">
                        <p>
                          {programme?.position?.name
                            ? programme?.position?.name
                            : `Nil`}
                        </p>
                        <p>
                          {programme?.grade?.name
                            ? programme?.grade?.name
                            : `Nil`}
                        </p>
                        <p>{programme?.point}pts</p>
                      </div>
                    </div>
                  ))
                ) : null
              ) : (
                <p>No Results Published</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Ipad */}
      <div className="lg:hidden hidden md:block w-full bg-accent">
        {/* text */}
        <div className="flex h-1/6 items-end">
          <h1 className="text-primary font-extrabold text-6xl ml-10">
            Profile
          </h1>
        </div>
        {/* cards */}
        <div className="bg-white h-4/6 w-5/6 mx-10 rounded-3xl overflow-hidden mt-5">
          {/* slider */}
          <div className="h-16 w-full flex items-center gap-5 justify-center">
            <div
              className={`${
                programsOrResults === "programs"
                  ? programsButton.div
                  : resultsButton.div
              }`}
            >
              <button
                onClick={() => {
                  setProgramsOrResults("programs");
                }}
                className={`${
                  programsOrResults === "programs"
                    ? programsButton.button
                    : resultsButton.button
                }`}
              >
                Programs
              </button>
            </div>
            <div
              className={`${
                programsOrResults === "results"
                  ? programsButton.div
                  : resultsButton.div
              }`}
            >
              <button
                onClick={() => {
                  setProgramsOrResults("results");
                }}
                className={`${
                  programsOrResults === "results"
                    ? programsButton.button
                    : resultsButton.button
                }`}
              >
                Results
              </button>
            </div>
          </div>
          <hr className="border" />
          {programsOrResults === "programs" ? (
            <ProgramListIpad candidate={props.candidate} />
          ) : (
            <ResultListIpad publishedResults={publishedResults} />
          )}
        </div>
      </div>

      {/* Profile Mobile */}
      <div className="bg-primary w-screen h-full md:hidden">
        {/* up */}
        <div className="w-full h-[10%]" />
        {/* down */}
        <div className="w-full h-full bg-primary flex flex-col items-center">
          {/* image */}
          <div className="w-full flex flex-col items-center relative z-40">
            <div
              className="rounded-full h-36 w-36 border-4 bg-white flex flex-col items-end relative bg-cover"
              style={{
                backgroundImage: `url(${
                  props?.candidate?.imageId
                    ? `https://drive.google.com/uc?id=${props?.candidate?.imageId}`
                    : "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                })`,
              }}
            >
              {/* <img
                className="rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHx8&w=1000&q=80"
                alt=""
              /> */}
            </div>
            {/* chessNo */}
            <div className="bg-white h-6 rounded-xl border-2 -mt-3 relative z-50">
              <h1 className="text-sm px-2 font-bold">
                {props?.candidate?.chestNO}
              </h1>
            </div>
          </div>
          {/* card */}
          <div className="bg-white rounded-t-big h-full w-screen relative z-0 -mt-20 overflow-hidden">
            {/* details and score and slider */}
            <div className="h-31/100 rounded-t-big flex flex-col justify-start">
              {/* details */}
              <div className="flex items-center pt-16 pb-3 justify-center px-5">
                <div className="h-1/2 w-1/2 flex flex-col items-start mx-5">
                  <h1 className="text-tn bigphone:text-sm">
                    Candidate Details
                  </h1>
                  <h1 className="font-bold text-xl bigphone:text-2xl -mt-1">
                    {props?.candidate?.name}
                  </h1>
                  <p className="text-lt bigphone:text-sm">
                    {props?.candidate?.category?.name}
                  </p>
                  <p className="text-lt bigphone:text-sm -mt-1">
                    Team {props?.candidate?.team?.name}
                  </p>
                </div>
                {/* score */}
                <div className="w-1/2 h-1/2 flex mr-5 gap-5 items-center justify-end pt-4">
                  {/* arts */}
                  <div className="bg-accent rounded-xl h-16 w-16 bigphone:h-20 bigphone:w-20 flex flex-col items-center">
                    <h1 className="text-3xl bigphone:text-4xl font-bold mt-2">
                      {props?.candidateArtsPoint || 0}
                    </h1>
                    <p className="-mt-2 text-sm">Arts</p>
                  </div>
                  {/* sports */}
                  <div className="bg-accent rounded-xl h-16 w-16 bigphone:h-20 bigphone:w-20 flex flex-col items-center">
                    <h1 className="text-3xl bigphone:text-4xl font-bold mt-2">
                      {props?.candidateSportsPoint || 0}
                    </h1>
                    <p className="-mt-2 text-sm">Sports</p>
                  </div>
                </div>
              </div>
            </div>
            {/* slider */}
            <div className="h-1/10 w-full flex items-center gap-5 justify-center pb-3">
              <div
                className={`${
                  programsOrResults === "programs"
                    ? programsButton.div
                    : resultsButton.div
                }`}
              >
                <button
                  onClick={() => {
                    setProgramsOrResults("programs");
                  }}
                  className={`${
                    programsOrResults === "programs"
                      ? programsButton.button
                      : resultsButton.button
                  }`}
                >
                  Programs
                </button>
              </div>
              <div
                className={`${
                  programsOrResults === "results"
                    ? programsButton.div
                    : resultsButton.div
                }`}
              >
                <button
                  onClick={() => {
                    setProgramsOrResults("results");
                  }}
                  className={`${
                    programsOrResults === "results"
                      ? programsButton.button
                      : resultsButton.button
                  }`}
                >
                  Results
                </button>
              </div>
            </div>
            {programsOrResults === "programs" ? (
              <ProgramListPhone candidate={props.candidate} />
            ) : (
              <ResultListPhone publishedResults={publishedResults} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}