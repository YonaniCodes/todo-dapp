// for sending operation to the blockchain

import { Session } from "@chromia/ft4";

type operationArg = [];
type queryArg = {};

export async function operation(
  session: Session,
  args: operationArg,
  name: string
) {
  try {
    const res = await session?.call({
      name,
      args: args, // Pass the arguments dynamically
    });
    return res;
  } catch (error) {
    return error;
  }
}

// for making query to block chain

export async function query(session: Session, args: queryArg, name: string) {
  try {
    const res = await session.query({
      name, // The name of the query you want to run
      args,
    });
    return res;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
