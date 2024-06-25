"use client";

import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { User } from "@/interfaces/user";
import { useAxios } from "../hooks/useAxios";

type ContextType = {
  user?: User;
  isLoading: boolean;
  accessToken?: string;
  setAccessToken: Dispatch<SetStateAction<string>> | ((value: string) => void);
  logout: () => void;
};

const defaultValue: ContextType = {
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAccessToken: (value: string) => null,
  logout: () => null,
};

const AuthContext = createContext<ContextType>(defaultValue);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxios(accessToken);

  useEffect(() => {
    const _token = sessionStorage.getItem("access_token");

    if (_token) {
      setAccessToken(_token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get("auth/user");
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [getUser, accessToken]);

  const handleLogout = () => {
    setAccessToken(undefined);
  };

  useEffect(() => {
    sessionStorage.setItem("access_token", accessToken || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessToken,
        setAccessToken,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
