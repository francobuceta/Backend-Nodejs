import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

const createProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.random.alphaNumeric(5),
        stock: faker.random.numeric(2),
        category: faker.commerce.department(),
    }

    return product;
}

router.get("/", (req, res) => {
    const products = [];

    for (let i = 0; i <= 100; i++) {
        const product = createProducts();
        products.push(product);
    }

    res.send({ products });
});

export default router;