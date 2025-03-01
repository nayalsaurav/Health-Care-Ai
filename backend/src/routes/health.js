import express from "express";
import { postHealthMetric } from "../controllers/HealthController.js";

const healthRouter = express.Router();

// Define the route for posting health metrics
healthRouter.post("/postHealthMetric", postHealthMetric);

export default healthRouter;
