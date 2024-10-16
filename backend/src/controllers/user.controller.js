import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/nodemailer.js";
import crypto from "crypto";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken; //updating the refreshToken in that user data
    await user.save({ validateBeforeSave: false }); //saving without validating because we know the user is valid

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    if (!existingUser.isVerified) {
      throw new ApiError(409, "Verification Email already sent");
    }
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
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

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong, Try again!");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "Verification email sent to your email, please verify"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  if (user) {
    if (!user.isVerified) {
      throw new ApiError(401, "User is not verified");
    }
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.body._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(401, "invalid link");
  }

  const verificatoinToken = await Token.findOne({ token: token });
  if (!verificatoinToken) {
    throw new ApiError(401, "Invalid link, Try again");
  }

  await User.updateOne({ _id: id }, { isVerified: true });

  res.redirect("http://localhost:5173/Email-Verified");
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "USer doesnot exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User data sent successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;

  // Check if user exists
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const fullName = req?.body?.fullName;
  
  // Ensure avatar files exist before accessing the array index
  const avatarLocalPath = req?.files?.avatar?.length > 0 ? req.files.avatar[0].path : null;

  // Check if there's anything to update
  if (!fullName && !avatarLocalPath) {
    return res.status(400).json(
      new ApiResponse(400, null, "Nothing to change")
    );
  }

  console.log(avatarLocalPath)

  let avatar;
  if (avatarLocalPath) {
    // If avatar is provided, upload it to Cloudinary
    avatar = await uploadOnCloudinary(avatarLocalPath);
  }
  console.log(avatar);

  // Object to store update fields
  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (avatar) updateFields.avatar = avatar.url;

  // Update only if there are fields to update
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: updateFields },
    { new: true } // Return the updated document
  ).select("-password -refreshToken");

  res.status(200).json(
    new ApiResponse(200, updatedUser, "User details updated successfully")
  );
});

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(404, "No user exists with this email"); 
    }

    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect old Password")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
        req.user._id,
        {
            password: hashedPassword
        },
    )

    res.status(200).json(new ApiResponse(200, {}, "User Password Updated Successfully"))
});

export {
  registerUser,
  verifyUser,
  loginUser,
  //secured route methods
  logoutUser,
  getCurrentUser,
  updateUserDetails,
  updatePassword
};
