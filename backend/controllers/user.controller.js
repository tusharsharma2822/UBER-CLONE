import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import redisClient from "../services/redis.service.js";

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

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        return res.status(401).json({ message: "Invalid email or password"})
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password"})
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({ user, token });
}

export const getUserProfileController = async (req, res) => {
    return res.status(200).json(req.user);
}

export const logoutUserController = async (req, res) => {
    try {
        
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        redisClient.set(token, "logout", "EX", 60*60*24);

        return res.status(200).json({ message: "User Logout Successfully"});

    } catch (err) {
        return res.status(400).send(err.message);
    }
}