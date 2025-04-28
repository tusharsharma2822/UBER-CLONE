import captainModel from "../models/captain.model.js"

export const createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType    
}) => {

    if(!firstname){
        throw new Error("First Name is required");
    }
    
    if(!email){
        throw new Error("Email must be a valid Email Address");
    }

    if(!password){
        throw new Error("Password is mandatory for registering");
    }

    if(!color){
        throw new Error("Color of a car should be clear");
    }

    if(!plate){
        throw new Error("Plate number should be valid");
    }

    if(!capacity){
        throw new Error("Capacity should be atleast 1");
    }

    if(!vehicleType){
        throw new Error("Vehicle Type should be clear");
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}