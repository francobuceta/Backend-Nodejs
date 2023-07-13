import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import passport from "passport";
import { corsConfig } from "../dao/middlewares/middlewares.js";

class UserRouter {
        constructor() {
                this.router = Router();
                this.router.post("/register", userController.createUser);
                this.router.post("/login", userController.loginUser);
                this.router.get("/login/current", userController.loginCurrent);
                this.router.get("/logout", userController.logoutUser);
                this.router.get("/registroGithub", passport.authenticate("github", { scope: ["user:email"] }));
                this.router.get("/github", passport.authenticate("github", { session: false }), userController.loginGithub);
        }

        getRouter() {
                return this.router;
        }
}

export default new UserRouter();
