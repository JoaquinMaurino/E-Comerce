import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";
import { roleVerification,isSessionActive } from "../config/middlewares/errorHandler.js";

const routerProduct = Router();

routerProduct.get("/",isSessionActive,roleVerification(["admin", "user"]), getProducts);
routerProduct.get("/:pId", isSessionActive,roleVerification(["admin", "user"]), getProduct);
routerProduct.post("/", isSessionActive, roleVerification(["admin"]), addProduct);
routerProduct.put("/:pId", isSessionActive, roleVerification(["admin"]), updateProductById);
routerProduct.delete("/:pId", isSessionActive, roleVerification(["admin"]), deleteProductById);

export default routerProduct;
