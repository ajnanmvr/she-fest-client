import Institutions from "@/components/institutions/Institutions";
import { GetAllTeamsDocument, GetAllTeamsQuery, GetAllTeamsQueryVariables, GetAllZonesDocument, GetAllZonesQuery, GetAllZonesQueryVariables, Team, Zone } from "@/gql/graphql";
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

  const zones = await client.query<
    GetAllZonesQuery,
    GetAllZonesQueryVariables
  >(GetAllZonesDocument, {
  });



  return (
    <div>
      <Institutions pageProps={1} teams={teams.data?.teams as Team[]} zones={zones.data?.zones as Zone[]} />
    </div>
  );
}
