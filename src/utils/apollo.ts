import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import { currentOrg } from '@/utils';

import storage from "./storage";

const httpLink = createHttpLink({
  uri: "//localhost:3000/graphql",
});

// 请求拦截器
const authLink = setContext((_, { headers }) => {
  const token = storage.get("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      // orgId: currentOrg()?.value,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
