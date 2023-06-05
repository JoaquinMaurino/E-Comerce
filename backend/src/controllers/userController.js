import {
  findUsers,
  findUserById,
  deleteUser,
  updateUser,
  findUserByEmail,
  findUserByToken,
} from "../services/userService.js";
import { createCryptPass } from "../utils/bcrypt.js";

import nodemailer from "nodemailer";


export const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const uId = req.params.userId;
    await deleteUser(uId);
    res.status(200).send(`User [ID:${uId}] deleted successfully`);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const updateUserById = async (req, res) => {
  try {
    const uId = req.params.userId;
    const data = req.body;
    await updateUser(uId, data);
    res.status(200).send(`User [ID:${uId}] updated successfully`);
  } catch (error) {
    res.status(500).send(error);
  }
};

let transporter = nodemailer.createTransport({
  //genero la forma de enviar info desde el mail (gmail)
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "joacoderhouse@gmail.com",
    pass: "iimdddrbzibybwom",
    authMetod: "LOGIN",
  },
});

export const sendEmail = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send({ message: "Username is required" });
  }
  try {
    const user = await findUserByEmail(username);
    const token = Date.now();
    user.resetPassToken = token;
    user.save();
    await transporter.sendMail({
      from: "joacoderhouse@gmail.com",
      to: `${user.email}`,
      subject: "Restore your password",
      html: `
      <a href="http://localhost:5000/restorePassword">Click here to restore your password</a>
      `,
      attachments: [],
    });
    res.cookie("resetToken", token);
    res.redirect("/emailSentView");
    console.log("email sent");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const restorePassword = async (req, res) => {
  try {
    const {resetToken}  = req.cookies;
    const {newPassword}  = req.body;

    console.log(resetToken);
    console.log(newPassword);

    //Check if token is expired:
    const validateToken = (resetToken) => {
      const tokenTimestamp = parseInt(resetToken);
      //Current date:
      const currentTimestamp = new Date().getTime()
      const timeDiff = currentTimestamp - tokenTimestamp;
      const hourDiff = timeDiff / (1000 * 60 * 60);
      return hourDiff <= 1
    };
    if (!validateToken) {
      res.status(400).send("Token expired");
    }
    //Look for user in DB by token
    const user = await findUserByToken(resetToken);
    console.log(user);
    if (!user) {
      res.status(400).send("User not found");
    }
    const cryptedPassword = createCryptPass(newPassword);
    await updateUser(user.id, { password: cryptedPassword });
    console.log("user password updated");
    res.redirect("/successView");
  } catch (error) {
    res.status(500).send(error);
  }
};