//DTO para responder con datos no sensibles del usuario
export default class UserRespDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.cart = user.cart;
        this.role = user.role;
    }
}