import { createUser } from "../services/userService.js";



export const registertUsers = async (req, res) => {
    try {
      const users = await createUser();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };
export const logintUsers = async (req, res) => {
    try {
      const users = await createUser();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };