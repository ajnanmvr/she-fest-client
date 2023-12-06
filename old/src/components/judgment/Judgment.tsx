"use client";
import React, { useState, useEffect } from "react";
import { CandidateProgramme, Programme } from "@/gql/graphql";

interface Props {
  programme: Programme;
}

const codeletter = [
  {
    value: 1,
    label: "A",
  },
  {
    value: 2,
    label: "B",
  },
  {
    value: 3,
    label: "C",
  },
  {
    value: 4,
    label: "D",
  },
  {
    value: 5,
    label: "E",
  },
  {
    value: 6,
    label: "F",
  },
  {
    value: 7,
    label: "G",
  },
  {
    value: 8,
    label: "H",
  },
  {
    value: 9,
    label: "I",
  },
  {
    value: 10,
    label: "J",
  },
  {
    value: 11,
    label: "K",
  },
  {
    value: 12,
    label: "L",
  },
  {
    value: 13,
    label: "M",
  },
  {
    value: 14,
    label: "N",
  },
  {
    value: 15,
    label: "O",
  },
  {
    value: 16,
    label: "P",
  },
  {
    value: 17,
    label: "Q",
  },
  {
    value: 18,
    label: "R",
  },
  {
    value: 19,
    label: "S",
  },
  {
    value: 20,
    label: "T",
  },
  {
    value: 21,
    label: "U",
  },
  {
    value: 22,
    label: "V",
  },
  {
    value: 23,
    label: "W",
  },
  {
    value: 24,
    label: "X",
  },
  {
    value: 25,
    label: "Y",
  },
  {
    value: 26,
    label: "Z",
  },
];

const Judgement = (props: Props) => {
  const [columnsCount, setColumnsCount] = useState<number>(2);
  const [judgeData, setJudgeData] = useState<any>({
    programCode: props.programme?.programCode,
    candidates: [
      {
        chestNo: "SM123",
        codeletter: "A",
        point1: 0,
        point2: 0,
        point3: 0,
      },
    ],
  });

  useEffect(() => {
    console.log(props.programme);

    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("judgeData") as string;
    console.log(JSON.parse(value));

    if (value) {
      setJudgeData(JSON.parse(value));
    }

    console.log("judgeData", judgeData);
  }, []);

  const addTotal = (index: any) => {
    var candidateIndex = judgeData.candidates[index];
    console.log(candidateIndex);

    var totalPoints;
    if (columnsCount == 0) {
      totalPoints = candidateIndex?.point1;
    } else if (columnsCount == 1) {
      totalPoints =
        ((candidateIndex?.point1 + candidateIndex?.point2) / 20) * 10;
    } else if (columnsCount == 2) {
      totalPoints =
        ((candidateIndex?.point1 +
          candidateIndex?.point2 +
          candidateIndex?.point3) /
          30) *
        10;
    } else {
      totalPoints = 0;
    }
    console.log(totalPoints);
    var totalArea = document.getElementsByClassName(`total${index}`) as any;
    for (let i = 0; i < totalArea.length; i++) {
      totalArea[i].innerHTML = `${Number.isNaN(totalPoints) ? 0 : totalPoints}`
        .toString()
        .slice(0, 3);
    }
  };

  const saveToLocalStorage = (e: any, i: any, value: number) => {
    var candidateIndex = judgeData.candidates[i];
    // console.log(judgeData.candidates[Index].point1, e.target.value);

    candidateIndex[`point${value}`] = Number(e.target.value);
    console.log(judgeData.candidates[i]);

    addTotal(i);

    localStorage.setItem("judgeData", JSON.stringify(judgeData));
  };

  function generateArray(number: number) {
    const resultArray = [];

    for (let i = 0; i <= number; i++) {
      resultArray.push(i);
    }

    return resultArray;
  }

  useEffect(() => {
    // This code runs after the component has re-rendered with the updated state
    console.log(columnsCount);
    props.programme?.candidateProgramme?.forEach(
      (element: CandidateProgramme, i: number) => {
        addTotal(i);
      }
    ); // You can access the updated state value here
  }, [judgeData, columnsCount]);

  return (
    <>
      {/* Mobile View */}
      <div className="h-screen w-screen font-sans overflow-hidden flex flex-col gap-4 md:hidden pt-5 bg-primary">
        {/* Page Name */}
        <div className="h-[8%] w-full flex items-star">
          <h1 className="text-lg font-semibold px-6 text-white">
            Judgment Page
          </h1>
        </div>
        {/* heading */}
        <div className=" w-4/5 flex items-center pt-12">
          <h1
            onClick={() => {
              let value;
              // Get the value from local storage if it exists
              value = localStorage.getItem("judgeData") as string;
              console.log(JSON.parse(value));

              if (value) {
                setJudgeData(JSON.parse(value));
              }

              console.log("judgeData", judgeData);
            }}
            className="text-2xl font-semibold px-6 text-white leading-none"
          >
            Balloon Breaking MLM
          </h1>
        </div>
        {/* judge Card */}
        <div className="bg-white h-5/6 w-full rounded-t-large">
          {/* titlle */}
          <div className="h-[8%] w-full flex justify-center items-center pt-3">
            <h1 className="text-xl font-bold px-6 text-primary leading-none">
              Add Points
            </h1>
            <div className="flex gap-4">
              <div className="flex flex-col items-start gap-1">
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    (columnsCount as number) == 2
                      ? null
                      : setColumnsCount(columnsCount + 1);
                    console.log(columnsCount);
                  }}
                >
                  <button
                    className={`h-4 w-4 rounded ${
                      columnsCount >= 2 ? "bg-[#D9D9D9]" : "bg-[#00ff73]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[90%] w-[90%] fill-white"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </button>
                  <p className="text-[10px]">Add Column</p>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => {
                    (columnsCount as number) == 0
                      ? null
                      : setColumnsCount(columnsCount - 1);
                  }}
                >
                  <button
                    className={`h-4 w-4 rounded ${
                      columnsCount < 1 ? "bg-[#D9D9D9]" : "bg-[#ff0000] "
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[90%] w-[90%] fill-white"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                  </button>
                  <p className="text-[10px]">Remove Column</p>
                </div>
                {/* disble button ; color : #D9D9D9  */}
              </div>
            </div>
          </div>
          <hr className="mt-3" />
          {/* list */}
          <div className="flex flex-col items-center gap-2 overflow-y-auto h-5/6 pt-5">
            {/* list 1 */}
            {props.programme?.candidateProgramme?.map(
              (candidate: CandidateProgramme, Index) => {
                useEffect(() => {
                  judgeData.candidates[Index] = {
                    chestNo: candidate.candidate?.chestNO,
                  };
                  const candidateIndex = judgeData.candidates[Index];
                  candidateIndex.codeletter = codeletter[0].label;
                  candidateIndex.point1 = 0;
                  candidateIndex.point2 = 0;
                  candidateIndex.point3 = 0;
                }, []);
                return (
                  <div
                    className="h-14 min-h-14 min-w-[75%] w-[75%] flex gap-2"
                    key={Index}
                  >
                    {/* first */}
                    <div className="bg-accent rounded-xl h-14 w-1/4 text-[9px] flex flex-col justify-center px-2 text-primary">
                      <div className="flex gap-1 items-center">
                        <select
                          name=""
                          id=""
                          className="w-5 h-5 rounded bg-accent border border-white pl-[3px] text-sm font-bold"
                          // value={judgeData.candidates[Index].codeletter}
                          value={
                            codeletter.findIndex(
                              (object: any) =>
                                object.label ===
                                judgeData.candidates[Index]?.codeletter
                            ) + 1
                          }
                          onChange={(e) => {
                            judgeData.candidates[Index].codeletter =
                              codeletter[(e.target.value as any) - 1].label;
                            console.log(judgeData.candidates[Index]);
                            localStorage.setItem(
                              "judgeData",
                              JSON.stringify(judgeData)
                            );
                            setJudgeData(
                              JSON.parse(
                                localStorage.getItem("judgeData") as string
                              )
                            );
                          }}
                        >
                          {codeletter.map((letter, index) => {
                            // only return if the index of the candidate is there
                            if (
                              index <
                              (props.programme?.candidateProgramme
                                ?.length as number)
                            ) {
                              return (
                                <option value={letter.value}>
                                  {letter.label}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <span className="font-semibold">
                          {candidate?.candidate?.chestNO}
                        </span>
                      </div>
                      <p>{candidate.candidate?.name}</p>
                    </div>
                    {/* second */}
                    <div className="bg-accent rounded-xl h-14 w-5/6 flex items-center gap-2 justify-between">
                      {/* text */}
                      <div className="h-full flex items-center gap-2 pl-2">
                        <div className="flex flex-col">
                          <p className="text-[10px]">Points</p>
                          <p className="text-[7px]">(MAX.10)</p>
                        </div>
                        <div className="flex gap-2">
                          {generateArray(columnsCount).map((number) => {
                            return (
                              <div className="h-2/3 w-8 rounded text-center text-primary text-xl font-semibold bg-white relative">
                                <select
                                  name=""
                                  id=""
                                  className="h-full w-8 text-center rounded"
                                  onChange={(e) => {
                                    console.log(judgeData);
                                    saveToLocalStorage(e, Index, number + 1);
                                    setJudgeData(
                                      JSON.parse(
                                        localStorage.getItem(
                                          "judgeData"
                                        ) as string
                                      )
                                    );
                                  }}
                                  value={
                                    judgeData.candidates[Index] &&
                                    judgeData.candidates[Index][
                                      `point${number + 1}`
                                    ]
                                  }
                                >
                                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                    (number) => {
                                      return (
                                        <option value={number}>{number}</option>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* total */}
                      <div className="h-full flex items-center gap-2 pr-2">
                        <label htmlFor="" className="text-[7px]">
                          Total
                        </label>
                        <div
                          className={`w-8 rounded text-center text-primary text-xl font-semibold bg-white total${Index}`}
                        >
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      {/* Desktop View */}
      <div className="md:flex hidden h-screen overflow-hidden w-screen">
        {/* sidebar */}
        <div className="bg-primary bigphone:hidden xl:flex md:w-72 md:min-w-[18rem] xl:w-96 xl:min-w-[24rem] h-screen text-white font-semibold text-4xl leading-tight pl-8 flex flex-col pt-48">
          <h1>Judgment</h1>
          <h1>Page</h1>
        </div>
        {/* main */}
        <div className="flex flex-col px-12 w-screen gap-5 bigphone:py-24">
          {/* title */}
          <div className="h-1/5 w-5/6 flex items-end">
            <h1 className="text-5xl font-bold text-primary leading-none">
              Balloon Breaking MLM
            </h1>
          </div>
          {/* list */}
          <div className="flex flex-col bg-white h-3/4 w-full rounded-big py-5 overflow-hidden">
            {/* title */}
            <h1 className="text-3xl font-semibold px-5">Add Point</h1>
            <hr className="border" />
            {/* + and - button */}
            <div className="h-16 flex items-center justify-end pr-5">
              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    (columnsCount as number) >= 2
                      ? null
                      : setColumnsCount(columnsCount + 1);
                  }}
                >
                  <button
                    className={`h-4 w-4 rounded ${
                      columnsCount >= 2 ? "bg-[#D9D9D9]" : "bg-[#00ff73]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[90%] w-[90%] fill-white"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </button>
                  <p className="text-[10px]">Add Column</p>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    (columnsCount as number) < 1
                      ? null
                      : setColumnsCount(columnsCount - 1);
                  }}
                >
                  <button
                    className={`h-4 w-4 rounded ${
                      columnsCount < 1 ? "bg-[#D9D9D9]" : "bg-[#ff0000] "
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[90%] w-[90%] fill-white"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                  </button>
                  <p className="text-[10px]">Remove Column</p>
                </div>
                {/* disble button ; color : #D9D9D9  */}
              </div>
            </div>
            <hr className="border" />
            {/* Judgement List */}
            <div className="h-full flex flex-col pt-5 gap-2 overflow-y-auto">
              {props.programme?.candidateProgramme?.map(
                (candidate: CandidateProgramme, Index) => {
                  useEffect(() => {
                    judgeData.candidates[Index] = {
                      chestNo: candidate?.candidate?.chestNO,
                    };
                    const candidateIndex = judgeData.candidates[Index];
                    candidateIndex.codeletter = codeletter[0].label;
                    candidateIndex.point1 = 0;
                    candidateIndex.point2 = 0;
                    candidateIndex.point3 = 0;
                    console.log(judgeData);
                  }, []);
                  return (
                    <>
                      {/* 1 */}
                      <div className="flex gap-5 px-5 h-14 w-full">
                        {/* first */}
                        <div className="flex gap-5 bg-accent h-14 w-1/3 min-w-[34%] rounded-xl px-5 items-center text-sm justify-between">
                          <div className="flex items-center gap-5">
                            <select
                              name=""
                              id=""
                              className="w-5 h-5 rounded bg-accent border border-white pl-[3px] text-sm font-bold"
                              value={
                                codeletter.findIndex(
                                  (object: any) =>
                                    object.label ===
                                    judgeData.candidates[Index]?.codeletter
                                ) + 1
                              }
                              onChange={(e) => {
                                judgeData.candidates[Index].codeletter =
                                  codeletter[(e.target.value as any) - 1].label;
                                console.log(judgeData.candidates[Index]);
                                localStorage.setItem(
                                  "judgeData",
                                  JSON.stringify(judgeData)
                                );
                                setJudgeData(
                                  JSON.parse(
                                    localStorage.getItem("judgeData") as string
                                  )
                                );
                              }}
                            >
                              {codeletter.map((letter, index) => {
                                // only return if the index of the candidate is there
                                if (
                                  index <
                                  (props.programme?.candidateProgramme
                                    ?.length as number)
                                ) {
                                  return (
                                    <option value={letter.value}>
                                      {letter.label}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            <div className="bg-primary h-1 w-1 rounded-full" />
                            <p>{candidate.candidate?.chestNO}</p>
                          </div>
                          <p className="text-justify">
                            {candidate?.candidate?.name}
                          </p>
                        </div>
                        {/* second */}
                        <div className="flex gap-5 bg-accent h-14 w-2/3 min-w-[66] rounded-xl px-5 items-center text-sm justify-between">
                          <div className="flex flex-col items-center">
                            <p className="font-semibold text-sm">Points</p>
                            <p className="text-lt">MAX(10pts)</p>
                          </div>
                          <div className="flex gap-2">
                            {generateArray(columnsCount).map((number) => {
                              return (
                                <div className="bg-white h-10 w-10 rounded-lg justify-center flex items-center text-lg font-semibold text-primary">
                                  <select
                                    name=""
                                    id=""
                                    className="h-full w-8 text-center rounded"
                                    onChange={(e) => {
                                      console.log(judgeData);
                                      saveToLocalStorage(e, Index, number + 1);
                                      setJudgeData(
                                        JSON.parse(
                                          localStorage.getItem(
                                            "judgeData"
                                          ) as string
                                        )
                                      );
                                    }}
                                    value={
                                      judgeData.candidates[Index] &&
                                      judgeData.candidates[Index][
                                        `point${number + 1}`
                                      ]
                                    }
                                  >
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                      (number) => {
                                        return (
                                          <option value={number}>
                                            {number}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex gap-5 items-center">
                            <p>Total</p>
                            <div
                              className={`bg-white h-10 w-10 rounded-lg justify-center flex items-center text-lg font-semibold text-primary total${Index}`}
                            >
                              0
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              )}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Judgement;
