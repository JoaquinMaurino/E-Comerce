import { getProducts } from "./productController.js";

export const chatView = async (req, res) => {
    try {
      res.render("chat")
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
export const loginView = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
export const registerView = async (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
export const productsView = async (req, res) => {
    try {
        const products = await getProducts()
        res.render("products", products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

