import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { ApiError } from  "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/nodemailer.js";
import crypto from "crypto";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findOne(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken; //updating the refreshToken in that user data
        await user.save({validateBeforeSave: false}); //saving without validating because we know the user is valid
        
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}

const registerUser = asyncHandler(async(req, res) => {

    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ email: email });

    if(existingUser){
        if(!existingUser.isVerified){
            throw new ApiError(409, "Verification Email already sent");
        }    
        throw new ApiError(409, "User already exists");
    }
    
    const user = await User.create({
        fullName,
        email,
        password
    });

    const token = await Token.create({
        _id: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });
    
    const message = `${process.env.BASE_URL}/user/verify/${user._id}/${token.token}`;
    await sendEmail(user.email, message);

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({email: email});

    if(!user){
        throw new ApiError(404, "User does not exists");
    }

    if(user){
        if(!user.isVerified){
            throw new ApiError(401, "User is not verified");
        }
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid user credentials");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully"
    ));

});

const logoutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.body._id,
    {
        $set: {
            refreshToken: undefined
        }
    },{
        new: true,
    })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
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

    res.redirect("http://localhost:5173/email-verified");

});

//reset password

export { registerUser, verifyUser, loginUser, logoutUser };