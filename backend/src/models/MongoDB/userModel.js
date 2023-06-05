import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  resetPassToken: {
    type: String,
    default: ""
  }
});

export const userModel = model("users", userSchema);
