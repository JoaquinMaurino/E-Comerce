import { Router } from "express";
import { chatView, loginView, registerView,  productsView, passwordView, emailSentView, successView } from "../controllers/hbsviewsController.js";

const routerViews = Router()

routerViews.get("/chatview", chatView)
routerViews.get("/loginView", loginView)
routerViews.get("/registerView", registerView)
routerViews.get("/productsView", productsView)
routerViews.get("/restorePassword", passwordView)
routerViews.get("/emailSentView", emailSentView)
routerViews.get("/successView", successView)


export default routerViews;