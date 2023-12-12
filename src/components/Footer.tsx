import React from "react";

function Footer() {
  return (
    <footer>
      <div className="w-full bg-h-line bg-cover h-12"></div>
      <div className="flex flex-col text-center items-center lg:text-left lg:items-start lg:flex-row justify-between px-16 py-5">
        <div className="flex items-center my-auto">
          <img src="/img/logo.svg" alt="logo" className="h-36" />
        </div>
        <div className="w-full px-4">
             
          <div className="flex flex-wrap sm:flex-nowrap items-top my-10 justify-center lg:justify-end xl:mr-32 gap-10">
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Features
              </span>
              <ul className="list-unstyled opacity-80">
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/sheets"
                  >
                    Sheets
                  </a>
                </li>
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/projects"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/organizations"
                  >
                    Organizations
                  </a>
                </li>
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/docs"
                  >
                    Docs
                  </a>
                </li>
                {/* <li>
                <a
                  className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                  href="/tea-stall"
                >
                  Tea Stall
                </a>
              </li> */}
              </ul>
            </div>
            <div className="px-4">
              <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                Resources
              </span>
              <ul className="list-unstyled opacity-80 ">
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/register"
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a
                    className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-h-line bg-cover h-12"></div>
    </footer>
  );
}

export default Footer;
