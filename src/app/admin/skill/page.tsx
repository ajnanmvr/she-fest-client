import Skill from "@/components/admin/skill/Skill";
import {  GetAllSkillsDocument, GetAllSkillsQuery, GetAllSkillsQueryVariables } from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllSkillsQuery,
    GetAllSkillsQueryVariables
  >(GetAllSkillsDocument, {});

  const data = [
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600"/>
    },
    {
      title: "Total Users",
      icon : <SectionIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon : <SectionIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon : <SectionIcon className="w-6 h-6 text-teal-600" />
    },
  ];
 const h = data[0]
  return (
    <main className="w-full h-full flex ">
      <Skill key={1} data={data} result={result.data?.skills} pageProps={1}/>
    </main>
  );
};

export default page;
