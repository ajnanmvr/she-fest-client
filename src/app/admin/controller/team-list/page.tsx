import TeamList from "@/components/admin/team-list/TeamList";
import {
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllProgrammesByCandidatesDocument,
  GetAllProgrammesByCandidatesQuery,
  GetAllProgrammesByCandidatesQueryVariables,
  GetAllSkillsDocument,
  GetAllSkillsQuery,
  GetAllSkillsQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const propgrammes =   await client.query<
  GetAllProgrammesByCandidatesQuery,
  GetAllProgrammesByCandidatesQueryVariables
>(GetAllProgrammesByCandidatesDocument, {api_key : API_KEY});

  const candidates = await client.query<
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables
>(GetAllCandidatesDocument, {api_key : API_KEY});

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {api_key : API_KEY});

  const skills = await client.query<
    GetAllSkillsQuery,
    GetAllSkillsQueryVariables
  >(GetAllSkillsDocument, {api_key : API_KEY});

  const data = [
    {
      title: "Total Programs",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: propgrammes.data?.programmes.length,
    },
    {
      title: "Result Pubished",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: propgrammes.data?.programmes.filter((programme) => programme.resultPublished).length
    },
    {
      title: "Result Entered",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: propgrammes.data?.programmes.filter((programme) => programme.resultEntered).length
    },
    {
      title: "Avg Category Program",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: parseInt(propgrammes.data?.programmes.length as number / (categories.data?.categories.length as number)+""),
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
