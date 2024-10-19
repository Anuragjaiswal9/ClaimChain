'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@nextui-org/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CameraIcon, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import MyNavbar from "./MyNavbar"
import { selectFullName } from '../features/Users/UserSlice';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setAvatarName } from '../features/Users/UserSlice';
import { selectAvatarName } from '../features/Users/UserSlice';

export default function EditProfile() {
    const { register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm()
    const [isEditingUsername, setEditingUsername] = useState(false)
    const [isChangingPassword, setChangingPassword] = useState(false)
    const [isUploading, setIsUploading] = useState(false); // State for upload status
    const dispatch = useDispatch();

    const fullName = useSelector(selectFullName);
    const AvatarName = useSelector(selectAvatarName);

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];

        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            console.log(formData);

            setIsUploading(true);  // Start the uploading state

            try {
                const response = await axios.post("http://localhost:8000/api/v1/users/user/update-profile", formData, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                dispatch(setAvatarName(response.data.data.avatar));
            } catch (error) {
                console.error("Error uploading file", error);
            } finally {
                setIsUploading(false);  // End the uploading state
            }
        }
    };

    const onSubmitUsername = async (data) => {
        await axios.post("http://localhost:8000/api/v1/users/user/update-profile", { fullName: data.fullName }, { withCredentials: true });
        setEditingUsername(false)
        reset({ username: data.fullName })
    }

    const onSubmitPassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = getValues()
        await axios.post("http://localhost:8000/api/v1/users/user/update-profile/password", { oldPassword, newPassword }, { withCredentials: true });
        setChangingPassword(false)
    }

    return (
        <div>
            <MyNavbar />

            <div className="mt-5">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Avatar and Photo Upload Section */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 relative">
                                {isUploading ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-t-transparent border-gray-400 rounded-full" />
                                    </div>
                                ) : AvatarName ? (
                                    <AvatarImage src={AvatarName} alt="Profile picture" />
                                ) : (
                                    <AvatarFallback>
                                        <User className="h-20 w-20 border border-gray-200 text-gray-400" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="flex flex-col space-y-2">
                                <Input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <Label
                                    htmlFor="avatar-upload"
                                    className="flex items-center justify-center sm:justify-start space-x-2 cursor-pointer text-sm text-primary hover:text-blue-700 transition-colors"
                                >
                                    <CameraIcon className="h-5 w-5" />
                                    <span>Change photo</span>
                                </Label>

                                <p className="text-xs text-muted-foreground text-center sm:text-left">
                                    At least 800x800 px recommended. <br />
                                    JPG or PNG is allowed.
                                </p>
                            </div>
                        </div>

                        {/* Username Edit Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">

                                {isEditingUsername ? (
                                    <form onSubmit={handleSubmit(onSubmitUsername)} className="space-y-4">
                                        <Input
                                            id="username"
                                            {...register("fullName", { required: "Username is required" })}
                                        />
                                        {errors.username && (
                                            <p className="text-sm text-danger">{errors.username.message}</p>
                                        )}
                                        <Button
                                            type="submit"
                                            color="primary"
                                            className="mt-2"
                                        >
                                            Save Username
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-muted-foreground">{watch("username") || fullName}</p>
                                        <Button
                                            type="button"
                                            color="primary"
                                            onClick={() => setEditingUsername(true)}
                                        >
                                            Edit Username
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Separator className="border-t border-gray-300 " />

                            {/* Password Change Section */}
                            <div className="space-y-4">
                                <Button
                                    type="button"
                                    color="primary"
                                    onClick={() => setChangingPassword(!isChangingPassword)}
                                    className="w-full sm:w-auto"
                                >
                                    {isChangingPassword ? "Cancel Change Password" : "Change Password"}
                                </Button>
                                {isChangingPassword && (
                                    <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                {...register("oldPassword", { required: "Current password is required" })}
                                            />
                                            {errors.oldPassword && (
                                                <p className="text-sm text-danger">{errors.oldPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                {...register("newPassword", {
                                                    required: "New password is required",
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                        message: 'Password must contain at least one letter and one number',
                                                    },
                                                })}
                                            />
                                            {errors.newPassword && (
                                                <p className="text-sm text-danger">{errors.newPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                {...register("confirmPassword", {
                                                    required: "Please confirm your new password",
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters',
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                        message: 'Password must contain at least one letter and one number',
                                                    },
                                                    validate: (value) =>
                                                        value === watch("newPassword") || "Passwords do not match",
                                                })}
                                            />
                                            {errors.confirmPassword && (
                                                <p className="text-sm text-danger">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>

                                        <Button type="submit" color="primary" className="w-full sm:w-auto">
                                            Save Password
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
