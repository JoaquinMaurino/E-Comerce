import { messageModel } from "../models/MongoDB/messageModel.js";

export const createMessage = async (message)=>{
    try {
        const newMessage = await messageModel(message)
        newMessage.save()
        return newMessage
    } catch (error) {
        throw new Error(error)
    }
}

export const findMessages = async ()=>{
    try {
        return await messageModel.find()
    } catch (error) {
        throw new Error(error)
        
    }
}