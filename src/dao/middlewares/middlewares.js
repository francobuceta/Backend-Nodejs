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

    const findCart = await cartService.getCartById(cid);
    
    for (const elem of findCart[0].products) {
        if (elem.quantity <= elem.productId.stock) {
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

    if(noStockProducts.length > 0) {
        const errorMessage = "Los siguientes productos superan el stock disponible: " + noStockProducts.join(", ");
        res.send(errorMessage);
    } else {
        next();
    }
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
            from: '"Cyber Cube" <cybercube_soporte@gmail.com>',
            to: email,
            subject: "Realizaste una nueva compra",
            text: "Realizaste una nueva compraaa"
        });
    } catch (error) {
        console.log(error);
    }
    next();
}