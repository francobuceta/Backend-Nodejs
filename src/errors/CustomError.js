//Manejo de errores
class CustomError {
    createCustomError({ name="Error", cause, message }) {
        const newError = new Error(message, {cause});
        newError.name = name;
        throw newError;
    }
}   

export default new CustomError();