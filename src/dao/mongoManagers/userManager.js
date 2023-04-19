import { userModel } from "../models/user.model.js";

export default class UserManager {

    async createUser(user) {
        try {
            return await userModel.create(user);
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
