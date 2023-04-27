import cartService from "../../services/cart.services.js";
import productService from "../../services/products.services.js";

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
    let noStockProducts = "Los siguientes productos superan el stock disponible:";
    let amount = 0;

    const findCart = await cartService.getCartById(cid);
    
    findCart[0].products.map(async (elem) => {
        if (elem.quantity <= elem.productId.stock) {
            amount += elem.productId.price;
            let newStock = elem.productId.stock - elem.quantity;
            
            await productService.updateProduct(elem.productId._id, { stock: newStock });
            await productService.deleteProductInCart(cid, elem.productId._id);
        } else {
            noStockProducts += ` ${elem.productId.title}`;
        }
    });
    res.locals.data = amount;
    res.send(noStockProducts);
    next();
}