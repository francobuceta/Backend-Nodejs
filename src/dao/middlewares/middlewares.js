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
    let response;
    
    for (const elem of findCart[0].products) {
        if (elem.quantity <= elem.productId.stock) {
            let newStock = elem.productId.stock - elem.quantity;
            
            try {
                response = await productService.updateProduct(elem.productId._id, { stock: newStock });
                console.log(response);
            } catch (error) {
                console.log(error);
            }

            try {
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
        res.json({response});
        //next();
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
    const { email, firstName } = req.user;
    const purchaseData = req.body.purchaseInfo;

    let cuerpoCorreo = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Cyber Cube</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .title {
                font-size: 24px;
                margin-bottom: 20px;
                font-weight: bold;
            }
            .text {
                font-size: 18px;
                margin-bottom: 20px;
            }
            .product {
                padding: 10px;
                margin-bottom: 10px;
                display: flex;
            }
            .price {
                font-size: 24px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://res.cloudinary.com/dzm5lgpyv/image/upload/v1704984217/cyber%20cube%20backend%20ecommerce/cybercube_logo_ivjjnt.png" 
                    alt="Logo de la empresa" width="150" height="auto"
                >
            </div>
            
            <div class="title">
                ¡Hola ${firstName}!
            </div>
            
            <div class="text">
                Muchas gracias por realizar una compra en nuestro sitio web.
            </div>
            <div class="text">
                Por favor responde este mail para indicarnos si retiras
                por nuestro local o te llevamos a tu domicilio los siguientes productos:
            </div>
            <div class="product">
                <h3>${purchaseData.products}</h3>
            </div>
            <div class="text">
                El total de tu compra es de:
            </div>
            <div class="product price">
                <h3>$${purchaseData.amount / 100}</h3>
            </div>
        </div>
    </body>
</html>
    `;

    try {
        await transporter.sendMail({
            from: '"Cyber Cube" <cybercube_soporte@gmail.com>',
            to: email,
            subject: "Realizaste una nueva compra",
            html: cuerpoCorreo
        });
    } catch (error) {
        console.log(error);
    }
    next();
}