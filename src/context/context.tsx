"use client";

import { LoginType } from "@/gql/graphql";
import { parseJwt } from "@/lib/cryptr";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

type DataType = LoginType;

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

  useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .find((cookie) => cookie.startsWith("_adm_="));
    if (cookie) {
      const token = cookie.split("=")[1];
      const payload = parseJwt(token);
      setData({
        admin: {
          ...payload,
        },
        token: cookie.split("=")[1],
      });
    }
  }, []);
  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
