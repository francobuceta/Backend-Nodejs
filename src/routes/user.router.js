import { Router } from "express";
import { createUserController, 
        loginUserController, 
        logoutUserController,
        loginGithubController, 
        loginCurrent } from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();


router.post("/register", createUserController);

router.post("/login", loginUserController);

router.get("/login/current", loginCurrent);

router.get("/logout", logoutUserController);

router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] }));

router.get("/github", passport.authenticate("github", {session: false}), loginGithubController);

export default router;