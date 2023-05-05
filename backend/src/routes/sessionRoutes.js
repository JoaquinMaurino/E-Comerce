import { Router } from "express";
import {
    registertUser,
    logintUser,
    destroySession,
    getSession
} from '../controllers/sessionController.js'

const routerSession = Router();

routerSession.post("/register", registertUser)
routerSession.post("/login", logintUser)
routerSession.get("/logout", destroySession)
routerSession.get("/current", getSession)

export default routerSession;