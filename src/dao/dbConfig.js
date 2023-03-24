import mongoose from "mongoose";

export const URL = "mongodb+srv://francobuceta95:homero@cluster0.otuuqv4.mongodb.net/ecommerce?retryWrites=true&w=majority";

try {
    await mongoose.connect(URL);
    console.log("Conectado a la base de datos con éxito");
} catch (error) {
    console.log(error);
}
