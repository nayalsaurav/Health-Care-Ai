import express from "express";
import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Secret key for JWT generation
const JWT_SECRET = "your_jwt_secret_key";

// Function to generate JWT
const generateJWT = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      fullName: user.user_metadata.fullName,
    }, // Payload
    JWT_SECRET, // Secret key
    { expiresIn: "1h" } // Expiry time (1 hour)
  );
};

// Route for User Sign-up
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);

  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({
        success: true,
        message: `Email, Password, or Full Name is required!`,
      });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName }, // Save full name to the user metadata
    },
  });

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: `❌ Sign-up failed: ${error.message}` });
  }

  const accessToken = data.session?.access_token; // Access token from the session

  // Generate a custom JWT token
  const jwtToken = generateJWT(data.user);

  res.status(201).json({
    success: true,
    message: "✅ User created successfully!",
    user: data.user,
    access_token: accessToken, // Send the token from supabase
    jwt_token: jwtToken, // Send the custom JWT token
  });
});

// Route for User Sign-in
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: true, message: "❌ Email and Password are required" });
  }

  const { data, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res
      .status(401)
      .json({ success: false, message: `❌ Sign-in failed: ${error.message}` });
  }

  // Generate a custom JWT token after successful sign-in
  const jwtToken = generateJWT(data.user);

  res.status(200).json({
    success: true,
    message: "✅ Sign-in successful",
    user: data.user,
    fullName: data.user.user_metadata.fullName,
    access_token: session?.accessToken, // Send the token from supabase
    jwt_token: jwtToken, // Send the custom JWT token
  });
});

// Route to Verify User
router.get("/verifyMe", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: true, message: "❌ Unauthorized: No token provided" });
  }

  // Verify the JWT token
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    // You can now access the decoded data (like user_id, email) here
    res.status(200).json({
      success: true,
      message: "✅ User verified!",
      user: { user_id: decoded.user_id, email: decoded.email },
    });
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: `❌ Verification failed: ${error.message}`,
      });
  }
});

export default router;
