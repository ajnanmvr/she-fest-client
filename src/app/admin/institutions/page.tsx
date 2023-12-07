import Candidates from "@/components/candidates/Candidates";
import Institutions from "@/components/institutions/Institutions";
import { GetAllTeamsDocument, GetAllTeamsQuery, GetAllTeamsQueryVariables, Team } from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function Page() {
  const { client } = getUrqlClient();

  const teams = await client.query<
    GetAllTeamsQuery,
    GetAllTeamsQueryVariables
  >(GetAllTeamsDocument, {
    api_key: API_KEY,
  });

  return (
    <div>
      <Institutions pageProps={1} teams = {teams.data?.teams as Team[]}/>
    </div>
  );
}
