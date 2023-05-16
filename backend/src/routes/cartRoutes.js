import { Router } from "express";
import {
  getCartById,
  addToCart,
  updateAllCartProducts,
  updateProductQuantity,
  deleteProductInCart,
  deleteAllProductsInCart
} from "../controllers/cartController.js";
import { roleVerification, passportError } from "../config/middlewares/errorHandler.js";


const routerCart = Router();


routerCart.get('/',passportError('login'),roleVerification(['user']), getCartById)
routerCart.post('/:prodId',passportError('login'),roleVerification(['user']), addToCart)
routerCart.put('/',passportError('login'),roleVerification(['user']), updateAllCartProducts)
routerCart.put('/:prodId',passportError('login'),roleVerification(['user']), updateProductQuantity)
routerCart.delete('/:prodId',passportError('login'),roleVerification(['user']), deleteProductInCart)
routerCart.delete('/',passportError('login'),roleVerification(['user']), deleteAllProductsInCart)

export default routerCart;