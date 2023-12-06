import Candidate from "@/components/admin/candidates/Candidate";
import {
  GetAllDetailedCandidatesDocument,
  GetAllDetailedCandidatesQuery,
  GetAllDetailedCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
} from "@/gql/graphql";
import { Candidates } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllDetailedCandidatesQuery,
    GetAllDetailedCandidatesQueryVariables
  >(GetAllDetailedCandidatesDocument, {
    api_key : API_KEY
  });

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {
    api_key : API_KEY
  });

  const teams = await client.query<GetAllTeamsQuery, GetAllTeamsQueryVariables>(
    GetAllTeamsDocument,
    {
      api_key : API_KEY
    }
  );

  const data = [
    {
      title: "Total Candidates",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
      value : result.data?.candidates.length
    },
    {
      title: "Team Candidates(Avg) ",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
      value : parseInt(result.data?.candidates?.length as number / (teams.data?.teams?.length as number) + '')
    },
    {
      title: "Candidates (CHS)",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
      // candidates who starting chestNO with C
      value : result.data?.candidates?.filter((candidate)=>candidate.chestNO?.startsWith('C')).length
    },
    {
      title: "Candidates (SMS)",
      icon: <Candidates className="w-16 h-16 mx-3 text-secondary" />,
      // candidates who starting chestNO with S
      value : result.data?.candidates?.filter((candidate)=>candidate.chestNO?.startsWith('S')).length
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
