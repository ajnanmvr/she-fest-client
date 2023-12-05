import Programme from "@/components/admin/programmes/Programme";
import TeamProgramme from "@/components/admin/team-programmes/TeamProgramme";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllSkillsDocument,
  GetAllSkillsQuery,
  GetAllSkillsQueryVariables,
  GetAllTeamProgrammesDocument,
  GetAllTeamProgrammesQuery,
  GetAllTeamProgrammesQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllTeamProgrammesQuery,
    GetAllTeamProgrammesQueryVariables
  >(GetAllTeamProgrammesDocument, {});

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {});

  const skills = await client.query<
    GetAllSkillsQuery,
    GetAllSkillsQueryVariables
  >(GetAllSkillsDocument, {});

  const data = [
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
    },
  ];
  const h = data[0];
  return (
    <main className="w-full h-full flex ">
      <TeamProgramme
        key={1}
        data={data}
        result={result.data?.programmes}
        pageProps={1}
        categories={categories.data?.categories}
        skills={skills.data?.skills}
      />
    </main>
  );
};

export default page;
