"use client";

import { BaseContextProps, User } from "@/modules/common";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "../auth/context";
import { useInitializeSessionState } from "./domain/usecases";
import { useSessionState } from "./state";

type SessionContextData = {
  user?: User;
};

export const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
);

export function SessionProvider({ children }: BaseContextProps) {
  const { isAuthenticated } = useAuth();
  const {
    userState: [user, setUser],
  } = useSessionState();
  const router = useRouter();
  const pathname = usePathname();

  const { initializeState } = useInitializeSessionState();
  useEffect(() => {
    initializeState({});
  }, []);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      //TODO: removed temporarily
      //setUser(undefined);
      //router.replace("/login");
      return;
    }

    if (pathname === "/login") {
      router.replace("/dashboard/summary");
      return;
    }
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
