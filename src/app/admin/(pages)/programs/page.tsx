import Programs from "@/components/programs/Programs";
import { Category, GetAllCandidateProgrammesDocument, GetAllCandidatesDocument, GetAllCandidatesQuery, GetAllCandidatesQueryVariables, GetAllCategoriesDocument, GetAllCategoriesQuery, GetAllCategoriesQueryVariables, GetAllProgrammesDocument, GetAllProgrammesQuery, GetAllProgrammesQueryVariables, GetAllZonesDocument, GetAllZonesQuery, GetAllZonesQueryVariables, Programme, Zone } from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function Page() {
  const { client } = getUrqlClient();
  
  const programmes = await client.query<
    GetAllProgrammesQuery,
    GetAllProgrammesQueryVariables
  >(GetAllProgrammesDocument, {
    api_key: API_KEY,
  });

  const candidates = await client.query<
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables
>(GetAllCandidatesDocument, {
  api_key: API_KEY,
});

  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {
    api_key: API_KEY,
  });

  const zones = await client.query<
    GetAllZonesQuery,
    GetAllZonesQueryVariables
  >(GetAllZonesDocument, {
  });

  return (
    <div>
      <Programs pageProps={1} candidates={candidates.data?.candidates} categories={categories.data?.categories as Category[]}  programmes={programmes.data?.programmes as Programme[] } zones={zones.data?.zones as Zone[]} />
    </div>
  );
}
