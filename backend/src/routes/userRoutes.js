import { Router } from "express";
import { getUsers, getUserById, deleteUserById, updateUserById,newUser } from "../controllers/userController.js";

const routerUser = Router();

routerUser.get("/", getUsers);
routerUser.post("/", newUser);
routerUser.get("/:id", getUserById);
routerUser.put("/:userId", updateUserById);
routerUser.delete("/:userId", deleteUserById);

export default routerUser;
