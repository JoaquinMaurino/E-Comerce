import { cartModel } from "../models/MongoDB/cartModel.js";

export const createCart = async (cart) => {
  try {
    const newCart = await cartModel(cart);
    await newCart.save();
    return newCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const findCarts = async () => {
  try {
    const carts = await cartModel.find();
    return carts;
  } catch (error) {
    throw new Error(error);
  }
};

export const findCartById = async (id) => {
  try {
    const cart = await cartModel.findById(id);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, data) => {
  try {
    return await cartModel.findByIdAndUpdate(id, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCart = async (id) => {
  try {
    return await cartModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFromCart = async (cartId, prodId) => {
  try {
    const cart = await cartModel.findById(cartId);
    const prodsInCart = cart.products;
    const productFound = prodsInCart.find(
      (product) => product.productId == prodId
    );
    if (!productFound) {
      throw new Error("Product not found");
    } else {
      const deletedProductArr = prodsInCart.filter(
        (product) => product.productId != pId
      );
      cart.products = deletedProductArr;
      cart.save();
      return true;
    }
  } catch (error) {
    throw new Error(error);
  }
};
