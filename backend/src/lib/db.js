import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const db = createClient(supabaseUrl, supabaseKey);

export const connectDB = async () => {
	try {
		console.log("Database Connected ✅");
	} catch (error) {
		console.log(error.message);
	}
};

export default connectDB;