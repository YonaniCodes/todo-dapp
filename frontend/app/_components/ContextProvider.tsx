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
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRandomUserName } from "@/app/users";

// Create context for Chromia session
const ChromiaContext = createContext<Session | undefined>(undefined);

// 2.
declare global {
  interface Window {
    ethereum: any;
  }
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined>(undefined);

  const nodeUrlPool = process.env.NEXT_PUBLIC_NODE_URL_POOL;
  const blockchainRid = process.env.NEXT_PUBLIC_BLOCKCHAIN_RID;

  useEffect(() => {
    const initSession = async () => {
      console.log("Initializing Session");

      try {
        // 1. Initialize Client
        console.log("Creating client...");
        const client = await createClient({
          nodeUrlPool,
          blockchainRid,
        });

        // 2. Connect with MetaMask

        const evmKeyStore = await createWeb3ProviderEvmKeyStore(
          window.ethereum
        );

        const evmKeyStoreInteractor = createKeyStoreInteractor(
          client,
          evmKeyStore
        );

        const accounts = await evmKeyStoreInteractor.getAccounts();

        if (accounts.length > 0) {
          // 4. Start a new session
          const { session } = await evmKeyStoreInteractor.login({
            accountId: accounts[0].id,
            config: {
              rules: ttlLoginRule(hours(2)),
              flags: ["MySession"],
            },
          });

          setSession(session);
        } else {
          // 5. Create a new account by signing a message using MetaMask
          const authDescriptor = createSingleSigAuthDescriptorRegistration(
            ["A", "T"],
            evmKeyStore.id
          );

          const { session } = await registerAccount(
            client,
            evmKeyStore,
            registrationStrategy.open(authDescriptor, {
              config: {
                rules: ttlLoginRule(hours(2)),
                flags: ["MySession"],
              },
            }),
            {
              name: "register_user",
              args: [getRandomUserName()],
            }
          );

          setSession(session);
          console.log("Session state after initialization:", session);
        }
      } catch (error) {
        console.error("Error during session initialization:", error);
      }
    };

    console.log("Current session state:", session);
    initSession().catch((error) =>
      console.error("Error initializing session:", error)
    );
  }, []);

  return (
    <ChromiaContext.Provider value={session}>
      {children}
    </ChromiaContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(ChromiaContext);
}
