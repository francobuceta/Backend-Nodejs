import { userModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../../utils.js";

export default class UserManager {

    async createUser(user) {
        const { email, password } = user;
        try {
            const findUser = await userModel.find({ email });

            if (findUser.length === 0) {
                const hashNewPassword = await hashPassword(password);
                const newUser = {...user, password: hashNewPassword};
                await userModel.create(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async loginUser(user) {
        const {email, password} = user;

        try {
            const findUser = await userModel.findOne({ email });

            if(findUser) {
                const isPassword = await comparePassword(password, findUser.password);
        
                if (isPassword) {
                    return findUser;
                }
            } 
            return null;
        } catch (error) {
            
        }
    }
}
