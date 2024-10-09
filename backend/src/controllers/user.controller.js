import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { ApiError } from  "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/nodemailer.js";
import crypto from "crypto";

const registerUser = asyncHandler(async(req, res) => {

    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email: email });

    if(existingUser){
        throw new ApiError(409, "User already exists");
    }
    
    const user = await User.create({
        fullName,
        email,
        password
    });

    //create token and save in tokenSchema
    const token = await Token.create({
        _id: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });
    
    const message = `${process.env.BASE_URL}/user/verify/${user._id}/${token.token}`;
    await sendEmail(user.email, message);

    //use nodemailer for email verification then create user

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong, Try again!");
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "Verification email sent to your email, please verify")
    );

});

const verifyUser = asyncHandler(async (req, res) => {
    const {id, token} = req.params;

    const user = await User.findOne({_id: id});
    if(!user){
        throw new ApiError(401, "invalid link")
    }

    const verificatoinToken = await Token.findOne({token: token});
    if(!verificatoinToken){
        throw new ApiError(401, "Invalid link, Try again");
    }
    
    await User.updateOne({ _id: id }, { isVerified: true });
    
    const updatedUser = await User.findOne({_id: id});

    if(!updatedUser.isVerified){
        await User.findByIdAndDelete({_id: id});
        throw new ApiError(410, "User account has been deleted due to unverified email");
    }

    await Token.findByIdAndDelete({_id: id});

    res.status(200, "Email verified successfully");
})

export { registerUser, verifyUser };