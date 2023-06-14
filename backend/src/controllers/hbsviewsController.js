import { findProducts } from "../services/productService.js";

export const chatView = async (req, res) => {
  try {
    res.render("chat");
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
    const products = await findProducts();
    res.render("products", products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const passwordView = async (req, res) => {
  try {
    res.render("password");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



export const emailSentView = async (req, res) => {
  try {
    res.render("emailSent");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const successView = async (req, res) => {
  try {
    res.render("success");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const sendEmailView = async (req, res) => {
  try {
    res.render("sendEmailForm");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};