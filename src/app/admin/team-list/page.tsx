import TeamList from "@/components/admin/team-list/TeamList";
import {
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllProgrammesDocument,
  GetAllProgrammesQuery,
  GetAllProgrammesQueryVariables,
  GetAllSkillsDocument,
  GetAllSkillsQuery,
  GetAllSkillsQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const propgrammes = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {});

  const candidates = await client.query<
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables
>(GetAllCandidatesDocument, {});

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
      <TeamList
        key={1}
        data={data}
        result={propgrammes.data?.programmes}
        pageProps={1}
        categories={categories.data?.categories}
        skills={skills.data?.skills}
        candidates={candidates.data?.candidates}
      />
    </main>
  );
};

export default page;
