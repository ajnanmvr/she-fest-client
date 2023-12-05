import { Client, cacheExchange, createClient, fetchExchange } from "urql/core";

let _client: Client | null = null;

export const SERVER_URL = "https://rms-omega-six.vercel.app/graphql" || process.env.SERVER_URL as string;

export const getUrqlClient = () => {
  if (!_client) {
    _client = createClient({
      url: SERVER_URL || process.env.SERVER_URL as string,
      requestPolicy: "cache-first",
      exchanges: [fetchExchange , cacheExchange ],
      fetchOptions : {
        cache : "no-cache",
        credentials : "include",
        headers : {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept, Authorization, X-Request-With",
          "Access-Control-Allow-Credentials" : "true"
        }
      }
    });
  }
  const client = _client;
  return { client };
};