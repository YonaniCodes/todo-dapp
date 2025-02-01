// for sending operation to the blockchain

import { TypePubkey, TypeSession } from "../_lib/types/global";
import { RawGtv, DictPair } from "postchain-client";

type operationArg = {};

type queryArg = DictPair & {
  [key: string]: RawGtv | TypePubkey; // Allow other keys to have values of RawGtv or TypePubkey
};

export async function operation(
  session: TypeSession,
  args: operationArg,
  name: string
) {
  console.log(args);
  try {
    const res = await session?.call({
      name,
      args: args, // Pass the arguments dynamically
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// for making query to block chain

export async function query(
  session: TypeSession,
  args: queryArg,
  name: string
) {
  try {
    const res = await session?.query({
      name, // The name of the query you want to run
      args,
    });
    return res;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
