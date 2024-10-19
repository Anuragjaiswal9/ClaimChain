import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {Link} from "@nextui-org/link";

export default function PasswordResetSucc() {
    const navigate = useNavigate();

    // Function to handle navigation
    function handleReturn()
    {
        navigate('/')
        // const handleReturn = () => {
        //     navigate('/');
        // };
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Password Reset Successful</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild className="w-full sm:w-auto bg-foreground hover:bg-foreground cursor-pointer">
                        <Link onClick={handleReturn} >Return to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
