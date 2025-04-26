import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minLength: [3, "First Name must be atleast 3 Characters long"]
        },

        lastname:{
            type: String,
            minLength: [3, 'Last name must be atleast 3 Characters long']
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be atleast 5 Characters Long"]
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    }
})

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'});
}

const userModel = mongoose.model("user", userSchema);

export default userModel;