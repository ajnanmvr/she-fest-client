"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Login from "./user/Login";
import { UserIcon } from "@/icons/home";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
// import "./styles/nprogress.css";

function Footer() {
  const router = useRouter();
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);

  return (
    // <footer className="bg-secondary text-white text-sm p-16">
    //   <div className="flex flex-wrap gap-7">
    //     <div className="w-3/4 ">
    //       <img
    //         src="/img/realia-txt.png" // Path to the image in the public folder
    //         alt="Realia Logo"
    //         className="h-10 md:h-12"
    //       />
    //     </div>
    //     <div className="font-light ">
    //       <p className="font-semibold">Address</p>
    //       <p>
    //         Darul Huda Islamic University <br />
    //         Hidaya Nagar, Chammad, Tirurangadi PO <br />
    //         Malappuram Dist. Pin: 676306, Kerala, India
    //         <br />
    //         <br />
    //         Email: asas@dhiu.in | Phone :+91494-2463155 <br />
    //         Fax: 0494 2460575
    //       </p>
    //       <div className=" py-2  my-1  flex gap-2   ">
    //         <button
    //           onClick={() => {
    //             setRouterButtonClicked(true);
    //             router.push("/login");
    //           }}
    //           className=" bg-white rounded-md px-5 py-2 text-black font-semibold "
    //         >
    //           {" "}
    //           Login{" "}
    //         </button>
    //         <button
    //           onClick={() => {
    //             setRouterButtonClicked(true);
    //             router.push("/program");
    //           }}
    //           className=" bg-white rounded-md px-5 py-2 text-black font-semibold "
    //         >
    //           Program
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   <p className="mt-5">&copy; 2023 Realia, All Rights Reserved</p>
    // </footer>
    <footer className="relative bg-gray-300 pt-8 pb-6 ">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: 80 }}
      ></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap    w-full h-full justify-between">
          <img
            src="/img/realia-txt.png" // Path to the image in the public folder
            alt="Realia Logo"
            className="h-10 md:h-12"
          />
          {/* <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/presentation"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://blog.creative-tim.com"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free"
                      >
                        Free Products
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          <div className="font-light ">
            <p className="font-semibold">Address</p>
            <p>
            Fathima Zahra Women's College <br />
              Hidaya Nagar, Chammad, Tirurangadi PO <br />
              Malappuram Dist. Pin: 676306, Kerala, India
              <br />
              <br />
              {/* Email: info@tekton23.me  */}
            </p>
            <div className=" py-2  my-1  flex gap-2   ">
              <button
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push("/login");
                }}
                className=" bg-white rounded-md px-5 py-2 text-black font-semibold "
              >
                {" "}
                Login{" "}
              </button>
              <button
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push("/program");
                }}
                className=" bg-white rounded-md px-5 py-2 text-black font-semibold "
              >
                Program
              </button>
            </div>
          </div>
     
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <hr className="my-6 border-gray-400 w-full" />
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © 
                <a
                  href="https://www.instagram.com/farragodesigns"
                  className="text-gray-600 hover:text-gray-900"
                >
                 farragoDesigns
                </a>
                .
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
