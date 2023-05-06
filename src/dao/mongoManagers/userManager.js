import { userModel } from "../models/user.model.js";
import UserRespDto from "../dto/user.dto.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsName, ErrorsCause, ErrorsMessage } from "../../errors/errors.enum.js";

export default class UserManager {

    async createUser(user) {
        try {
            const newUser = await userModel.create(user);

            if (newUser) {
                const userRespDto = new UserRespDto(newUser);
                return userRespDto;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async findUser(email) {
        const findUser = await userModel.findOne(email);
        return findUser;
    }
}
