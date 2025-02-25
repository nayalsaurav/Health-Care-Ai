import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// Route for User Sign-up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "❌ Email and Password are required" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res
      .status(400)
      .json({ error: `❌ Sign-up failed: ${error.message}` });
  }

  res
    .status(201)
    .json({ message: "✅ User created successfully!", user: data.user });
});

// Route for User Sign-in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "❌ Email and Password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res
      .status(401)
      .json({ error: `❌ Sign-in failed: ${error.message}` });
  }

  res.status(200).json({ message: "✅ Sign-in successful", user: data.user });
});

// Route to Verify User
router.get("/verifyMe", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "❌ Unauthorized: No token provided" });
  }

  const { data, error } = await supabase.auth.getUser(
    token.replace("Bearer ", "")
  );

  if (error) {
    return res
      .status(401)
      .json({ error: `❌ Verification failed: ${error.message}` });
  }

  res.status(200).json({ message: "✅ User verified!", user: data.user });
});

export default router;
