import { userModel } from "../models/user.model.js";
import UserRespDto from "../dto/user.dto.js";

export default class UserManager {

    async createUser(user) {
        try {
            const newUser = await userModel.create(user);
            const userRespDto = new UserRespDto(newUser);
            return userRespDto;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async findUser(email) {
        const findUser = await userModel.findOne(email);
        return findUser;
    }
}
