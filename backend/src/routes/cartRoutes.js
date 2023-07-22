import { Router } from "express";
import {
  getCartById,
  addToCart,
  updateAllCartProducts,
  updateProductQuantity,
  deleteProductInCart,
  deleteAllProductsInCart,
  finishPurchaseInCart,
} from "../controllers/cartController.js";
import {
  isSessionActive,
  roleVerification,
} from "../config/middlewares/errorHandler.js";

const routerCart = Router();

routerCart.get(
  "/",
   isSessionActive,
    roleVerification(["user"]),
     getCartById);

routerCart.post(
  "/:prodId",
  isSessionActive,
  roleVerification(["user"]),
  addToCart);

routerCart.post(
  "/",
  isSessionActive,
  roleVerification(["user"]),
  finishPurchaseInCart);

routerCart.put(
  "/",
  isSessionActive,
  roleVerification(["user"]),
  updateAllCartProducts);

routerCart.put(
  "/:prodId",
  isSessionActive,
  roleVerification(["user"]),
  updateProductQuantity);

routerCart.delete(
  "/:prodId",
  isSessionActive,
  roleVerification(["user"]),
  deleteProductInCart);

routerCart.delete(
  "/",
  isSessionActive,
  roleVerification(["user"]),
  deleteAllProductsInCart);


export default routerCart;
