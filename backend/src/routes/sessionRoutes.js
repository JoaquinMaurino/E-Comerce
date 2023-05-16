import { Router } from "express";
import {
    registertUser,
    loginUser,
    destroySession,
    getSession
} from '../controllers/sessionController.js'
import { roleVerification } from "../config/middlewares/errorHandler.js";


const routerSession = Router();

routerSession.post("/register", registertUser)
routerSession.post("/login", loginUser)
routerSession.get("/logout", destroySession)
routerSession.get("/current", getSession)

export default routerSession;