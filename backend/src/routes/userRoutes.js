import { Router } from "express";
import { getUsers, getUserById, postUser, deleteUserById, updateUserById } from "../controllers/userController.js";

const routerUser = Router();

routerUser.get("/", getUsers);
routerUser.get("/:id", getUserById);
routerUser.post("/", postUser);
routerUser.put("/:userId", updateUserById);
routerUser.delete("/:userId", deleteUserById);

export default routerUser;
