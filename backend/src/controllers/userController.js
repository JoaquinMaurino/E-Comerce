import {
  findUsers,
  findUserById,
  createUser,
  deleteUser,
  updateUser
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
  try {
    const id = req.params.id
    const user = await findUserById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const postUser = async (req, res)=>{
  try {
    const newUser = await createUser(req.body)
    res.status(200).send(`New user created successfully: ${newUser} `)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

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

