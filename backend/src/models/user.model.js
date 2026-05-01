import { db } from "../lib/db.js";

export const createUser = async (user) => {
  const { data, error } = await db
    .from("users")
    .insert([user])
    .select();

  if (error) throw error;

  return data[0];
};