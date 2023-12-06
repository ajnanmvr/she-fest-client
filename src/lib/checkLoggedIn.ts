import { OperationResult } from "urql";
import { getUrqlClient } from "./urql";
import { CheckLoggedInDocument, CheckLoggedInQuery, CheckLoggedInQueryVariables, Exact } from "@/gql/graphql";

export const checkLogin = async () => {

    const { client } = getUrqlClient();
    const result: OperationResult<
        CheckLoggedInQuery
    > = await client.query<CheckLoggedInQuery, CheckLoggedInQueryVariables>(
        CheckLoggedInDocument,
        {}
    );

    return result.data?.checkLoggedIn;

}