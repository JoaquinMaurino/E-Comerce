import { Router } from "express";
import { chatView, loginView, registerView,  productsView, passwordView, emailSentView, successView, sendEmailView } from "../controllers/hbsviewsController.js";
import { sendEmail, restorePassword } from "../controllers/userController.js";
const routerViews = Router()

routerViews.get("/chatview", chatView)
routerViews.get("/loginView", loginView)
routerViews.get("/registerView", registerView)
routerViews.get("/productsView", productsView)
routerViews.get("/restorePassword/:token", passwordView)
routerViews.put("/restorePassword/:token", restorePassword)
routerViews.get("/emailSentView", emailSentView)
routerViews.get("/successView", successView)
routerViews.get("/emailForm", sendEmailView)
routerViews.post("/emailForm", sendEmail)


export default routerViews;