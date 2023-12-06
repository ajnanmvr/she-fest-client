import Credentials from "@/components/admin/credentials/Credentials";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {api_key : API_KEY});

  const team = await client.query<GetAllTeamsQuery, GetAllTeamsQueryVariables>(
    GetAllTeamsDocument,
    {api_key : API_KEY}
  );
  return (
    <main className="w-full h-full flex ">
      <Credentials pageProps={1} result={result.data?.categories} team={team.data?.teams}/>
    </main>
  );
};

export default page;
