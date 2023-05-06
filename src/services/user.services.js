import UserManager from "../dao/mongoManagers/userManager.js";
import { hashPassword, comparePassword } from "../utils.js";
import cartService from "./cart.services.js";
import UserRespDto from "../dao/dto/user.dto.js";

const userManager = new UserManager();

class UserService {

    constructor(dao) {
        this.dao = dao;
    }
    
    //Se crea el usuario si no existe y se le asigna la contraseña hasheada y un carrito
    createUser = async (user) => {
        const { email, password } = user;

        try {
            const findUser = await this.dao.findUser({ email });

            if (!findUser) {
                const hashNewPassword = await hashPassword(password);
                const newCart = await cartService.createCart({});
                const newUser = { ...user, password: hashNewPassword, cart: { cartId: newCart._id } };
                await this.dao.createUser(newUser);
                return newUser;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    };

    loginUser = async (user) => {
        const { email, password } = user;

        try {
            const findUser = await this.dao.findUser({ email });

            if (findUser) {
                const isPassword = await comparePassword(password, findUser.password);

                if (isPassword) {
                    const userRespDto = new UserRespDto(findUser);
                    return userRespDto;
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
}

export default new UserService(userManager);
