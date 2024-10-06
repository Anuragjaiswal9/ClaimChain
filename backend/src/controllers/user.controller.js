import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from  "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    //get user data
    //check if all data is present or not
    //if all data is not present then send rsponse no ok
    //check if user already exists or not
    //if all data is present this send response ok
    //create user object and upload to db
    //remove passwrod and refreshtoken from response
    //check for user creation
    //return response

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

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong, Try again!");
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered")
    );

});

export { registerUser };