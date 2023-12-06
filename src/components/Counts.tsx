"use client";
import React, { Suspense, useEffect, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

//styling
import "./Count.css";

const Counts = (props: any) => {
  // label of counter
  // number to increment to
  // duration of count in seconds
  const { label, number, duration } = props.data;
  const [counterOn, setCounterOn] = useState(false);

  // number displayed by component
  const [count, setCount] = useState("0");

  return (
    <Suspense>
      {/* @ts-expect-error Server Component */}
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="w-full p-2 ">
          <div className="flex flex-col px-6 py-4 overflow-hidden bg-white  rounded-xl shadow-lg duration-300  hover:scale-105">
            <div className="flex flex-row justify-between items-center">
              <div className="px-2 py-2 bg-gray-300  rounded-xl bg-opacity-30">
                {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg> */}
                {props.data.svg}
              </div>
              <div className="flex flex-col justify-end items-end">
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 ">
                  {counterOn && <CountUp delay={0} end={props.data.number} />}+
                </h1>
                <p>{props.data.label}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollTrigger>
    </Suspense>
  );
};

export default Counts;
