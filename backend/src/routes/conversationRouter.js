import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import express from "express";
// import conversationController from "../controllers/conversationController";
const conversationRouter = express.Router();
import { getConversations, newConversation, newMessage, deleteConversation } from "../controllers/conversationController.js";
import { authMiddleware } from '../middleware/auth.js';


conversationRouter.get("/conversations", getConversations);
conversationRouter.post("/conversation",authMiddleware, newConversation);
conversationRouter.put("/conversation/:id",authMiddleware, newMessage);
conversationRouter.delete("/conversation/:id",authMiddleware, deleteConversation);

export default conversationRouter;