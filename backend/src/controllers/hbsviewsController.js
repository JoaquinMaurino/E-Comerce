import nodemailer from 'nodemailer'
import { getProducts } from "./productController.js";

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
    const products = await getProducts();
    const jsonProd = products.json();
    res.render("products", jsonProd);
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


let transporter = nodemailer.createTransport({  //genero la forma de enviar info desde el mail (gmail)
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user:'joacoderhouse@gmail.com',
      pass: 'iimdddrbzibybwom',
      authMetod: 'LOGIN'
  }
})
export const emailSentView = async (req, res) => {
  try {
    await transporter.sendMail({
      from: 'joacoderhouse@gmail.com',
      to: 'joaquin9918@gmail.com',
      subject: 'Restore your password',
      html: `
      http://localhost:5000/restorePassword
      `,
      attachments: []
  })
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