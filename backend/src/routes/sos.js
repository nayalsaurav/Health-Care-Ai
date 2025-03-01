import express from "express";
import { postFeedback } from "../controllers/sosController.js";

const sosRouter = express.Router();
sosRouter.post("/emergencySos", postFeedback);

export default sosRouter;
