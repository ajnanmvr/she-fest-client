"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, loginSchema } from "@/types/login";
import { login } from "@/app/(user)/login/api";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/context";
import { SERVER_URL } from "@/lib/urql";
import {
  OperationResult,
  cacheExchange,
  fetchExchange,
  useMutation,
  useQuery,
} from "urql";
import { withUrqlClient } from "next-urql";
import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "@/gql/graphql";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const { data, setData } = useGlobalContext();

  const [state, LoginMutaion] = useMutation(LoginUserDocument);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Login>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(loginSchema),
  });

  const HandleLogin = async (data: Login) => {
    const datas: OperationResult<
      LoginUserMutation,
      LoginUserMutationVariables
    > = await LoginMutaion(data);
    await login(datas.data?.login.token as string);
    if (!datas.data?.login) {
      setError("Invalid username or password");
    } else {
      setError("");
      setData({
        admin: {
          ...datas.data?.login.admin,
        },
        token: datas.data?.login.token,
      });
      router.push("/admin");
    }
    reset();
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          LOGIN
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            <p className="text-sm text-center text-red-500 dark:text-gray-400 transition-all">
              {error}
            </p>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit(HandleLogin)()
              }}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  {...register("username")}
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="jhon"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSubmitting ? "Signing In" : " Sign in "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(LoginPage);
