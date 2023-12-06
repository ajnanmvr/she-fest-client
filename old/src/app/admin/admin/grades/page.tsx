import Grades from "@/components/admin/grades/Grades";
import { GetAllGradesDocument, GetAllGradesQuery, GetAllGradesQueryVariables } from "@/gql/graphql";
import { SectionIcon as GradeIcon } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  
  const { client } = getUrqlClient();
  const result = await client.query<
    GetAllGradesQuery,
    GetAllGradesQueryVariables
  >(GetAllGradesDocument, {api_key : API_KEY});

  const data = [
    {
      title: "Total Users",
      icon: <GradeIcon className="w-6 h-6 text-teal-600"/>
    },
    {
      title: "Total Users",
      icon : <GradeIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon : <GradeIcon className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Total Users",
      icon : <GradeIcon className="w-6 h-6 text-teal-600" />
    },
  ];
 const h = data[0]
  return (
    <main className="w-full h-full flex ">
      <Grades key={1} data={data} result={result.data?.grades} pageProps={1}/>
    </main>
  );
};

export default page;
