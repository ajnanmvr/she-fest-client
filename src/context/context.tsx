"use client";

import {
  CheckLoggedInDocument,
  CheckLoggedInQuery,
  CheckLoggedInQueryVariables,
  LoginType,
} from "@/gql/graphql";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useQuery } from "urql";

type DataType = any;

interface ContextProps {
  data: DataType;
  setData: Dispatch<SetStateAction<DataType>>;
}

const GlobalContext = createContext<ContextProps>({
  data: {} as DataType,
  setData: (): DataType => {
    return {} as DataType;
  },
});

export const GlobalContextProvider = ({ children }: any) => {
  const [data, setData] = useState<DataType>({} as DataType);

  const [result] = useQuery<CheckLoggedInQuery, CheckLoggedInQueryVariables>({
    query: CheckLoggedInDocument,
  });

  useEffect(() => {
    console.log(result.data);

    if (result.data?.checkLoggedIn) {
      console.log(result.data);
      
      setData(result.data.checkLoggedIn as DataType);
    }
  }, [result]);

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
