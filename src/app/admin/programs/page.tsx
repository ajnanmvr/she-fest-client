import Programs from "@/components/programs/Programs";
import { Category, GetAllCandidateProgrammesDocument, GetAllCategoriesDocument, GetAllCategoriesQuery, GetAllCategoriesQueryVariables, GetAllProgrammesDocument, GetAllProgrammesQuery, GetAllProgrammesQueryVariables, Programme } from "@/gql/graphql";
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
  console.log(programmes.data?.programmes);
  
  const categories = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {
    api_key: API_KEY,
  });



  return (
    <div>
      {/* <Programs pageProps={1} categories={categories.data?.categories as Category[]}  programmes={programmes.data?.programmes as Programme[] } /> */}
    </div>
  );
}
