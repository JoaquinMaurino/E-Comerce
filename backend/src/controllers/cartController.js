import {
  findCartById,
  updateCart,
  deleteFromCart,
} from "../services/cartService.js";
import { createTicket } from "../services/ticketService.js";
import { updateProduct } from "../services/productService.js";

export const getCartById = async (req, res) => {
  if (req.session.login) {
    const cId = req.session.user.cartId;
    try {
      const cart = await findCartById(cId);
      const cartPopulate = await cart.populate("products.productId");
      res.status(200).send(cartPopulate);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const addToCart = async (req, res) => {
  if (req.session.login) {
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
      res.status(200).send("Product successfully added");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const updateAllCartProducts = async (req, res) => {
  if (req.session.login) {
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
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const updateProductQuantity = async (req, res) => {
  if (req.session.login) {
    const cId = req.session.user.cartId;
    const pId = req.params.prodId;
    const newQuantity = req.body;
    try {
      const cart = await findCartById(cId);
      const prodsInCart = cart.products;
      const productFound = prodsInCart.find(
        (product) => product.productId == pId
      );
      if (!productFound) {
        throw new Error("Product not found");
      } else {
        productFound.quantity = newQuantity;
        res
          .status(200)
          .send(`Product [ID:${pId}]quantity updated successfully`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const deleteProductInCart = async (req, res) => {
  if (req.session.login) {
    const cId = req.session.user.cartId;
    const pId = req.params.prodId;
    try {
      await deleteFromCart(cId, pId);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const deleteAllProductsInCart = async (req, res) => {
  if (req.session.login) {
    const cId = req.session.user.cartId;
    try {
      const cart = await findCartById(cId);
      cart.products = [];
      cart.save();
      res.status(200).send("Cart is now empty");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(401).send("No session active, you must log in");
  }
};

export const finishPurchaseInCart = async (req, res) => {
  if (req.session.login) {
    const cId = req.session.user.cartId;
    const buyer = req.session.user.email;
    try {
      const cart = await findCartById(cId);
      const cartPopulate = await cart.populate("products.productId");
      const products = cartPopulate.products;
      if (!products) {
        throw new Error(`Empty cart, add products to purchase`);
      }
      let totalAmount = 0;
      products.forEach((product) => {
        let stockBefore = product.productId.stock;
        let stockAfter = stockBefore - product.quantity;
        const pId = product.productId._id;
        if (stockAfter >= 0) {
          totalAmount += product.productId.price * product.quantity;
          updateProduct(pId, { stock: stockAfter });
          deleteFromCart(cId, pId);
        } else {
          throw new Error(
            `Insufficient stock of item ${product.productId.name}`
          );
        }
      });
      if (totalAmount === 0) {
        res.status(200).send({
          message: `Unable to complete the purchase due to insufficient stock.`,
          cart: cart,
        });
      }
      const newTicket = await createTicket({
        total_amount: totalAmount,
        buyer_email: buyer,
      });
      await newTicket.save();
      let message;
      const cartAfter = await findCartById(cId);
      message =
        cartAfter.products > 0
          ? `Purchase completed, excluding out-of-stock products.`
          : `Purchase completed successfully`;
      return res.status(200).send({
        message: message,
        invoice: newTicket,
      });
    } catch (error) {
      res
        .status(500)
        .send({
          message: "An error occurred during the purchase",
          error: error.message,
        });
    }
  } else {
    res.status(401).send({
      message: `No session active, must be loged in to purchase`,
    });
  }
};
