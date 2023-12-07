import Candidates from "@/components/candidates/Candidates";
import {
  Candidate,
  GetAllCandidatesDocument,
  GetAllCandidatesQuery,
  GetAllCandidatesQueryVariables,
} from "@/gql/graphql";
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

  return (
    <div>
      <Candidates candidates={candidates} />
    </div>
  );
}
