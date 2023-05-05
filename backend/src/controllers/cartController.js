
import {
  findCartById,
  findCarts,
  deleteCart,
  updateCart,
} from "../services/cartService.js";

export const getCarts = async (req, res)=>{
  try {
    const carts = await findCarts()
    res.status(200).send(carts)
  } catch (error) {
    res.status(500).send(error);
    
  }
}

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
      const cart = await findCartById(cId);
      const prodsInCart = cart.products;
      const productFound = prodsInCart.find(
        (product) => product.productId == pId
      );
      if (!productFound) {
        throw new Error("Product not found");
      } else {
        const deletedProductArr = prodsInCart.filter(
          (product) => product.productId != pId
        );
        cart.products = deleteAllProductsInCart;
        cart.save();
        res.status(200).send(`Product [ID:${pId}] deleted successfully`);
      }
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

export const deleteCartById = async (req, res)=> {
  if (req.session.login) {
    const cId = req.session.user.cartId
    try {
      await deleteCart(cId)
      res.status(200).send(`Cart [ID:${cId}] deleted successfully`)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

