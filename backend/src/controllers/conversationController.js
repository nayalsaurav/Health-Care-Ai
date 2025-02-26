import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
const { generateContent, generateTitle } = require("../service/service");

exports.getConversations = async (req, res, next) => {
  const conversations = await Conversation.find();
  res.json(conversations);
}

exports.newConversation = async (req, res, next) => {
  const { prompt, model } = req.body;
  const content = await generateContent(prompt, model);
  const messages = [{role: "user", content: prompt}, {role: "assistant", content: content}];
  const title = await generateTitle(messages);

  const conversation = new Conversation({title, model, messages});
  await conversation.save();
  res.status(201).json(conversation);
}

exports.newMessage = async (req, res, next) => {
  const { id } = req.params;
  const { prompt } = req.body;
  const conversation = await Conversation.findById(id);
  if (!conversation) {
    res.status(404).json({message: "Conversation not found"});
  }

  const content = await generateContent(prompt, conversation.model, conversation.messages);
  conversation.messages.push({role: "user", content: prompt});
  conversation.messages.push({role: "assistant", content: content});
  await conversation.save();
  res.json(conversation);
}

exports.deleteConversation = async (req, res, next) => {
  const { id } = req.params;
  await Conversation.findByIdAndDelete(id);
  res.status(204).json({message: "Conversation deleted"});
}