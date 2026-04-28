import mongoose from "mongoose";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 character"]
        },
        lastname: {
            type: String,
            minLength: [3, "First name must be at least 3 character"]
        }
    },

    email : {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    socketId: {
        type: String,
    },

    refreshToken : {
        type: String,
    }

}, {timestamps: true});


userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.isPasswordMatch = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", userSchema);

export default User;