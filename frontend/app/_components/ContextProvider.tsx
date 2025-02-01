"use client";

import {
  Session,
  createKeyStoreInteractor,
  createSingleSigAuthDescriptorRegistration,
  createWeb3ProviderEvmKeyStore,
  hours,
  registerAccount,
  registrationStrategy,
  ttlLoginRule,
} from "@chromia/ft4";
import { createClient } from "postchain-client";
import { ReactNode, createContext, useContext, useState } from "react";
import { getRandomUserName } from "../users";

interface SessionContextType {
  session: Session | undefined;
  login: () => Promise<void>;
}

const ChromiaContext = createContext<SessionContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  const nodeUrlPool = process.env.NEXT_PUBLIC_NODE_URL_POOL;
  const blockchainRid = process.env.NEXT_PUBLIC_BLOCKCHAIN_RID;

  const login = async () => {
    try {
      console.log("Initializing Session");

      const client = await createClient({ nodeUrlPool, blockchainRid });
      const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);
      const evmKeyStoreInteractor = createKeyStoreInteractor(
        client,
        evmKeyStore
      );
      const accounts = await evmKeyStoreInteractor.getAccounts();

      if (accounts.length > 0) {
        const { session } = await evmKeyStoreInteractor.login({
          accountId: accounts[0].id,
          config: { rules: ttlLoginRule(hours(2)), flags: ["MySession"] },
        });
        setSession(session);
      } else {
        const authDescriptor = createSingleSigAuthDescriptorRegistration(
          ["A", "T"],
          evmKeyStore.id
        );

        const { session } = await registerAccount(
          client,
          evmKeyStore,
          registrationStrategy.open(authDescriptor, {
            config: { rules: ttlLoginRule(hours(2)), flags: ["MySession"] },
          }),
          { name: "register_user", args: [getRandomUserName()] }
        );

        setSession(session);
      }
    } catch (error) {
      console.error("Error during session initialization:", error);
    }
  };

  return (
    <ChromiaContext.Provider value={{ session, login }}>
      {children}
    </ChromiaContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(ChromiaContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a ContextProvider");
  }
  return context;
}
