import GalleryHeader from "@/components/GalleryHeader";
import Header from "@/components/Header";
import NOT_AV from "@/components/NOT_AV";
import ResultHeader from "@/components/ResultHeader";
import FirstRowFirstCard from "@/components/result/desktop/FrFc";
import FirstRowSecondCard from "@/components/result/desktop/FrSc";
import DesktopSidebar from "@/components/result/desktop/Sidebar";
import SecondRowFirstCard from "@/components/result/desktop/SrFc";
import SecondRowSecondCard from "@/components/result/desktop/SrSc";
import OverallResults from "@/components/result/mobile/OverallResults";
import Programs from "@/components/result/mobile/Programs";
import QuickOverview from "@/components/result/mobile/QuickOverview";
import Results from "@/components/result/mobile/Results";
import Toppers from "@/components/result/mobile/Toppers";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetPublishedProgrammesDocument,
  GetPublishedProgrammesQuery,
  GetPublishedProgrammesQueryVariables,
  GetAllSkillsDocument,
  GetAllSkillsQuery,
  GetAllSkillsQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQueryVariables,
  GetAllTeamsQuery,
  Team,
  Programme,
  Category,
  CategorBasedToppersQuery,
  CategorBasedToppersQueryVariables,
  CategorBasedToppersDocument,
  TotalProgramsCountQuery,
  TotalProgramsCountQueryVariables,
  TotalProgramsCountDocument,
} from "@/gql/graphql";
import { Menu2Icon } from "@/icons/home";
import { SectionIcon } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function page({
  params,
}: {
  params: { chestNo: string };
}) {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetPublishedProgrammesQuery,
    GetPublishedProgrammesQueryVariables
  >(GetPublishedProgrammesDocument, { api_key: API_KEY });

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, { api_key: API_KEY });

  const skills = await client.query<
    GetAllSkillsQuery,
    GetAllSkillsQueryVariables
  >(GetAllSkillsDocument, { api_key: API_KEY });

  const teams = await client.query<
    GetAllTeamsQuery,
    GetAllTeamsQueryVariables
  >(GetAllTeamsDocument, { api_key: API_KEY });

  const toppers = await client.query<
  CategorBasedToppersQuery,
  CategorBasedToppersQueryVariables
>(CategorBasedToppersDocument, {  });

  const totalPrograms = await client.query<
  TotalProgramsCountQuery,
  TotalProgramsCountQueryVariables
>(TotalProgramsCountDocument, {api_key: API_KEY  });

  return (
    <main className="h-screen w-screen bg-white overflow-hidden">


      {/* Mobile view */}


    {/* <NOT_AV/> */}



    <div className="h-screen w-screen font-sans flex flex-col gap-4 lg:hidden pt-5 bg-primary overflow-hidden">
        
        {/* Page Name */}
        <div className="h-[1%] w-full flex items-star">
          <h1 className="text-sm font-semibold px-6 text-white">Result Page</h1>
        </div>
        {/* heading */}
        <div className="h-2/12 w-4/5 flex items-center pt-12 justify-center">
          <h1 className="text-3xl font-semibold px-6 text-white leading-none">
            #Current Status
          </h1>
        </div>
        {/* judge Card */}
        <div className="bg-white h-[90%] bigphone:h-[89.5%] w-full rounded-t-large overflow-hidden">
          {/* main */}
          <div className="grid gap-5 overflow-y-auto h-[99%] pt-[3.25rem] overflow-x-hidden">
            {/* Overall Results and toppers */}
            <OverallResults teams={teams.data?.teams.sort((a , b)=>{
              return b.totalPoint as number - (a.totalPoint as number)
            }) as Team[]
            }
            categories={categories.data?.categories as Category[]}
            programs = {result.data?.resultPublishedProgrammes as Programme[]}
            />


            {/* Programs and Results */}
            <Programs teams={teams.data?.teams as Team[]} programs={result.data?.resultPublishedProgrammes as Programme[]} categories={categories.data?.categories as Category[]}/>
            {/* Quick Overview */}
            <Toppers categories={categories.data?.categories as Category[]} toppers={toppers.data?.getCategoryBasedToppers as Category[]} />
            <QuickOverview count={(totalPrograms.data?.programmes?.length as number) || 0} programs={result.data?.resultPublishedProgrammes as Programme[]}/>
          </div>
        </div>
      </div>










      {/* Desktop view */}
      <div
        className="h-screen w-screen bg-cover hidden lg:flex "
        style={{ backgroundImage: 'url("/img/hi.jpg")' }}
      >
        {/* sidebar */}
        <DesktopSidebar  
        teams={teams.data?.teams.sort((a , b)=>{
              return b.totalPoint as number - (a.totalPoint as number)
            }) as Team[]
            }

            categories={categories.data?.categories as Category[]}
            programs = {result.data?.resultPublishedProgrammes as Programme[]}
            />

        {/* main content */}
        <div className="overflow-y-auto w-full mb-2" >
          
<div className={`p-10 md:p-16  `}>
          <ResultHeader />
        </div>
          <div className="h-full w-full bg-cover pl-10 flex flex-col gap-2 2xl:gap-8 pr-10">
            {/* title */}
            {/* <div className="h-24 w-full flex items-end">
              <h1 className="text-5xl font-bold">#Current Status</h1>
            </div> */}
            {/* fist row */}
            <div className=" w-full flex gap-10 ">
              {/* first card first row */}
              <FirstRowFirstCard teams={teams.data?.teams as Team[]} programs={result.data?.resultPublishedProgrammes as Programme[]} categories={categories.data?.categories as Category[]} />
              {/* second card first row */}
            </div>
            {/* second row */}

            <div className="h-[50%] 2xl:h-[25%] w-full flex gap-10 ">
              {/* first card second row */}
              <SecondRowFirstCard categories={categories.data?.categories as Category[]} toppers={toppers.data?.getCategoryBasedToppers as Category[]} />
              {/* second card second row */}
              <SecondRowSecondCard count={(totalPrograms.data?.programmes?.length as number) || 0} programs={result.data?.resultPublishedProgrammes as Programme[]} />
            </div>
            
          </div>
        </div>
      </div>

    </main>

  );
}