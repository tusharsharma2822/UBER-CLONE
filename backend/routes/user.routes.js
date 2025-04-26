import { Router } from "express";
import * as userController from "../controllers/user.controller.js"
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", [
    body("email").isEmail().withMessage("Email must be a valid address"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long")
],
    userController.createUserController
)

router.post("/login", [
    body("email").isEmail().withMessage("Email must be a valid address"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long")
],
    userController.loginUserController
)

router.get("/profile",
    authMiddleware.authUser,
    userController.getUserProfileController
)

router.get("/logout", 
    authMiddleware.authUser,
    userController.logoutUserController
)

export default router;