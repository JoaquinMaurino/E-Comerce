import { Router } from "express";
import { chatView, loginView, registerView,  productsView } from "../controllers/hbsviewsController.js";

const routerViews = Router()

routerViews.get("/chatview", chatView)
routerViews.get("/loginView", loginView)
routerViews.get("/registerView", registerView)
routerViews.get("/productsView", productsView)


export default routerViews;