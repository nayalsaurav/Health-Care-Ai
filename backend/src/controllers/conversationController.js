import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { generateContent, generateTitle } from "../utility/service.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await prisma.conversations.findMany({
      include: {
        messages: true,
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const newConversation = async (req, res, next) => {
  try {
    const { prompt, model = "gemini-1.5-flash" } = req.body;
    const content = await generateContent(prompt, model);
    const messages = [
      { role: "user", content: prompt },
      { role: "assistant", content: content },
    ];
    const title = await generateTitle(messages);

    const conversation = await prisma.conversations.create({
      data: {
        title,
        model,
        message: content, 
        messages: {
          create: messages,
        },
      },
      include: {
        messages: true,
      },
    });
    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const newMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;
    
    const conversation = await prisma.conversations.findUnique({
      where: { id },
      include: { messages: true },
    });
    
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const content = await generateContent(prompt, conversation.model, conversation.messages);
    
    const newMessages = await prisma.message.createMany({
      data: [
        { role: "user", content: prompt, conversationId: id },
        { role: "assistant", content: content, conversationId: id },
      ],
    });

    res.json(newMessages);
  } catch (error) {
    next(error);
  }
};

export const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Conversation = await prisma.conversations.findUnique({where: {id}});
    if(!Conversation){
      res.status(404).json({success: true, message: "Conversation Id not Found" });
    }

    await prisma.message.deleteMany({ where: { conversationId: id } });
    await prisma.conversations.delete({ where: { id } });
    
    res.status(202).json({success: true, message: "Conversation deleted" });
  } catch (error) {
    next(error);
  }
};
