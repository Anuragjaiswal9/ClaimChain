import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


export default function VerificationComp() {

  const [LoginAction, setLoginAction] = useState(null);  // State to track navigation action
  const navigate = useNavigate();


  useEffect(() => {
    if (LoginAction === 'RedirectLogin') {
      navigate('/');  // Navigate to Home page
    }

    // Clear action after navigating to avoid unnecessary re-trigger
    setLoginAction(null);
  }, [LoginAction, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 sm:text-3xl">Email Verified!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Your email has been successfully verified. You can now access all features of our application.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
        <button  onClick={() => setLoginAction('RedirectLogin')}    className="w-full rounded-full bg-green-500 py-2 text-sm text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:py-3 sm:text-base">
        Continue to Login
        </button>
        </CardFooter>
      </Card>
    </div>
  )
}