import { Schema, model } from "mongoose";

const cartSchema = new Schema({
products: {
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}
});

export const cartModel = model("carts", cartSchema);
