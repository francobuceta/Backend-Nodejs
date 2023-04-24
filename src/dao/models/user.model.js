import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Carts"
        }
    },
    role: {
        type: String,
        default: "user"
    }
});

userSchema.pre("find", function (next) {
    this.populate("cart.cartId");
    next();
})

export const userModel = mongoose.model("users", userSchema);