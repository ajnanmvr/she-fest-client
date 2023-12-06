import Judgement from "@/components/judgment/Judgment";
import {
  GetProgrammeByCodeDocument,
  GetProgrammeByCodeQuery,
  GetProgrammeByCodeQueryVariables,
  Programme,
} from "@/gql/graphql";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";

  export default async function page({ params }: { params: { code: string } }) {
    const { client } = getUrqlClient();
    const result = await client.query<
      GetProgrammeByCodeQuery,
      GetProgrammeByCodeQueryVariables
    >(GetProgrammeByCodeDocument, {
      api_key: API_KEY,
      programCode: params.code,
    });

  return (
    <main className="font-sans h-screen overflow-hidden flex bg-accent">
      <Judgement programme={result.data?.programmeByCode as Programme} />
    </main>
  );
}
