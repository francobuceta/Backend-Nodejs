import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
});

export const cartModel = mongoose.model("Carts", cartSchema);