import app from "./src/app.js";
import config from "./src/config/config.js";

//HTTP server
const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
});