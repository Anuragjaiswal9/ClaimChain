import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, ArrowLeftRight, Lock, ShoppingCart, Truck, Check } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Assuming axios is imported

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [LoginAction, setLoginAction] = useState(null); 

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleReset = async (data) => {
        const { email } = data; // Destructure email from form data
        try {
            await axios.post("http://localhost:8000/api/v1/users/user/forgot-password", { email });
            console.log(email);
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    useEffect(() => {
        if (LoginAction === 'RedirectLogin') {
            navigate('/');
        }
        setLoginAction(null);
    }, [LoginAction, navigate]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <img src="ClaimLogo.png" alt="Tranxactrust logo" className="mb-8 w-56" />
                    <h1 className="text-2xl font-bold mb-4">Forgot password</h1>
                    <p className="text-gray-600 mb-6">Enter your email to receive a password reset link.</p>
                    
                    {/* Form using react-hook-form */}
                    <form className="space-y-4" onSubmit={handleSubmit(handleReset)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <Input 
                                id="email"
                                placeholder="sample@mail.com"
                                type="email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(it|csai|csds|cse|csews|csd|csepmsss|csefw|csaifw|itfw|csdsfw|csaiml|aids|csd|csdews|csh)\d{5}@glbitm\.ac\.in$/,
                                        message: 'Enter a valid email',
                                      },
                                })} 
                            />
                            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                        </div>

                        <Button className="w-full bg-blue-700 hover:bg-blue-800" type="submit">
                            Send Reset Link
                        </Button>
                    </form>
                    
                    <p className="mt-4 text-center">
                        Remember your password?{" "}
                        <a href="#" onClick={() => setLoginAction('RedirectLogin')} className="text-blue-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 bg-blue-700 p-8 flex items-center justify-center">
                <div className="max-w-md text-white">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <CreditCard className="w-8 h-8" />
                        <ArrowLeftRight className="w-8 h-8" />
                        <Lock className="w-8 h-8 col-start-2" />
                        <Truck className="w-8 h-8" />
                        <ShoppingCart className="w-8 h-8 col-start-3" />
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Trouble accessing your account?</h2>
                    <p className="mb-6">
                        Don't worry! We'll help you get back on track. Simply enter your registered email, and we'll send you a link
                        to reset your password.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            Quick and Secure
                        </li>
                        <li className="flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            Data Safety
                        </li>
                        <li className="flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            24/7 Support
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
