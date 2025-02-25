const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_KEY;


const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
}
const supabase = createClient(supabaseUrl, supabaseKey, options)

router.get("/", (req, res) => {
  res.send("Hi from api/v1/auth");
});

module.exports = router;