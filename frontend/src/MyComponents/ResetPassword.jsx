import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, ArrowLeftRight, RefreshCcw, ShoppingCart, MessageCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange", // Enable real-time validation
    });

    const [LoginAction, setLoginAction] = useState(null);  // State to track navigation action
    const navigate = useNavigate();

    useEffect(() => {
        if (LoginAction === 'RedirectLogin') {
            navigate('/Reset-Successful');  // Navigate to Home page
        }

        // Clear action after navigating to avoid unnecessary re-trigger
        setLoginAction(null);
    }, [LoginAction, navigate]);

    const onSubmit = async (data) => {
        console.log("Password Reset Data: ", data.confirmPassword);
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('userId');
            await axios.post(`http://localhost:8000/api/v1/users/user/forgot-password/reset-password?_id=${userId}`, { newPassword: data.confirmPassword });
            console.log("Password reset successful");
            console.log(data);
            setLoginAction('RedirectLogin');
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <img src="ClaimLogo.png" alt="Tranxactrust" className=" mb-8 w-56" />
                    <h1 className="text-2xl font-bold mb-4">Set new password</h1>
                    <p className="text-gray-600 mb-6">Secure your account with a new password.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password", {
                                    required: 'Password is required',
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
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <Input
                                id="confirm-password"
                                type="password"
                                {...register("confirmPassword", {
                                    required: 'Confirm password is required',
                                    validate: (value) =>
                                        value === watch("password") || "Passwords do not match",
                                })}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                            Reset Password
                        </Button>
                    </form>

                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-blue-700 p-8 flex items-center justify-center">
                <div className="max-w-md text-white">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <CreditCard className="w-8 h-8" />
                        <ArrowLeftRight className="w-8 h-8" />
                        <RefreshCcw className="w-8 h-8" />
                        <ShoppingCart className="w-8 h-8" />
                        <div className="col-span-2"></div>
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Trouble accessing your account?</h2>
                    <p className="mb-6">
                        Don't worry! We'll help you get back on track. Simply enter your registered email, and we'll send you a link
                        to reset your password.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Quick and Secure
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Data Safety
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            24/7 Support
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
