"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import NProgress from "nprogress";
// import "./styles/nprogress.css";

const ErrorPage = () => {
  const router = useRouter();

  const { data, setData } = useGlobalContext();
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  return (
    <>
      {/* content */}
      <main className="flex justify-center items-center h-screen">
        <div className="flex flex-col">
          {/* icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-52"
            viewBox="0 0 32 40"
            x="0px"
            y="0px"
          >
            <title>Page Note Found</title>
            <g data-name="Data Not Found, Drive Full, Full, Storage, Drive">
              <path d="M27.14,17H9.25a.5.5,0,0,0-.48.37l-2,7.15L6.05,12.21a.25.25,0,0,1,.07-.2.27.27,0,0,1,.2-.08H10a.63.63,0,0,1,.5.25l1.22,1.57a.49.49,0,0,0,.39.19H23v1.5a.5.5,0,1,0,1,0v-2a.5.5,0,0,0-.5-.51H12.3l-1.06-1.37A1.67,1.67,0,0,0,10,10.92H6.32a1.31,1.31,0,0,0-.93.41,1.26,1.26,0,0,0-.34.94L6,27.5a.79.79,0,0,0,.1.3.49.49,0,0,0,.4.2H23.41a1.91,1.91,0,0,0,1.85-1.44L26,23.67a.5.5,0,1,0-1-.26l-.76,2.9a.94.94,0,0,1-.89.69H7.16l2.47-9H26.49l-.68,2.58a.5.5,0,0,0,1,.25l.84-3.21a.5.5,0,0,0-.48-.63Z" />
              <path d="M16.15,24.13a.5.5,0,0,0,0,.71.48.48,0,0,0,.7,0,.92.92,0,0,1,1.3,0,.48.48,0,0,0,.7,0,.5.5,0,0,0,0-.71A1.9,1.9,0,0,0,16.15,24.13Z" />
              <path d="M13.5,21a.5.5,0,0,0,0,1h1a.5.5,0,0,0,0-1Z" />
              <path d="M20.5,21a.5.5,0,0,0,0,1h1a.5.5,0,0,0,0-1Z" />
              <path d="M16,11.3a.54.54,0,0,0,.18.52.51.51,0,0,0,.31.11.54.54,0,0,0,.22,0l2.68-1.35a8.57,8.57,0,0,0,2.6.39c3.36,0,6-1.76,6-4,0-1.85-1.77-3.4-4.41-3.88a.5.5,0,0,0-.18,1C25.52,4.4,27,5.59,27,6.91c0,1.63-2.29,3-5,3a7.72,7.72,0,0,1-2.48-.4.46.46,0,0,0-.38,0l-1.89,1,.43-1.75a.49.49,0,0,0-.11-.45A2.09,2.09,0,0,1,17,6.91C17,5.57,18.56,4.35,20.7,4a.51.51,0,0,0,.42-.58A.51.51,0,0,0,20.54,3c-2.67.44-4.54,2-4.54,3.9a3,3,0,0,0,.65,1.83Z" />
              <path d="M20.9,6.51l.39.4-.39.39a.51.51,0,0,0,0,.72.51.51,0,0,0,.7,0l.4-.4.4.4a.51.51,0,0,0,.7,0,.51.51,0,0,0,0-.72l-.39-.39.39-.4a.5.5,0,0,0,0-.71.48.48,0,0,0-.7,0l-.4.4-.4-.4a.48.48,0,0,0-.7,0A.5.5,0,0,0,20.9,6.51Z" />
            </g>
          </svg>
          {/* text */}
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Far Out.
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 cursor-pointer">
              <p
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push(`${data.admin ? "/admin" : "/"}`);
                }}
                className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secodarybg-secondary"
              >
                Go back home
              </p>
              <p className="text-sm font-semibold text-gray-900 border px-3.5 py-2.5 rounded-md">
                Contact Us <span aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
