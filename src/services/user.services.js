import UserManager from "../dao/mongoManagers/userManager.js";
import { hashPassword, comparePassword } from "../utils.js";

const userManager = new UserManager();

export const createUserService = async (user) => {
    const { email, password } = user;

    try {
        const findUser = await userManager.findUser({ email });

        if (!findUser) {
            const hashNewPassword = await hashPassword(password);
            const newUser = { ...user, password: hashNewPassword };
            await userManager.createUser(newUser);
            return newUser;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const loginUserService = async (user) => {
    const {email, password} = user;

        try {
            const findUser = await userManager.findUser({ email });

            if(findUser) {
                const isPassword = await comparePassword(password, findUser.password);
        
                if (isPassword) {
                    return findUser;
                }
            } 
            return null;
        } catch (error) {
            console.log(error);
        }
};
