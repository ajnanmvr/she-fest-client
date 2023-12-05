"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { Client, cacheExchange, fetchExchange } from "urql";

// type DataType = LoginType;

// interface ContextProps {
//   data: DataType;
//   setData: Dispatch<SetStateAction<DataType>>;
// }

const client : any = new Client({
    url: 'http://localhost:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  });

const UrqlContext = createContext({
   client ,
});

export const UrqlContextProvider = ({ children }: any) => {
  const [data, setData] = useState();


  return (
    <UrqlContext.Provider value={client}>
      {children}
    </UrqlContext.Provider>
  );
};

export const useUrqlContext = () => useContext(UrqlContext);
