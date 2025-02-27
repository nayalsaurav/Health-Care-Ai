import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// Route for User Sign-up
router.post("/signup", async (req, res) => {
  const {fullName, email, password} = req.body;
  console.log(fullName , email , password);
  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({success: true , message: `Email, Password or Full Name is required!` });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    fullName,
  });

  if (error) {
    return res
      .status(400)
      .json({success: false ,message: `❌ Sign-up failed: ${error.message}` });
  }

  res
    .status(201)
    .json({success: true, message: "✅ User created successfully!", user: data.user });
});

// Route for User Sign-in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({success: true, message: "❌ Email and Password are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res
      .status(401)
      .json({success: false ,message: `❌ Sign-in failed: ${error.message}` });
  }

  res.status(200).json({ message: "✅ Sign-in successful", user: data.user });
});

// Route to Verify User
router.get("/verifyMe", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({success:true, message: "❌ Unauthorized: No token provided" });
  }

  const { data, error } = await supabase.auth.getUser(
    token.replace("Bearer ", "")
  );

  if (error) {
    return res
      .status(401)
      .json({success:false ,message: `❌ Verification failed: ${error.message}` });
  }

  res.status(200).json({success: true, message: "✅ User verified!", user: data.user });
});

export default router;
