import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            default: [],
        }
    ],
});

cartSchema.pre("find", function(next) {
    this.populate("products");
    next();
}
)

export const cartModel = mongoose.model("Carts", cartSchema);