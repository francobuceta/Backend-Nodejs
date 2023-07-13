import cartService from "../../services/cart.services.js";
import productService from "../../services/products.services.js";
import config from "../../config/config.js";
import { transporter } from "../../utils.js";

export const isAdmin = (req, res, next) => {
    if (req.user.email === config.ADMIN_KEY) {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export const isUser = (req, res, next) => {
    if (req.user.role === config.USER_KEY) {
        return next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

export const discountStock = async (req, res, next) => {
    const { cid } = req.params;
    let noStockProducts = [];
    let amount = 0;

    const findCart = await cartService.getCartById(cid);
    
    for (const elem of findCart[0].products) {
        if (elem.quantity <= elem.productId.stock) {
            amount += elem.productId.price * elem.quantity;
            let newStock = elem.productId.stock - elem.quantity;

            try {
                await productService.updateProduct(elem.productId._id, { stock: newStock });
                await cartService.deleteProductInCart(cid, elem.productId._id);
            } catch (error) {
                console.log(error);
            }

        } else {
            noStockProducts.push(elem.productId.title);
        }
    }

    res.locals.data = amount;
    if(noStockProducts.length > 0) {
        const errorMessage = "Los siguientes productos superan el stock disponible: " + noStockProducts.join(", ");
        res.send(errorMessage);
    } else {
        res.send("Compra realizada correctamente");
    }
    next();
}

//Middleware para manejo de errores
export const errorMiddleware = (error, req, res, next) => {
    res.send({
        status: error.name,
        message: error.message,
        cause: error.cause
    });
}

//Envío de email con nodemailer
export const sendEmail = async (req, res, next) => {
    const { email } = req.user;
    try {
        await transporter.sendMail({
            from: "E-commerce",
            to: email,
            subject: "Nueva Compra",
            text: "Realizaste una nueva compra"
        });
    } catch (error) {
        console.log(error);
    }
    next();
}