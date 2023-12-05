import Tag from "@/components/admin/tag/Tag";
import { GetAllTagsDocument, GetAllTagsQuery, GetAllTagsQueryVariables } from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >(GetAllTagsDocument, {});

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
 const h = data[0]
  return (
    <main className="w-full h-full flex ">
      <Tag key={1} data={data} result={result.data?.tags} pageProps={1}/>
    </main>
  );
};

export default page;
