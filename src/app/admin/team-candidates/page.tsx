import Candidate from "@/components/admin/candidates/Candidate";
import TeamCandidate from "@/components/admin/team-candidates/TeamCandidate";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTeamCandidatesDocument,
  GetAllTeamCandidatesQuery,
  GetAllTeamCandidatesQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllTeamCandidatesQuery,
    GetAllTeamCandidatesQueryVariables
  >(GetAllTeamCandidatesDocument, {});

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
      <TeamCandidate
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
