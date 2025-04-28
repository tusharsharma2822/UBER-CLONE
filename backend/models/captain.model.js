import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First Name must be atleast 3 Characters long"]
        },
        lastname: {
            type: String,
            minLength: [3, "Last Name must be atleast 3 Characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be atleast 5 Characters long"]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 Characters long"]
        }, 

        plate: {
            type: String,
            required: true,
            minLength: [3, "Plate number must be atleast 3 Characters long"]
        },

        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity of a cab must be atleast 1"]
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        }
    },

    location : {
        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        }
    }
})

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;