"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { SERVER_URL } from "@/lib/urql";
import { useGlobalContext } from "@/context/context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [state, LoginMutation] = useMutation(LoginUserDocument);

  const { data, setData } = useGlobalContext();

  const HandleLogin = async (data: any) => {
    const datas: OperationResult<
      LoginUserMutation,
      LoginUserMutationVariables
    > = await LoginMutation(data);

    if (!datas.data?.login) {
      console.log(datas);

      setError("Invalid username or password");
    } else {
      console.log(datas);
      setError("");
      setData(datas.data.login);
      // location.reload();
      router.push("/admin");
    }

  };

  return (
    <div className="flex w-screen h-screen bg-smoke items-center justify-center bg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleLogin({
            username: username,
            password: password,
          });
        }}
        className="bg-slate-100 flex flex-col h-fit w-96 p-10 rounded-xl gap-3 items-center"
      >
        <div className="w-40">
          <img
            onClick={() => {
              router.push("/");
            }}
            className="object-contain cursor-pointer"
            src="/logo/logo-only.jpg"
            alt="Logo"
          />
        </div>
        <span className="font-bold text-primary text-2xl">Login Here!</span>
        <p>{error && <span className="text-red-500">{error}</span>}</p>
        <input
          type="text"
          placeholder="Username"
          onChange={(e: any) => setUsername(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:border-primary text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e: any) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:border-primary text-black"
          required
        />
        <button
          type="submit"
          className="hover:bg-light border-primary border rounded-lg text-white px-3 py-1 bg-primary"
        >
          Login
        </button>
      </form>

      <div className="mt-4"></div>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange] as any,
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(Login);
