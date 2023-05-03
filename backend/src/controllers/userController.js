import {
  findUsers,
  findUserById,
} from "../services/userService.js";

export const getUsers = async (req, res) => {
  //Aca van los paramtros ej. limite, etc.
  try {
    const users = await findUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const getUserById = async (req, res) => {
  //Aca van los paramtros ej. limite, etc.
  try {
    const users = await findUserById();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

