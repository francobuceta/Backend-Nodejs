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
    let amount = 0;

    const findCart = await getCartByIdService(cid);
    
    findCart[0].products.map(async (elem) => {
        if (elem.quantity <= elem.productId.stock) {
            amount += elem.productId.price;
            let newStock = elem.productId.stock - elem.quantity;
            await updateProductService(elem.productId._id, { stock: newStock });
        } else {
            res.send(`Los siguientes productos superan el stock disponible: ${elem.productId.title}`)
        }
    });
    res.locals.data = amount;
    next();
}