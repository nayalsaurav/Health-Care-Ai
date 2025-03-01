import jwt from "jsonwebtoken";

// Secret key for JWT (same as the one used in your routes)
const JWT_SECRET = "your_jwt_secret_key";

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "❌ Unauthorized: No token provided" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    // Attach decoded user info to the request object for further use in routes
    req.user = decoded;

    next(); // Call the next middleware or route handler
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: `❌ Unauthorized: ${error.message}` });
  }
};

export { authMiddleware };
