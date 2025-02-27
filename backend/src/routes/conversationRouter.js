import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import express from "express";
// import conversationController from "../controllers/conversationController";
const conversationRouter = express.Router();
import { getConversations, newConversation, newMessage, deleteConversation } from "../controllers/conversationController.js";


conversationRouter.get("/conversations", getConversations);
conversationRouter.post("/conversation", newConversation);
conversationRouter.put("/conversation/:id", newMessage);
conversationRouter.delete("/conversation/:id", deleteConversation);

export default conversationRouter;