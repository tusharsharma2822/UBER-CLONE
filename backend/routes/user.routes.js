import { Router } from "express";
import * as userController from "../controllers/user.controller.js"
import { body } from "express-validator";

const router = Router();

router.post("/register", [
    body("email").isEmail().withMessage("Email must be a valid address"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 characters long")
],
    userController.createUserController
)

export default router;