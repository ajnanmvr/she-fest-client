import AGridProgramme from "@/components/admin/aGridProgramme/AGridProgramme";
import {
  GetAllDetailedProgrammeDocument,
  GetAllDetailedProgrammeQuery,
  GetAllDetailedProgrammeQueryVariables,
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
    GetAllDetailedProgrammeQuery,
    GetAllDetailedProgrammeQueryVariables
  >(GetAllDetailedProgrammeDocument, {
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
      <AGridProgramme
        key={1}
        data={data}
        result={result.data?.programmes}
        pageProps={1}
        categories={categories.data?.categories}
        teams={teams.data?.teams}
      />
    </main>
  );
};

export default page;
