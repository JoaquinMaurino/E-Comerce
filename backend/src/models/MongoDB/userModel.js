import {Schema, Schemma, model} from 'mongoose'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    idCart: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    }
})

export const userModel = model("users", userSchema)
