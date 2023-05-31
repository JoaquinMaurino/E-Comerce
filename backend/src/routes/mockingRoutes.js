import { Router } from "express";
import { getFakeProducts } from "../controllers/mockingController.js";

const routerMocking = Router()

routerMocking.get("/", getFakeProducts)

export default routerMocking;