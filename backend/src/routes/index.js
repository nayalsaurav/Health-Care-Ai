import express  from "express"
const router = express.Router();
import authRouter from "./auth.js"

router.get("/", (req, res) => {
  res.send("Hi from api/v1");
});
router.use("/auth" , authRouter)
export default router;