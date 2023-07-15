import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import passport from "passport";

class UserRouter {
        constructor() {
                this.router = Router();
                this.router.post("/register", userController.createUser);
                this.router.post("/login", userController.loginUser);
                this.router.get("/logout", userController.logoutUser);
                this.router.get("/registroGithub", passport.authenticate("github", { scope: ["user:email"] }));
                this.router.get("/github", passport.authenticate("github", { session: false }), userController.loginGithub);
                this.router.get("/registroGoogle", passport.authenticate("google", { scope: ["profile","email"] }));
                this.router.get("/google", passport.authenticate("google", {session: false}), userController.loginGoogle);
        }

        getRouter() {
                return this.router;
        }
}

export default new UserRouter();
