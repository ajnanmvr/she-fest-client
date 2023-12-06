import Tag from "@/components/admin/tag/Tag";
import { GetAllTagsDocument, GetAllTagsQuery, GetAllTagsQueryVariables } from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";
import Gallery from "@/components/admin/gallery/Gallery";
import axios from "axios";

const page = async () => {


  const data = [
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon: <SectionIcon className="w-6 h-6 text-teal-600" />
    },
  ];

  const result = await axios.get(`https://result-gen.vercel.app/gallery?${Date.now()}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  return (
    <main className="w-full h-full flex ">
      <Gallery key={1} result={result.data}  />
    </main>
  );
};

export default page;
