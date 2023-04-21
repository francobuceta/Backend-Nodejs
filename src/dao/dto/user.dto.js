//DTO para responder con datos no sensibles del usuario
export default class UserRespDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.age = user.age;
    }
}