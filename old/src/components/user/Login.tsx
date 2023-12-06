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
} from "urql";
import { withUrqlClient } from "next-urql";
import {
  LoginUserDocument,
  LoginUserMutation,
  LoginUserMutationVariables,
} from "@/gql/graphql";
import NProgress from "nprogress";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const { data, setData } = useGlobalContext();

  const [state, LoginMutation] = useMutation(LoginUserDocument);
  const [routerButtonClicked, setRouterButtonClicked] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    routerButtonClicked ? NProgress.start() : null;
  }, [routerButtonClicked]);
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
    > = await LoginMutation(data);
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
      setRouterButtonClicked(true);
      router.push("/admin");
    }
    reset();
  };

  return (
    <div className="flex h-[40rem] flex-col justify-center px-6 py-12 lg:px-8 fixed top-1/2 bottom-1/2 -translate-y-1/2 bg-white w-96 sm:w-[30rem] rounded-xl left-1/2 -translate-x-1/2 sm:shadow-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-10 ">
        <img
          src="/img/realia-txt-black.png"
          className="mx-auto h-12"
          alt="fsfs"
        />
      </div>
      <p className="text-red-700 text-center mt-4">{error}</p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(HandleLogin)();
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                {...register("username")}
                id="username"
                name="username"
                type="text"
                required
                placeholder="username"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                placeholder="••••••••"
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Signing In" : " Sign in "}
            </button>
          </div>
        </form>
      </div>
    </div>
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