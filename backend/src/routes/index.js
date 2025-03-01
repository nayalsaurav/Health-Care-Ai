import express from "express";
const router = express.Router();
import authRouter from "./auth.js";
import conversationRouter from "./conversationRouter.js";
import healthMetricRouter from "./health.js";
import mapRouter from "./map.js";
import sosRouter from "./sos.js";

router.get("/", (req, res) => {
  res.send("Hi from api/v1");
});
router.use("/auth", authRouter);
router.use("/chatbot", conversationRouter);
router.use("/health", healthMetricRouter);
router.use("/map", mapRouter);
router.use("/sos", sosRouter);
export default router;
