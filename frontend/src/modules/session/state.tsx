"use client";

import { BaseContextProps, ReactUseState, User } from "@/modules/common";
import { createContext, useContext, useState } from "react";

type SessionStateContextData = {
  userState: ReactUseState<User | undefined>;
};

export const SessionStateContext = createContext<SessionStateContextData>(
  {} as SessionStateContextData
);

export function SessionStateProvider({ children }: BaseContextProps) {
  const userState = useState<User>();

  return (
    <SessionStateContext.Provider value={{ userState }}>
      {children}
    </SessionStateContext.Provider>
  );
}

export const useSessionState = () => useContext(SessionStateContext);
