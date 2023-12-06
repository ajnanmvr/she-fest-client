"use client"
import ErrorPage from "@/components/Error";
import SideBar from "@/components/admin/SideBar";
import { useGlobalContext } from "@/context/context";
import { CheckLoggedInDocument, CheckLoggedInQuery, Roles } from "@/gql/graphql";
import { SERVER_URL } from "@/lib/urql";
import { withUrqlClient } from "next-urql";
import { cacheExchange, fetchExchange, useQuery } from "urql";

 function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [{ fetching, data }] = useQuery<
  CheckLoggedInQuery
>({
  query: CheckLoggedInDocument,
  variables: {
  },
});

  return (
    <div className={`${ data?.checkLoggedIn?.roles === Roles.Admin &&  'w-full h-full'}`}>
      { data?.checkLoggedIn?.roles  === Roles.Admin   ? 
      (
        <>{children}</>
      ) :
      (
        <ErrorPage/>
      )
    }
    </div>
  );
}

export default withUrqlClient(() => ({
  url: SERVER_URL,
  exchanges: [fetchExchange, cacheExchange],
  fetchOptions: {
    cache: "no-cache",
    credentials: "include",
  },
}))(RootLayout);

