"use client";
import { logoutUser } from "@/app/(user)/login/api";
import { useGlobalContext } from "@/context/context";
import {
  AddProgrammeDocument,
  LogOutUserDocument,
  LogOutUserMutation,
  LogOutUserMutationVariables,
  Roles,
} from "@/gql/graphql";
import { ArrowRightSquare, IconArrowLeftSquare } from "@/icons/arrows";
import { Menu2Icon, MenuIcon } from "@/icons/home";
import {
  CandidatesIcon,
  CategoryIcon,
  CredentialIcon,
  Dashboard as Dashoard,
  LogOutIcon,
  SectionIcon,
  RulesIcon,
  ProgramsIcon,
  JudgesIcon,
  ResultIcon,
  CandidateListIcon,
  ProgramListIcon,
  TeamListIcon,
  SettingsIcon,
  SkillIcon,
  GradeIcon,
  PositionIcon,
  TeamIcon,
} from "@/icons/sidebar";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { OperationResult, useMutation } from "urql";
import NProgress from "nprogress";

const AdminNavs = [
  {
    name: "Settings",
    nav: "admin/settings",
    icon: <SettingsIcon className="w-8 h-8" />,
  },
  {
    name: "Category",
    nav: "admin/category",
    icon: <CategoryIcon className="w-8 h-8" />,
  },
  {
    name: "Section",
    nav: "admin/section",
    icon: <SectionIcon className="w-8 h-8" />,
  },
  {
    name: "Credentials",
    nav: "admin/credentials",
    icon: <CredentialIcon className="w-8 h-8" />,
  },
  {
    name: "Skill",
    nav: "admin/skill",
    icon: <SkillIcon className="w-8 h-8" />,
  },
  {
    name: "Grade",
    nav: "admin/grades",
    icon: <GradeIcon className="w-8 h-8" />,
  },
  {
    name: "Position",
    nav: "admin/position",
    icon: <PositionIcon className="w-8 h-8" />,
  },
  {
    name: "Team",
    nav: "admin/team",
    icon: <TeamIcon className="w-8 h-8" />,
  },
];

const ControllerNavs = [
  {
    name: "Rules",
    nav: "controller/rules",
    icon: <RulesIcon className="w-8 h-8" />,
  },
  {
    name: "Candidates",
    nav: "controller/candidates",
    icon: <CandidatesIcon className="w-8 h-8" />,
  },
  {
    name: "Programs",
    nav: "controller/programmes",
    icon: <ProgramsIcon className="w-8 h-8" />,
  },
  {
    name: "Judges",
    nav: "controller/judges",
    icon: <JudgesIcon className="w-8 h-8" />,
  },
  {
    name: "Results",
    nav: "controller/results",
    icon: <ResultIcon className="w-8 h-8" />,
  },
  {
    name: "C Grid",
    nav: "controller/agrid",
    icon: <CandidateListIcon className="w-8 h-8" />,
  },
  {
    name: "P Grid",
    nav: "controller/agridProgramme",
    icon: <ProgramListIcon className="w-8 h-8" />,
  },
  {
    name: "List",
    nav: "controller/team-list",
    icon: <TeamListIcon className="w-8 h-8" />,
  },
];

const MediaNavs = [
  {
    name: "Gallery",
    nav: "media/gallery",
    icon: <Dashoard className="w-8 h-8" />,
  },
  {
    name: "Certificate",
    nav: "/",
    icon: <Dashoard className="w-8 h-8" />,
  },
  {
    name: "Tags",
    nav: "media/tag",
    icon: <Dashoard className="w-8 h-8" />,
  },
];

const TeamManagerNavs = [
  {
    name: "Candidates",
    nav: "team-manager/team-candidates",
    icon: <CandidatesIcon className="w-8 h-8" />,
  },
  {
    name: "Programs",
    nav: "team-manager/team-programs",
    icon: <ProgramsIcon className="w-8 h-8" />,
  },
  {
    name: "List",
    nav: "team-manager/team-list",
    icon: <Dashoard className="w-8 h-8" />,
  },
  {
    name: "Results",
    nav: "team-manager/team-results",
    icon: <ResultIcon className="w-8 h-8" />,
  },
];

const Navs = (ROLE: Roles) => {
  switch (ROLE) {
    case Roles.Admin:
      return AdminNavs;
    case Roles.Controller:
      return ControllerNavs;
    case Roles.Media:
      return MediaNavs;
    case Roles.TeamManager:
      return TeamManagerNavs;
    default:
      return [];
  }
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData } = useGlobalContext();
  const navs = Navs(data.admin?.roles as Roles);
  const [isSideBarOnMobile, setIsSideBarOnMobile] = useState(false);

  const router = useRouter();

  const [state, LogoutExecute] = useMutation(LogOutUserDocument);

  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  const LogOut = async () => {
    const logout: OperationResult<
      LogOutUserMutation,
      LogOutUserMutationVariables
    > = await LogoutExecute({});
    setRouterButtonClicked(true);
    router.push("/login");
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "w-56" : "w-20"
        } overflow-hidden transition-all duration-500 text-base-100  bg-primary hidden  lg:flex flex-col p-4`}
      >
        <div className="p-0 w-1">
          <div
            className={` px-0 flex ${
              isOpen ? "w-40" : "w-12 items-center justify-center"
            }`}
          >
            <label className="swap w-12 my-2">
              {isOpen ? (
                <IconArrowLeftSquare
                  className="w-8 h-8  fill-current"
                  SetOpen={setIsOpen}
                  open={isOpen}
                />
              ) : (
                <ArrowRightSquare
                  className="w-8 h-8 swap-off fill-current"
                  SetOpen={setIsOpen}
                  open={isOpen}
                />
              )}
            </label>
            <span
              className={` text-base text-center font-bold my-auto ${
                isOpen ? "flex" : "hidden "
              }`}
            >
              Tekton 2k23
            </span>
          </div>
        </div>
        <ul
          className={`menu h-full w-full ${
            isOpen ? "" : "px-0"
          } transition-all flex flex-col justify-between`}
        >
          <div>
            <li
              className="p-0 w-1"
              onClick={() => {
                setRouterButtonClicked(true);
                router.push("/admin");
              }}
            >
              <p
                className={` px-0 flex ${
                  isOpen ? "w-40" : "w-12 items-center justify-center"
                }`}
              >
                <Dashoard className="w-8 h-8" />
                <span
                  className={` text-base text-center font-bold ${
                    isOpen ? "flex" : "hidden "
                  }`}
                >
                  Dashboard
                </span>
              </p>
            </li>

            {navs.map((nav, index) => (
              <li
                key={index}
                className="p-0"
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push(`/admin/${nav.nav}`);
                }}
              >
                <p
                  className={` px-0 flex ${
                    isOpen ? "w-40" : "w-12 items-center justify-center "
                  }`}
                >
                  {nav.icon}
                  <span
                    className={` text-base text-center font-bold ${
                      isOpen ? "flex" : "hidden "
                    }`}
                  >
                    {nav.name}
                  </span>
                </p>
              </li>
            ))}
          </div>

          <li className="p-0 w-1" onClick={LogOut}>
            <p
              className={` px-0 flex ${
                isOpen ? "w-40" : "w-12 items-center justify-center"
              }`}
            >
              <LogOutIcon className="w-8 h-8 text-white" />
              <span
                className={` text-base text-center font-bold  ${
                  isOpen ? "flex" : "hidden "
                }`}
              >
                Logout
              </span>
            </p>
          </li>
        </ul>
      </div>

      <div
        onClick={() => {
          setIsSideBarOnMobile(true);
        }}
      >
        <Menu2Icon className="w-6 h-6 fill-secondary absolute top-6 right-10 lg:hidden" />
      </div>
      {isSideBarOnMobile && (
        <div className="fixed h-full w-3/4 bg-primary right-0 p-2 md:hidden flex flex-col gap-2 z-50 top-0">
          <button
            className="h-10 w-10  rounded-full text-3xl flex items-center justify-center"
            onClick={() => {
              setIsSideBarOnMobile(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              viewBox="0 -960 960 960"
              width={24}
              fill="white"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <div className="flex flex-col gap-2 h-full">
            {/* nav1 */}
            <button
              onClick={() => {
                setRouterButtonClicked(true);
                router.push(`/admin/`);
                setIsSideBarOnMobile(false);
              }}
              className="h-12 min-h-[3rem] w-full rounded-xl border px-2 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={36}
                viewBox="0 -960 960 960"
                width={36}
                fill="white"
              >
                <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
              </svg>
              <h1 className="text-white font-semibold text-xl">Dashboard</h1>
            </button>

            {navs.map((nav, index) => (
              <button
                onClick={() => {
                  setRouterButtonClicked(true);
                  router.push(`/admin/${nav.nav}`);
                  setIsSideBarOnMobile(false);
                }}
                className="h-12 min-h-[3rem] w-full rounded-xl border px-2 flex items-center gap-2 text-white"
              >
                {nav.icon}
                <h1 className="text-white font-semibold text-xl">{nav.name}</h1>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;