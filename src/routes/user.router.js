import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();


router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/login/current", userController.loginCurrent);

router.get("/logout", userController.logoutUser);

router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] }));

router.get("/github", passport.authenticate("github", {session: false}), userController.loginGithub);

export default router;