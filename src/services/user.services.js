import UserManager from "../dao/mongoManagers/userManager.js";

const userManager = new UserManager();

export const createUserService = async (email) => {
    const findUser = await userManager.createUser( email );
    return findUser;
}

export const loginUserService = async (email) => {
    const findUser = await userManager.loginUser( email );
    return findUser;
}