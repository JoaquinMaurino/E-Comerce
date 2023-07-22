import {
  findCartById,
  updateCart,
  deleteFromCart,
} from "../services/cartService.js";
import { createTicket } from "../services/ticketService.js";
import { updateProduct } from "../services/productService.js";
import { productModel } from "../models/MongoDB/productModel.js";

export const getCartById = async (req, res) => {
  const cId = req.session.user.cartId;
  try {
    const cart = await findCartById(cId);
    const cartPopulate = await cart.populate("products.productId");
    res.status(200).send(cartPopulate);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const addToCart = async (req, res) => {
  const cId = req.session.user.cartId;
  const pId = req.params.prodId;
  try {
    const cart = await findCartById(cId);
    const prodsInCart = cart.products;
    const isInCart = prodsInCart.find((product) => product.productId == pId);
    if (!isInCart) {
      cart.products.push({ productId: pId });
    } else {
      const index = prodsInCart.findIndex(
        (product) => product.productId == pId
      );
      prodsInCart[index].quantity++;
    }
    await cart.save();
    res.status(200).send("Product successfully added to cart");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateAllCartProducts = async (req, res) => {
  const cId = req.session.user.cartId;
  const data = req.body;
  try {
    const updatedProducts = await updateCart(cId, { products: data });
    res
      .status(200)
      .send(`Cart with ID: ${cId} updated successfully: ${updatedProducts}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateProductQuantity = async (req, res) => {
  const cId = req.session.user.cartId;
  const pId = req.params.prodId;
  let { quantity } = req.body;
  let newQuantity = parseInt(quantity);
  try {
    const cart = await findCartById(cId);
    const prodsInCart = cart.products;
    const productIndex = prodsInCart.findIndex(
      (product) => product.productId == pId
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    } else {
      cart.products[productIndex].quantity = newQuantity;
      cart.save();
      res.status(200).send({
        message: `Success! Product [ID:${pId}] quantity updated`});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProductInCart = async (req, res) => {
  const cId = req.session.user.cartId;
  const pId = req.params.prodId;
  try {
    await deleteFromCart(cId, pId);
    res.status(200).send({ message: "Product successfully removed" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteAllProductsInCart = async (req, res) => {
  const cId = req.session.user.cartId;
  try {
    const cart = await findCartById(cId);
    cart.products = [];
    cart.save();
    res.status(200).send("Cart is now empty");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const finishPurchaseInCart = async (req, res) => {

  const cId = req.session.user.cartId;
  const buyer = req.session.user.email;

  try {
    const cart = await findCartById(cId);
    const cartPopulate = await cart.populate("products.productId");
    const products = cartPopulate.products;

    if (!products.length) {
      throw new Error(`Empty cart, no products to purchase`);
    }

    let totalAmount = 0;

    products.forEach((product) => {

      const pId = product.productId._id;

      let stockBefore = parseInt(product.productId.stock);
      let stockAfter = stockBefore - product.quantity;

      if (stockAfter >= 0) {
        totalAmount += product.productId.price * product.quantity;

        updateProduct(pId, { stock: stockAfter });

        deleteFromCart(cId, pId);

      } else {
        deleteFromCart(cId, pId);
        throw new Error(`Insufficient stock of item ${product.productId}`);
      }
    });

   if (totalAmount === 0) {
      res.status(401).send({
        message: `Purchase cancelled. Unable to complete the purchase due to insufficient stock.`,
        cart: cart,
      });
    } 

    const newTicket = await createTicket({
      total_amount: totalAmount,
      buyer_email: buyer,
    });

    const savedTicket = await newTicket.save();

    let message;

    const cartAfter = await findCartById(cId);
    message =
      cartAfter.products > 0
        ? `Purchase completed, excluding out-of-stock products.`
        : `Purchase completed successfully`;
    return res.status(200).send({
      message: message,
      invoice: savedTicket,
    });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred during the purchase",
      error: error.message,
    });
  }
};
