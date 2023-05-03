import { userModel } from "../models/MongoDB/userModel.js";

//Genero la accion, no el metodo
export const findUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};
export const findUserById = async (id) => {
  try {
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
export const findUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
export const createUser = async (user) => {
    //Manejo de errores antes de enviar a la BDD
  try {
    const newUser = await userModel(user);
    await newUser.save()
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};
