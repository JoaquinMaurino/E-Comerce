import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";
import { roleVerification,passportError } from "../config/middlewares/errorHandler.js";

const routerProduct = Router();

routerProduct.get("/", getProducts);
routerProduct.get("/:pId", getProduct);
routerProduct.post("/",passportError('login'), roleVerification(["admin"]), addProduct);
routerProduct.get("/:pId",passportError('login'), roleVerification(["admin"]), updateProductById);
routerProduct.get("/:pId",passportError('login'), roleVerification(["admin"]), deleteProductById);

export default routerProduct;
