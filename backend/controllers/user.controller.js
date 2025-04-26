import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";

export const createUserController = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password
    })

    const token = await user.generateAuthToken();

    return res.status(201).json({ user, token })
}