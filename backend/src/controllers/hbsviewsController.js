import { json } from "express";
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
        const jsonProd = products.json()
        res.render("products", jsonProd);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

