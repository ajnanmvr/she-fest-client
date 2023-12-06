"use client"
import Header from "@/components/Header";
import { ListsIcon, LiveIcon, LocationIcon, TableIcon, UserIcon, UsersIcon } from "@/icons/home";
import Counts from "./Counts";
import { CandidatesIcon } from "@/icons/sidebar";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import nProgress from "nprogress";

function First() {
  const router = useRouter();
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  nProgress.configure({ showSpinner: false });

  useEffect(() => {
    console.log(routerButtonClicked);

    routerButtonClicked ? nProgress.start() : null;
  }, [routerButtonClicked]);
  const data = [
    {
      id: "001",
      label: "Programs",
      number: "385",
      duration: "2",
      svg: <ListsIcon className="w-6 h-6" />
    },
    {
      id: "002",
      label: "Candidates",
      number: "255",
      duration: "2",
      svg: <UsersIcon className="w-6 h-6" />
    },
    {
      id: "003",
      label: "Venues",
      number: "7",
      duration: "2",
      svg: <LocationIcon className="w-6 h-6" />
    }
  ]
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.0/countUp.min.js" integrity="sha512-E0zfDwA1CopT4gzJmj9tMpd7O6pTpuybTK58eY1GwqptdasUohyImuualLt/S5XvM8CDnbaTNP/7MU3bQ5NmQg=="  />
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "75vh" }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("/zahra.jpg")'
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          />
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto md:text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  Reviving the legacy of millennium.
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: 70 }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x={0}
            y={0}
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </div>
      <section className="pb-20 bg-gray-300 -mt-28 transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center ">
              <div  onClick={() => {
                setRouterButtonClicked(true);
                router.push("/live");
              }} className="relative overflow-hidden flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg cursor-pointer hover:-translate-y-3  transition-all duration-500">
                <div
                  className="border border-theme  cursor-pointer h-full w-full p-10 justify-center flex flex-col items-center"
                  data-aos="fade-up"
                >
                  <LiveIcon className="w-28 stroke-red-400" />
                  <p className="text-2xl text-gray-600">
                    Live
                    Results
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center cursor-pointer ">
              <div  onClick={() => {
                setRouterButtonClicked(true);
                router.push("/result");
              }} className="relative overflow-hidden flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:-translate-y-3  transition-all duration-500">

                <div
                  className="border border-theme  cursor-pointer h-full w-full p-10 justify-center flex flex-col items-center"
                  data-aos="fade-up"
                >
                  <TableIcon className="h-28 stroke-blue-400" />

                  <p className="text-2xl text-gray-600">
                    Leader
                    Board
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center ">
              <div  onClick={() => {
                setRouterButtonClicked(true);
                router.push("/candidate");
              }} className="relative overflow-hidden flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg cursor-pointer hover:-translate-y-3  transition-all duration-500">

                <div
                  className="border border-theme  cursor-pointer h-full w-full p-10 justify-center flex flex-col items-center"
                  data-aos="fade-up"
                >
                  <UserIcon className="w-24 stroke-green-400" />

                  <p className="text-2xl text-gray-600">Candidate Points</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100 cursor-pointer">
                {/* <i className="fas fa-user-friends text-xl" />  */}
                <img src="/img/colored-logo.png" alt="" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Reviving the legacy of millennium
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                Tekton is the name of this year's Rabee'a festival organized by Fathima Zahra Islamic Women's College Students Association GAZVA.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">

                The word TEKTON means builder. Accordingly, it's interpreted as the builder of a new era.
                The motto of the arts fest is "reviving the legacy of the millennium" which aims to regain the jewels of Muslims' lost prosperity which was vibrant before a millennium. Arts Fest will be a milestone in enhancing and nourishing the skills of students  in academic and related fields
              </p>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto cursor-pointer">
              {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block"
                      style={{ height: 95, top: "-94px" }}
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-pink-600 fill-current"
                      />
                    </svg>
                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-md font-light mt-2 text-white">
                      The Arctic Ocean freezes every winter and much of the sea-ice
                      then thaws every summer, and that process will continue
                      whatever happens.
                    </p>
                  </blockquote>
                </div> */}
              {/* <>
  <div className="w-6/12 max-w-full px-3 text-center flex-0 lg:w-3/12">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500">
        Earnings
      </h6>
      <h4 className="font-bold dark:text-white">
        <span className="text-3.5">$ </span>
        <span id="state1" countto={23980} />
      </h4>
    </div>
  </div>
  <div className="w-6/12 max-w-full px-3 text-center flex-0 lg:w-3/12">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500">
        Customers
      </h6>
      <h4 className="font-bold dark:text-white">
        <span className="text-3.5">$ </span>
        <span id="state2" countto={2400} />
      </h4>
    </div>
  </div>
  <div className="w-6/12 max-w-full px-3 mt-6 text-center flex-0 lg:w-3/12 lg:mt-0">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500">
        Avg. Value
      </h6>
      <h4 className="font-bold dark:text-white">
        <span className="text-3.5">$ </span>
        <span id="state3" countto={48} />
      </h4>
    </div>
  </div>
  <div className="w-6/12 max-w-full px-3 mt-6 text-center flex-0 lg:w-3/12 lg:mt-0">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500">
        Refund Rate
      </h6>
      <h4 className="font-bold dark:text-white">
        <span id="state4" countto={4} />
        <span className="text-3.5">% </span>
      </h4>
    </div>
  </div>
</> */}

              <div className="App">
                {data.map((ct: any) => <Counts key={ct.id} data={ct} />)}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default First;


