import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

const createProducts = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.datatype.string(5),
        stock: faker.datatype.number({ max: 100 }),
        category: faker.commerce.department(),
    }
}

router.get("/mockingproducts", (req, res) => {

})