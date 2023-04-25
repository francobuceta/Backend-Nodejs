import { getCartByIdService } from "../../services/cart.services.js";
import { updateProductService } from "../../services/products.services.js";

export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export const isUser = (req, res, next) => {
    if (req.user.role === 'user') {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export const discountStock = async (req, res, next) => {
    const { cid } = req.params;

    const findCart = await getCartByIdService(cid);
    
    findCart[0].products.map(async (elem) => {
        if (elem.quantity <= elem.productId.stock) {
            let newStock = elem.productId.stock - elem.quantity;
            await updateProductService(elem.productId._id, { stock: newStock });
        } else {
            res.send(`Los siguientes productos superan el stock disponible: ${elem.productId.title}`)
        }
    });
    next();
}