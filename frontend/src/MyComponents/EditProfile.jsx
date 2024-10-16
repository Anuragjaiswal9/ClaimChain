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
import { useSelector } from 'react-redux'; 
import { selectFullName } from '../features/Users/UserSlice'; 
import axios from "axios"


export default function EditProfile() {
    const { register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm()
    const [avatar, setAvatar] = useState("/placeholder.svg?height=200&width=200")
    const [isEditingUsername, setEditingUsername] = useState(false)
    const [isChangingPassword, setChangingPassword] = useState(false)

    const fullName = useSelector(selectFullName);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatar(e.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmitUsername =async (data) => {
        console.log("Username Data: ", { username: data.fullName })
        await axios.post("http://localhost:8000/api/v1/users/user/update-profile", {fullName: data.fullName}, {withCredentials: true});
        // Handle the username update, e.g., send to the backend
        setEditingUsername(false)
        reset({ username: data.fullName }) // Optionally reset the form with the updated username
    }

    const onSubmitPassword = async() => {
        const { oldPassword, newPassword, confirmPassword } = getValues()
        console.log("Password Data: ", { oldPassword, newPassword, confirmPassword })
        await axios.post("http://localhost:8000/api/v1/users/user/update-profile/password", {oldPassword, newPassword}, {withCredentials: true});
        // Handle the password change, e.g., send only password data to the backend
        setChangingPassword(false)
    }

    return (
        <div>
            <div>
                <MyNavbar />
            </div>

            <div className="mt-5">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Avatar and Photo Upload Section */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Avatar className="h-32 w-32 sm:h-40 sm:w-40">
                                <AvatarImage src={avatar} alt="Profile picture" />
                                <AvatarFallback><User className="h-20 w-20 border border-gray-200  text-gray-400" /></AvatarFallback>
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
                                    className="flex items-center justify-center sm:justify-start space-x-2 cursor-pointer text-sm text-primary hover:text-primary-foreground transition-colors"
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
                                <Label htmlFor="username">Username</Label>
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
                                        <p className="text-muted-foreground">{watch("username") || fullName }</p>
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
                                            {errors.currentPassword && (
                                                <p className="text-sm text-danger">{errors.currentPassword.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                {...register("newPassword", { required: "New password is required" })}
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
