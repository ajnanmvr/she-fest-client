import Section from "@/components/admin/section/Section";
import {
  GetAllSectionsDocument,
  GetAllSectionsQuery,
  GetAllSectionsQueryVariables,
  GetSettingsDocument,
  GetSettingsQuery,
  GetSettingsQueryVariables,
} from "@/gql/graphql";
import { SectionIcon } from "@/icons/navs";
import { API_KEY } from "@/lib/env";
import { getUrqlClient } from "@/lib/urql";
import React from "react";

const page = async () => {
  const { client } = getUrqlClient();
  const result = await client.query<
    GetSettingsQuery,
    GetSettingsQueryVariables
  >(GetSettingsDocument, {api_key : API_KEY});

  return (
    <main className="flex flex-col w-full">
      <div className="w-full flex justify-between">
        <p className="text-xl font-bold my-auto">Settings</p>
        <button className="flex btn btn-primary bg-[#0E0123] my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="text-white"
          >
            <path
              d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
              fill="white"
            />{" "}
          </svg>
          <p>Edit Settings</p>
        </button>
      </div>
      <div className="my-auto">
        <div className="flex flex-row w-full md:w-[100%] lg:w-[90%] xl:w-[35%] justify-center mx-auto">
          <img
            src="https://i.postimg.cc/66zZMnK3/dfdsfasd-1.png"
            alt="Logo"
            className="mx-auto w-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold md:text-5xl lg:text-3xl md:text-yellow-200 lg:text-blue-500 xl:text-red-500">
            Housing Name
          </p>
          <p className="text-xl italic">"Motto For "</p>
          <p className="text-lg mx-[0%] md:mx-[20%] lg:mx-[20%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
            quae odit corrupti error harum soluta cupiditate blanditiis quam
            sint, optio delectus architecto et facilis doloremque necessitatibus
            aliquam. Exercitationem, amet sint? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Voluptas quae odit corrupti error
            harum soluta cupiditate blanditiis quam sint, optio delectus
            architecto et facilis doloremque necessitatibus aliquam.
            Exercitationem, amet sint? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Voluptas quae odit corrupti error harum soluta
            cupiditate blanditiis quam sint, optio delectus architecto et
            facilis doloremque necessitatibus aliquam. Exercitationem, amet
            sint? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptas quae odit corrupti error harum soluta cupiditate blanditiis
            quam sint, optio delectus architecto et facilis doloremque
            necessitatibus aliquam. Exercitationem, amet sint?
          </p>
          <p className="text-xl font-bold md:text-2xl">
            Darul Huda Islamic University
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;

// 28104E
// 6237A0
// 9754CB
// DEACF5
