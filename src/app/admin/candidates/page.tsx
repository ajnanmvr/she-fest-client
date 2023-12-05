import Candidate from "@/components/admin/candidates/Candidate";
import {
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
} from "@/gql/graphql";
import { Candidates } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllCandidatesQuery,
    GetAllCandidatesQueryVariables
  >(GetAllCandidatesDocument, {});

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {});

  const teams = await client.query<GetAllTeamsQuery, GetAllTeamsQueryVariables>(
    GetAllTeamsDocument,
    {}
  );

  const data = [
    {
      title: "Total Users",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
    },
    {
      title: "Total Users",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
    },
    {
      title: "Total Users",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
    },
    {
      title: "Total Users",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
    },

  ];
  const h = data[0]; 
  return (
    <main className="w-full h-full flex overflow-hidden">
      <Candidate
        key={1}
        data={data}
        result={result.data?.candidates}
        pageProps={1}
        categories={categories.data?.categories}
        teams={teams.data?.teams}
      />
    </main>
  );
};

export default page;
