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
                    name: ErrorsName.USER_DATA_INCOMPLETE,
                    message: ErrorsMessage.USER_DATA_INCOMPLETE,
                    cause: ErrorsCause.USER_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async findUser(email) {
        try {
            const findUser = await userModel.findOne(email);

            if (findUser) {
                return findUser;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.USER_DATA_INCOMPLETE,
                    message: ErrorsMessage.USER_DATA_INCOMPLETE,
                    cause: ErrorsCause.USER_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }
}
