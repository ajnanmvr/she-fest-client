"use client";
import React, { useEffect, useState } from "react";
import { MenuIcon } from "@/icons/home";
import Image from "next/image";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
// // import "./styles/nprogress.css";

function GalleryHeader() {
  const [showPopup, setShowPopup] = useState(false);
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const [loadingBar, setLoadingBar] = useState<any>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingBar < 100) {
        setLoadingBar(loadingBar + 10); // Increase width by 10% every second
      } else {
        clearInterval(interval); // Stop the interval when the width reaches 100%
      }
    }, 1500);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [loadingBar]);

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  const router = useRouter();

  return (
    <header className="flex justify-between items-center bg-secondary p-5 lg:p-0 lg:pl-5 lg:py-5 rounded-md ">
      {/* <div
        className={`w-[${loadingBar}%] h-[.5%] bg-green-900 fixed top-0 left-0 transition-all duration-500 ease-in-out z-10`}
      ></div> */}
      <img
        src="/img/realia-txt.png"
        alt="Realia Logo"
        className="h-5 md:h-16 object-contain"
      />
      <div className="flex items-center text-lg font-light ">
        <div className="lg:hidden cursor-pointer" onClick={togglePopup}>
          <MenuIcon />
        </div>
        <nav className="hidden lg:block cursor-pointer">
          <ul className="flex flex-col lg:flex-row transition-all duration-700">
            <li
              className=" transition-all duration-400 text-white px-4 py-1 rounded-3xl hover:font-bold"
              onClick={() => {
                setRouterButtonClicked(true);
                router.push("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                setRouterButtonClicked(true);
                router.push("/result");
              }}
              className="transition-all duration-400 text-white px-4 py-1 rounded-3xl hover:font-bold"
            >
              Result
            </li>
            <li
              onClick={() => router.push("/gallery")}
              className="text-white font-semibold border-white border px-4 py-1 rounded-3xl hover:text-secondary hover:bg-white"
            >
              Gallery
            </li>
            <li
              onClick={() => {
                setRouterButtonClicked(true);
                router.push("/candidate");
              }}
              className="transition-all duration-400 text-white px-4 py-1 rounded-3xl hover:font-bold"
            >
              Profile
            </li>
          </ul>
        </nav>
        <div>
          <img
            src="/img/logo.png"
            alt="Realia Logo"
            width={120}
            height={0}
            className="hidden xl:block"
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-all duration-500  ${
          !showPopup ? "-translate-y-[100vh]" : "translate-y-0"
        } `}
      >
        <div className="bg-white p-8 rounded shadow-md relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={togglePopup}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-secondary absolute right-2 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-center">
            <h1 className="text-4xl font-black text-secondary">
              <span className="font-nexa">Tekton</span>&apos;
              <span className="font-nexa">23</span>
            </h1>

            <h2 className="text-lg leading-4 font-nexa">ZAHRA Arts Fest</h2>
          </div>
          <nav>
            <ul className="mt-8 transition-all duration-400">
              <li
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push("/");
                }}
                className=" text-secondary font-semibold border-theme border px-4 py-1 rounded-3xl hover:text-white hover:bg-secondary "
              >
                Home
              </li>
              <li
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push("/result");
                }}
                className="text-secondary px-4 py-1 rounded-3xl hover:text-white hover:bg-secondary"
              >
                Result
              </li>
              <li
                onClick={() => router.push("/gallery")}
                className="text-secondary px-4 py-1 rounded-3xl hover:text-white hover:bg-secondary"
              >
                Gallery
              </li>
              <li
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push("/candidate");
                }}
                className="text-secondary px-4 py-1 rounded-3xl hover:text-white hover:bg-secondary"
              >
                Profile
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default GalleryHeader;