import UserManager from "../dao/mongoManagers/userManager.js";
import { hashPassword, comparePassword } from "../utils.js";
import cartService from "./cart.services.js";
import UserRespDto from "../dao/dto/user.dto.js";

const userManager = new UserManager();

//Se crea el usuario si no existe y se le asigna la contraseña hasheada y un carrito
export const createUserService = async (user) => {
    const { email, password } = user;

    try {
        const findUser = await userManager.findUser({ email });

        if (!findUser) {
            const hashNewPassword = await hashPassword(password);
            const newCart = await cartService.createCart({});
            const newUser = { ...user, password: hashNewPassword, cart: {cartId: newCart._id} };
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
                    const userRespDto = new UserRespDto(findUser);
                    return userRespDto;
                }
            } 
            return null;
        } catch (error) {
            console.log(error);
        }
};
