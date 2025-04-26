import userModel from "../models/user.model.js";

export const createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname){
        throw new Error("First name is required");
    }

    if(!email){
        throw new Error("Email is required and must be a valid email address");
    }

    if(!password){
        throw new Error("Password is required for the registering");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        }, 
        email,
        password: hashedPassword
    })

    return user;
}