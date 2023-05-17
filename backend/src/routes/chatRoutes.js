import { Router } from "express";
import { roleVerification, passportError } from "../config/middlewares/errorHandler.js";
import { getMessages, sendMessage } from "../controllers/chatController.js";

const routerChat = Router();

routerChat.get("/",passportError('login') ,roleVerification(["user"]), getMessages);
routerChat.post("/",passportError('login'), roleVerification(["user"]), sendMessage);

export default routerChat