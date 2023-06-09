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
  roleVerification,
  isSessionActive,
} from "../config/middlewares/errorHandler.js";

const routerCart = Router();

routerCart.get(
  "/",
   isSessionActive,
    roleVerification(["admin"]),
     getCartById);

routerCart.post(
  "/:prodId",
  isSessionActive,
  roleVerification(["user"]),
  addToCart);

routerCart.post(
  "/checkout",
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
