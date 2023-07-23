import {Schema, model} from 'mongoose'

const ticketSchema = new Schema({
    code: {
        type: Number, 
        unique: true,
        index: true, 
        required: true, 
        default: ()=>{return new Date().valueOf()}
    },
    purhcase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    buyer_email: {
        type: String,
        required: true
    }
})

export const ticketModel = model('tickets', ticketSchema)