import { createMessage, findMessages } from "../services/messageService.js";
import { io } from "../index.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await findMessages();
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { first_name, email } = req.session.user;
  try {
    const sentMessage = await createMessage({
      name: first_name,
      email,
      message,
    });
    const messages = await findMessages();
    io.emit("message", messages);
    res
      .status(200)
      .send({ user: sentMessage.email, message: sentMessage.message });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


