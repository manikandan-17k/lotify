import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const db = createClient(supabaseUrl, supabaseKey);

// optional test
export const testDB = async () => {
  const { data, error } = await db.from("songs").select("*");

  if (error) {
    console.error("DB Error:", error.message);
} else {
    console.log("URL:", process.env.SUPABASE_URL);
    console.log("DB Connected ✅");
  }
};
