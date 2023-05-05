import { Router } from "express";
import {
  getCartById,
  getCarts,
  addToCart,
  updateAllCartProducts,
  updateProductQuantity,
  deleteProductInCart,
  deleteAllProductsInCart,
  deleteCartById,
} from "../controllers/cartController.js";

const routerCart = Router();

routerCart.get('/', getCarts)
routerCart.get('/:cartId', getCartById)
routerCart.post('/:prodId', addToCart)
routerCart.put('/', updateAllCartProducts)
routerCart.put('/:prodId', updateProductQuantity)
routerCart.delete('/:prodId', deleteProductInCart)
routerCart.delete('/', deleteAllProductsInCart)
routerCart.delete('/', deleteCartById)

export default routerCart;