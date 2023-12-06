"use server";

import {
  Exact,
  LogOutUserDocument,
  LogOutUserMutation,
  LogOutUserMutationVariables,
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "@/gql/graphql";
import Axios from "@/lib/Axios";
import { SERVER_URL, getUrqlClient } from "@/lib/urql";
import { Login } from "@/types/login";
import { cookies } from "next/headers";
import { OperationResult } from "urql";
export const login = async (token : string) => {
    
    try{
      cookies().set({
        name: "_adm_",
        value: token,
        httpOnly: false,
        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
        path: "/",
      });
    }
    catch(e){
      console.log(e);
    }

};
const { client } = getUrqlClient();
export const logoutUser =async ()=>{

  const categories = await client.mutation<
    LogOutUserMutation,
    LogOutUserMutationVariables
  >(LogOutUserDocument, {});

}
