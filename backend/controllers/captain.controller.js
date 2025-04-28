import captainModel from "../models/captain.model.js";
import * as captainService from "../services/captain.service.js"
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createCaptainController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle} = req.body;

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = await captain.generateAuthToken();

    return res.status(201).json({captain, token});
}

export const captainLoginController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain){
        return res.status(401).json({ message: "Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password "});
    }

    const token = await captain.generateAuthToken();

    return res.status(200).json({ captain, token });
}

export const captainProfileController = async (req, res) => {
    return res.status(200).json(req.captain);
}

export const captainLogoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        
        redisClient.set(token, "logout", "EX", 60*60*24);

        return res.status(200).json({message: "Captain Logout Successfully"});
    } catch (err) {
        return res.status(400).send(err.message);
    }
}