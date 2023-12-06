import NOT_AV from "@/components/NOT_AV";
import DesktopView from "@/components/program/DesktopView";
import MobileView from "@/components/program/MobileView";
import TabView from "@/components/program/TabView";
import {
  Candidate,
  CandidateProgramme,
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


  let programme: Programme = result?.data?.programmeByCode as Programme;



  if (!programme?.resultPublished) {
    programme = {
      ...programme,
      candidateProgramme: programme?.candidateProgramme?.map((cp, i) => {
        return {
          grade: null,
          position: null,
          point: null,
          candidate: cp?.candidate
        }
      })
    }
  }


  return (
    <main className="bg-accent w-screen h-screen ">
 {/* <NOT_AV/> */}
      {/* Mobile View */}
      <MobileView programme={programme} />
      {/* Tab View */}
      <TabView programme={programme} />
      {/* Desktop View */}
      <DesktopView programme={programme} />
    </main>
  );
}
