import Programme from "@/components/admin/programmes/Programme";
import {
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
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, { api_key: API_KEY });

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, { api_key: API_KEY });

  const skills = await client.query<
    GetAllSkillsQuery,
    GetAllSkillsQueryVariables
  >(GetAllSkillsDocument, { api_key: API_KEY });

  const data = [
    {
      title: "Total Programs",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: result.data?.programmes.length,
    },
    {
      title: "Result Pubished",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: result.data?.programmes.filter((programme) => programme.resultPublished).length
    },
    {
      title: "Result Entered",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: result.data?.programmes.filter((programme) => programme.resultEntered).length
    },
    {
      title: "Avg Category Program",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />,
      value: parseInt(result.data?.programmes.length as number / (categories.data?.categories.length as number)+""),
    },
  ];
  const h = data[0];
  return (
    <main className="w-full h-full flex ">
      <Programme
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
