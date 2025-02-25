import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"; // Use 'import' instead of require
// bCMTKRbm1vueSLyO;
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;


if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
