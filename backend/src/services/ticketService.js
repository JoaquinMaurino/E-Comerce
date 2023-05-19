import { ticketModel } from "../models/MongoDB/ticketModel.js";

export const createTicket = async (ticket)=>{
    try {
        const newTicket = await ticketModel(ticket)
        newTicket.save()
        return newTicket
    } catch (error) {
        throw new Error(error)
    }
}
export const findByCode = async (code)=>{
    try {
        const ticket = await ticketModel.findOne({code: code})
        return ticket
    } catch (error) {
        throw new Error(error)
    }
}
export const findeByBuyerEmail = async (userEmail)=>{
    try {
        const tickets = await ticketModel.find({buyer_email: userEmail})
        return tickets
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteTicket = async (id)=>{
    try {
        await ticketModel.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error)
    }
}