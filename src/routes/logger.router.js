import { Router } from "express";
import logger from "../winston.js";

const router = Router();

router.get("/", (req, res) => {
    logger.debug("debug");
    logger.http("http");
    logger.info("info");
    logger.warning("warning");
    logger.error("error");
    logger.fatal("fatal");

    res.send("Finalizado");
});

export default router;