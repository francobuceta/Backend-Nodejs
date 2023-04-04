import mongoose from "mongoose";
import config from "../config/config.js"

try {
    await mongoose.connect(config.MONGO_URL);
    console.log("Conectado a la base de datos con éxito");
} catch (error) {
    console.log(error);
}
