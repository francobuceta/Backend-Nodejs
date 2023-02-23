import mongoose from "mongoose";

const URI = "mongodb+srv://francobuceta95:homero@cluster0.otuuqv4.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(URI, (error) => {
    if (error) {
        console.log("Hubo un error al conectar con base de datos");
    } else {
        console.log("Conectado a la base de datos con éxito");
    }
});