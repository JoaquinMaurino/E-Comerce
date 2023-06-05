import {
  findUsers,
  findUserById,
  deleteUser,
  updateUser,
  findUserByEmail,
  findUserByToken
} from "../services/userService.js";
import { createCryptPass } from "../utils/bcrypt.js";


import nodemailer from 'nodemailer'

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
    const id = req.params.id
    const user = await findUserById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUserById = async (req, res)=>{
  try {
    const uId = req.params.userId
    await deleteUser(uId)
    res.status(200).send(`User [ID:${uId}] deleted successfully`)
  } catch (error) {
    res.status(500).send(error)
    
  }
}
export const updateUserById = async (req, res)=>{
  try {
    const uId = req.params.userId
    const data = req.body
    await updateUser(uId, data)
    res.status(200).send(`User [ID:${uId}] updated successfully`)

  } catch (error) {
    res.status(500).send(error)
    
  }
}


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

export const sendEmail = async (req, res)=>{
  const {username} = req.body
  if(!username){
   return res.status(400).send({message: "Username is required"})
  }
  try {
    const user = await findUserByEmail(username)
    const token = Date.now()
    user.resetPassToken = token
    user.save()
    await transporter.sendMail({
      from: 'joacoderhouse@gmail.com',
      to: `${user.email}`,
      subject: 'Restore your password',
      html: `
      http://localhost:5000/restorePassword/${token}
      `,
      attachments: []
  })
  res.redirect("/emailSentView")
  console.log("email sent");
  } catch (error) {
   res.status(500).send(error);
  }
 }

 export const restorePassword = async (req, res)=>{
  try {
    const urlToken = req.params.token
    const {newPassword} = req.body
    const user = await findUserByToken(urlToken)
    console.log(user);
    console.log(newPassword);
    
  } catch (error) {
   res.status(500).send(error);
  }
}
/*   urlToken = req.params.token
  console.log(urlToken);
  const {newPassword} = req.body
  const newEncryptedPassword = createCryptPass(newPassword)
  const user = await findUserByToken(urlToken)
  console.log(user);
  if (user) {
    uId = user.id
    await updateUser(uId, {password: newEncryptedPassword})
    user.save()
    res.redirect("/successView")
  }else{
    res.redirect("/errorView")
  } */