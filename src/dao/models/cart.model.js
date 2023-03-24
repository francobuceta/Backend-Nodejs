import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },

            quantity: Number,
            
        }
    ]
});

cartSchema.pre("find", function (next) {
    this.populate("products.productId");
    next();
})

export const cartModel = mongoose.model("Carts", cartSchema);