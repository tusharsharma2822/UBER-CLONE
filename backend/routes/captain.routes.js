import { Router } from "express";
import * as captainController from "../controllers/captain.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", [
    body("email").isEmail().withMessage("Email must be a valid address"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First Name must be atleast 3 Characters Long"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 Characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be atleast 3 Character Long"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be atleast 3 Characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity of a vehicle must be atleast 1"),
    body("vehicle.vehicleType").isIn(["auto", "car", "bike"]).withMessage("Invalid Vehicle Type")
],
    captainController.createCaptainController
);

router.post("/login",[
    body("email").isEmail().withMessage("Email must be a valid address"),
    body("password").isLength({ min: 3 }).withMessage("Password must be atleast 3 Character long")
],
    captainController.captainLoginController
);

router.get("/profile",
    authMiddleware.authCaptain,
    captainController.captainProfileController
);

router.get("/logout", 
    authMiddleware.authCaptain,
    captainController.captainLogoutController
)

export default router;