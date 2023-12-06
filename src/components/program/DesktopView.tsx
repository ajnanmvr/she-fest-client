"use client";

import { CandidateProgramme, Programme } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NProgress from "nprogress";

interface Props {
  programme: Programme;
}

export default function DesktopView(props: Props) {
  const { programme } = props;

  const router = useRouter();

  const [resultedCandidates, setResultedCandidates] = useState<
    CandidateProgramme[]
  >([]);

  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    console.log(programme);

    let candidateResults: CandidateProgramme[] = [];

    if (programme?.resultPublished === true) {
      programme?.candidateProgramme?.map((candidate) => {
        console.log(candidate);
        (candidate?.position?.name !== null ||
          candidate?.grade?.name !== null) &&
          candidateResults.push(candidate);
      });
      setResultedCandidates(candidateResults);
    }

    console.log(candidateResults);
  }, []);

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  const activeButton = {
    div: "rounded-xl text-sm h-6 bg-primary border border-primary flex items-center",
    button: "px-2 text-white text-sm",
  };
  const inactiveButton = {
    div: "rounded-xl text-sm h-6 border border-primary flex items-center",
    button: "px-2 text-primary text-sm",
  };
  const [allOrSingleTeam, setAllOrSingleTeam] = useState("all");
  const allCandidates = programme?.candidateProgramme;
  const chronicleCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Chronicle";
  });
  const gazetteCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Gazette";
  });
  const heraldCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Herald";
  });
  const tribuneCandidates = allCandidates?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Tribune";
  });

  const [allOrSingleTeamResult, setAllOrSingleTeamResult] = useState("all");

  const allCandidatesResult = resultedCandidates?.sort((a, b) => {
    return Number(b.point) - Number(a.point);
  });
  const chronicleCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Chronicle";
  });
  const gazetteCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Gazette";
  });
  const heraldCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Herald";
  });
  const tribuneCandidatesResult = allCandidatesResult?.filter((candidate) => {
    return candidate?.candidate?.team?.name === "Tribune";
  });
  return (
    <div className="2xl:flex h-full w-full hidden">
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
      <div className="flex flex-col h-full w-[30rem] min-w-[18rem] bg-primary justify-center items-start gap-3 pl-5">
        <h1 className="text-white text-4xl px-3 leading-tight font-bold">
          Program Details
        </h1>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Name</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${programme ? programme?.name : ""}`}
          />
        </div>
        <div className="flex w-full px-4">
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Code</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${programme ? programme?.programCode : ""}`}
            />
          </div>
          <div className="flex flex-col w-2/3">
            <label className="text-accent text-sm pl-2">Candidate Count</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`0${programme ? programme?.candidateCount : ""}`}
            />
          </div>
        </div>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Category</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${programme ? programme?.category?.name : ""}`}
          />
        </div>
        <div className="flex flex-col w-full pl-4">
          <label className="text-accent text-sm pl-2">Duration</label>
          <input
            type="text"
            disabled
            className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
            placeholder={`${programme ? programme?.duration : ""}`}
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
                programme ? programme?.mode?.replace("_", " ") : ""
              }`}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Item</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${
                programme ? programme?.model?.toUpperCase() : ""
              }`}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="text-accent text-sm pl-2">Type</label>
            <input
              type="text"
              disabled
              className="h-10 w-11/12 bg-white rounded-lg text-md placeholder:pl-2 placeholder:text-primary"
              placeholder={`${programme ? programme?.type : ""}`}
            />
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col h-full w-full justify-center px-10 pt-20">
        <h1 className="text-5xl font-semibold pl-5">Detailed View</h1>
        {/* Card */}
        <div className="flex h-full w-full gap-10 overflow-hidden">
          {/* Candidates Card */}
          <div className="flex h-full w-1/2 overflow-y-auto">
            <div className="flex flex-col w-full h-5/6 bg-white rounded-big  pb-10 pt-4">
              {/* sliders */}
              <div className="flex h-16 justify-start items-center gap-5 px-8">
                <p className="px-3 text-primary font-bold text-4xl">
                  Candidates
                </p>
              </div>
              <hr className="border" />
              {/* sort buttons */}
              <div className="flex h-10 items-center px-10 gap-3">
                <div
                  className={`${
                    allOrSingleTeam === "all"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeam("all");
                    }}
                    className={`${
                      allOrSingleTeam === "all"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    All
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeam === "chronicle"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeam("chronicle");
                    }}
                    className={`${
                      allOrSingleTeam === "chronicle"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Chronicle
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeam === "tribune"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeam("tribune");
                    }}
                    className={`${
                      allOrSingleTeam === "tribune"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Tribune
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeam === "gazette"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeam("gazette");
                    }}
                    className={`${
                      allOrSingleTeam === "gazette"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Gazette
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeam === "herald"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeam("herald");
                    }}
                    className={`${
                      allOrSingleTeam === "herald"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Herald
                  </button>
                </div>
              </div>
              <hr className="border" />
              {/* table */}
              <div className="flex flex-col h-5/6 items-center pt-5 gap-5 overflow-y-auto">
                {allOrSingleTeam === "all"
                  ? allCandidates?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-3/4 text-md items-center pl-2 gap-3 justify-start">
                          <img
                            src={`${
                              `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                              "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                            }`}
                            className="rounded-full h-10 border"
                            alt=""
                          />
                          <p>{candidate?.candidate?.chestNO}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/4 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                        </div>
                      </div>
                    ))
                  : allOrSingleTeam === "chronicle"
                  ? chronicleCandidates?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-3/4 text-md items-center pl-2 gap-3 justify-start">
                          <img
                            src={`${
                              `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                              "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                            }`}
                            className="rounded-full h-10 border"
                            alt=""
                          />
                          <p>{candidate?.candidate?.chestNO}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/4 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                        </div>
                      </div>
                    ))
                  : allOrSingleTeam === "gazette"
                  ? gazetteCandidates?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-3/4 text-md items-center pl-2 gap-3 justify-start">
                          <img
                            src={`${
                              `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                              "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                            }`}
                            className="rounded-full h-10 border"
                            alt=""
                          />
                          <p>{candidate?.candidate?.chestNO}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/4 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                        </div>
                      </div>
                    ))
                  : allOrSingleTeam === "herald"
                  ? heraldCandidates?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-3/4 text-md items-center pl-2 gap-3 justify-start">
                          <img
                            src={`${
                              `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                              "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                            }`}
                            className="rounded-full h-10 border"
                            alt=""
                          />
                          <p>{candidate?.candidate?.chestNO}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/4 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                        </div>
                      </div>
                    ))
                  : allOrSingleTeam === "tribune"
                  ? tribuneCandidates?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-3/4 text-md items-center pl-2 gap-3 justify-start">
                          <img
                            src={`${
                              `https://drive.google.com/uc?id=${candidate?.candidate?.imageId}` ||
                              "https://banner2.cleanpng.com/20180410/bbw/kisspng-avatar-user-medicine-surgery-patient-avatar-5acc9f7a7cb983.0104600115233596105109.jpg"
                            }`}
                            className="rounded-full h-10 border"
                            alt=""
                          />
                          <p>{candidate?.candidate?.chestNO}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/4 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          {/* Results Card */}
          <div className="flex h-full w-1/2 overflow-y-auto">
            <div className="flex flex-col w-full h-5/6 bg-white rounded-big pb-10 pt-4">
              {/* sliders */}
              <div className="flex h-16 justify-start items-center gap-5 px-8">
                <p className="px-3 text-primary font-bold text-4xl">Results</p>
              </div>
              <hr className="border" />
              {/* sort buttons */}
              <div className="flex h-10 items-center px-10 gap-3">
                <div
                  className={`${
                    allOrSingleTeamResult === "all"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeamResult("all");
                    }}
                    className={`${
                      allOrSingleTeamResult === "all"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    All
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeamResult === "chronicle"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeamResult("chronicle");
                    }}
                    className={`${
                      allOrSingleTeamResult === "chronicle"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Chronicle
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeamResult === "tribune"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeamResult("tribune");
                    }}
                    className={`${
                      allOrSingleTeamResult === "tribune"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Tribune
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeamResult === "gazette"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeamResult("gazette");
                    }}
                    className={`${
                      allOrSingleTeamResult === "gazette"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Gazette
                  </button>
                </div>
                <div
                  className={`${
                    allOrSingleTeamResult === "herald"
                      ? activeButton.div
                      : inactiveButton.div
                  }`}
                >
                  <button
                    onClick={() => {
                      setAllOrSingleTeamResult("herald");
                    }}
                    className={`${
                      allOrSingleTeamResult === "herald"
                        ? activeButton.button
                        : inactiveButton.button
                    }`}
                  >
                    Herald
                  </button>
                </div>
              </div>
              <hr className="border" />
              {/* table */}
              <div className="flex flex-col h-5/6 items-center pt-5 gap-5 overflow-y-auto">
                {/* result List */}
                {resultedCandidates.length > 0 ? (
                  allOrSingleTeamResult === "all" ? (
                    allCandidatesResult?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-1/2 text-md items-center pl-2 gap-3 justify-start">
                          <p>
                            {candidate?.position?.name
                              ? candidate?.position?.name
                              : "Nil"}
                          </p>
                          <p>{candidate?.programme?.programCode}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/2 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                          <p>
                            {candidate?.grade?.name
                              ? candidate?.grade?.name
                              : `Nil`}
                          </p>
                          <p>{candidate?.point}pts</p>
                        </div>
                      </div>
                    ))
                  ) : allOrSingleTeamResult === "chronicle" ? (
                    chronicleCandidatesResult?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-1/2 text-md items-center pl-2 gap-3 justify-start">
                          <p>
                            {candidate?.position?.name
                              ? candidate?.position?.name
                              : "Nil"}
                          </p>
                          <p>{candidate?.programme?.programCode}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/2 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                          <p>
                            {candidate?.grade?.name
                              ? candidate?.grade?.name
                              : `Nil`}
                          </p>
                          <p>{candidate?.point}pts</p>
                        </div>
                      </div>
                    ))
                  ) : allOrSingleTeamResult === "gazette" ? (
                    gazetteCandidatesResult?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-1/2 text-md items-center pl-2 gap-3 justify-start">
                          <p>
                            {candidate?.position?.name
                              ? candidate?.position?.name
                              : "Nil"}
                          </p>
                          <p>{candidate?.programme?.programCode}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/2 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                          <p>
                            {candidate?.grade?.name
                              ? candidate?.grade?.name
                              : `Nil`}
                          </p>
                          <p>{candidate?.point}pts</p>
                        </div>
                      </div>
                    ))
                  ) : allOrSingleTeamResult === "herald" ? (
                    heraldCandidatesResult?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-1/2 text-md items-center pl-2 gap-3 justify-start">
                          <p>
                            {candidate?.position?.name
                              ? candidate?.position?.name
                              : "Nil"}
                          </p>
                          <p>{candidate?.programme?.programCode}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/2 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                          <p>
                            {candidate?.grade?.name
                              ? candidate?.grade?.name
                              : `Nil`}
                          </p>
                          <p>{candidate?.point}pts</p>
                        </div>
                      </div>
                    ))
                  ) : allOrSingleTeamResult === "tribune" ? (
                    tribuneCandidatesResult?.map((candidate) => (
                      <div className="flex items-center h-16 min-h-[4rem] bg-accent w-11/12 rounded-xl">
                        <div className="flex h-8 w-1/2 text-md items-center pl-2 gap-3 justify-start">
                          <p>
                            {candidate?.position?.name
                              ? candidate?.position?.name
                              : "Nil"}
                          </p>
                          <p>{candidate?.programme?.programCode}</p>
                          <p>{candidate?.candidate?.name}</p>
                        </div>
                        <div className="flex h-8 w-1/2 text-md items-center pr-2 gap-3 justify-end">
                          <p>{candidate?.candidate?.team?.name}</p>
                          <p>
                            {candidate?.grade?.name
                              ? candidate?.grade?.name
                              : `Nil`}
                          </p>
                          <p>{candidate?.point}pts</p>
                        </div>
                      </div>
                    ))
                  ) : null
                ) : (
                  <p>No Results Found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}