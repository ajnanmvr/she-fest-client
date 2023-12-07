import Candidates from "@/components/Candidates";
import { Candidate, GetAllCandidatesDocument, GetAllCandidatesQuery, GetAllCandidatesQueryVariables } from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

export default async function Page() {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllCandidatesQuery,
    GetAllCandidatesQueryVariables
  >(GetAllCandidatesDocument, {
    api_key: API_KEY,
  });

  let candidates: Candidate[] = result.data?.candidates as Candidate[];

  console.log(result.data?.candidates);

  return (
    <div className="h-screen w-screen bg-smoke flex flex-col p-10">
      <button className="bg-primary w-1/6 self-end">Create Candidate</button>
      <Candidates candidates={candidates}/>
    </div>
  )
}