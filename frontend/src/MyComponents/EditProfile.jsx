import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CameraIcon } from "lucide-react"
import MyNavbar from "./MyNavbar"

export default function EditProfile() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")

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

    const onSubmit = (data) => {
        console.log("Form Data: ", data)
        // Handle form submission here, e.g., send data to backend
    }

    return (

        <div>

            <div>

                <MyNavbar />

            </div>

            <div className="mt-5">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] mx-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center sm:text-left">Edit Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                                    <AvatarImage src={avatar} alt="Profile picture" />
                                    <AvatarFallback>Image</AvatarFallback>
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
                                        className="flex items-center justify-center sm:justify-start space-x-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        <CameraIcon className="h-4 w-4" />
                                        <span>Change photo</span>
                                    </Label>
                                    <p className="text-xs text-gray-500 text-center sm:text-left">
                                        At least 800x800 px recommended. <br />
                                        JPG or PNG is allowed.
                                    </p>
                                </div>
                            </div>

                            {/* Username Input */}
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    {...register("username", { required: "Username is required" })}
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Current Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    {...register("currentPassword", { required: "Current password is required" })}
                                />
                                {errors.currentPassword && (
                                    <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
                                )}
                            </div>

                            {/* New Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    {...register("newPassword", { required: "New password is required" })}
                                />
                                {errors.newPassword && (
                                    <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>

                            {/* Confirm New Password Input */}
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
                                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                            <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                            <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                        </CardFooter>
                    </Card>
                </form>

            </div>

        </div>
    )
}
