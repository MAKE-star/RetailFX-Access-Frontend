"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { TAuthContext } from "./types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUsersServices, userService } from "@/services";
const AuthContext = createContext<TAuthContext>(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: any) => {
  const { useUserMe } = useUsersServices();
  const { data: session, status } = useSession();
  const { push } = useRouter();

  const [user, setUser] = useState<any>({});
  const [jwt, setJwt] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const sessionUser: any = session?.user;

  const getMe = async () => {
    if (sessionUser?.User?.USERNAME) {
      const response = await userService.getMe(sessionUser?.User?.USERNAME);
      setUser(response?.data);
    }
  };
  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common["token"] = `${jwt}`;
    }
  }, [jwt]);

  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      push("/sign-in");
    }axios.defaults.headers.common["token"] = `${sessionUser?.JWT}`;
    if (session?.user) {
      if (sessionUser?.JWT) {
        axios.defaults.headers.common["token"] = `${sessionUser?.JWT}`;
      }
      getMe();
    }
    if (sessionUser?.JWT) {
      setJwt(sessionUser?.JWT);
    }
  }, [session?.user, status]);

  return (
    <AuthContext.Provider value={{ user, setUser, jwt, setJwt,getMe }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;