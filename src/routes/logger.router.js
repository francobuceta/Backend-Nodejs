import { Router } from "express";
import logger from "../winston.js";

const router = Router();

router.get("/", (req, res) => {
    logger.info("log info");
    res.send("listo");
});

export default router;