/* import {
    getCartByIdService,
    createCartService,
    addProductToCartService,
    updateCartProductsByArrayService,
    updateQuantityByQueryService,
    deleteProductInCartService,
    emptyCartService
} from "../services/cart.services.js"; */
import cartService from "../services/cart.services.js";

class CartController {

    getCartById = async (req, res) => {
        const { cid } = req.params;

        const findCart = await cartService.getCartById(cid);

        if (findCart) {
            res.json({ message: "Carrito encontrado", cart: findCart });
        } else {
            res.json({ message: "No se encontro el carrito" });
        }
    }

    createCart = async (req, res) => {
        const createCart = await cartService.createCart();
        res.json({ message: "Carrito creado con éxito", createCart });
    }

    addProductToCart = async (req, res) => {
        const { cid, pid } = req.params;

        const newCart = await cartService.addProductToCart(cid, pid);

        if (newCart) {
            res.json({ message: "Producto agregado con éxito", newCart });
        } else {
            res.json({ message: "Error al agregar producto al carrito" });
        }
    }

    updateCartProductsByArray = async (req, res) => {
        const { cid } = req.params;
        const { products } = req.body;
        const productsUpdated = await cartService.updateCartProductsByArray(cid, products);

        if (productsUpdated) {
            res.json({ mensaje: "Carrito actualizado con éxito", productsUpdated });
        }
        else {
            res.json({ mensaje: "Carrito no encontrado para actualizar" })
        }
    }

    updateQuantityByQuery = async (req, res) => {
        const { quantity } = req.body;
        const { cid, pid } = req.params;
        const updatedProduct = await cartService.updateQuantityByQuery(cid, pid, quantity);

        res.json(updatedProduct);
    }

    deleteProductInCart = async (req, res) => {
        const { cid, pid } = req.params;

        const deletedProduct = await cartService.deleteProductInCart(cid, pid);

        res.json({ message: "Producto eliminado con éxito", deletedProduct });
    }

    emptyCart = async (req, res) => {
        const { cid } = req.params;
        const cart = await cartService.emptyCart(cid);

        cart ? res.json({ message: "Carrito vaciado con éxito", cart })
            : res.json({ message: "Error al vaciar el carrito", cart })
    }
}

export default new CartController();





/* export const getCartByIdController = async (req, res) => {
    const { cid } = req.params;

    const findCart = await getCartByIdService(cid);

    if (findCart) {
        res.json({ message: "Carrito encontrado", cart: findCart });
    } else {
        res.json({ message: "No se encontro el carrito" });
    }
}

export const createCartController = async (req, res) => {
    const createCart = await createCartService();
    res.json({ message: "Carrito creado con éxito", createCart });
}

export const addProductToCartController = async (req, res) => {
    const { cid, pid } = req.params;

    const newCart = await addProductToCartService(cid, pid);

    if (newCart) {
        res.json({ message: "Producto agregado con éxito", newCart });
    } else {
        res.json({ message: "Error al agregar producto al carrito"});
    }
}

export const updateCartProductsByArrayController = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const productsUpdated = await updateCartProductsByArrayService(cid, products);
    
    if (productsUpdated) {
        res.json({mensaje: "Carrito actualizado con éxito", productsUpdated});
    }
    else {
        res.json({ mensaje: "Carrito no encontrado para actualizar" })
    }
}

export const updateQuantityByQueryController = async (req, res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const updatedProduct = await updateQuantityByQueryService(cid, pid, quantity);

    res.json(updatedProduct);
}

export const deleteProductInCartController = async (req, res) => {
    const { cid, pid } = req.params;

    const deletedProduct = await deleteProductInCartService(cid, pid);

    res.json({ message: "Producto eliminado con éxito", deletedProduct });
}

export const emptyCartController = async (req, res) => {
    const { cid } = req.params;
    const cart = await emptyCartService(cid);

    cart ? res.json({ message: "Carrito vaciado con éxito", cart })
    : res.json({ message: "Error al vaciar el carrito", cart })
} */