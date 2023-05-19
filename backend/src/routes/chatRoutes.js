import { Router } from "express";
import {
  roleVerification,
  isSessionActive,
} from "../config/middlewares/errorHandler.js";
import { getMessages, sendMessage } from "../controllers/chatController.js";

const routerChat = Router();

routerChat.get("/", isSessionActive, roleVerification(["user"]), getMessages);
routerChat.post("/", isSessionActive, roleVerification(["user"]), sendMessage);

export default routerChat;
