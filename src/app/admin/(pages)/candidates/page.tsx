import Candidates from "@/components/candidates/Candidates";
import {
  Candidate,
  Category,
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTeamsDocument,
  GetAllTeamsQuery,
  GetAllTeamsQueryVariables,
  Team,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function Page() {
  const { client } = getUrqlClient();
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

  const teams = await client.query<
    GetAllTeamsQuery,
    GetAllTeamsQueryVariables
  >(GetAllTeamsDocument, {
    api_key: API_KEY,
  });
  
  return (
    <div>
      <Candidates pageProps={1} teams = {teams.data?.teams as Team[]} categories={categories.data?.categories as Category[]}  candidates={candidates.data?.candidates as Candidate[] } />
    </div>
  );
}
