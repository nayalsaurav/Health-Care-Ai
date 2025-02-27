import express  from "express"
const router = express.Router();
import authRouter from "./auth.js"
import conversationRouter from "./conversationRouter.js"


router.get("/", (req, res) => {
  res.send("Hi from api/v1");
});
router.use("/auth" , authRouter)
router.use("/chatbot", conversationRouter)

export default router;