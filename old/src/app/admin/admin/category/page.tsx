import Category from "@/components/admin/category/Category";
import {
  GetAllCategoriesDocument,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllSectionsDocument,
  GetAllSectionsQuery,
  GetAllSectionsQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";
import { API_KEY } from "@/lib/env";

const page = async () => {
  
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GetAllCategoriesDocument, {api_key : API_KEY});

  const section = await client.query<
    GetAllSectionsQuery,
    GetAllSectionsQueryVariables
  >(GetAllSectionsDocument, {api_key : API_KEY});

  const data = [
      {
        title: "Total Users",
        icon: <SectionIcon className="w-6 h-6 text-teal-600"/>
      },
      {
        title: "Total Users",
        icon : <SectionIcon className="w-6 h-6 text-teal-600" />
      },
      { 
        title: "Total Users",
        icon : <SectionIcon className="w-6 h-6 text-teal-600" />
      },
      {
        title: "Total Users",
        icon : <SectionIcon className="w-6 h-6 text-teal-600" />
      },
  ];

  console.log(result);
  

  return (
    <main className="w-full h-full flex ">
      <Category key={1} data={data} result={result.data?.categories} section={section.data?.sections} pageProps={1}/>
    </main>
  );
};

export default page;
