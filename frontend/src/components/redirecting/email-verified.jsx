import { selectUserEmail } from "@/features/Users/UserSlice";
import { Mail } from "lucide-react"
import { useSelector } from 'react-redux'; 


export default function EmailVerified ()  {

  const UserEmail = useSelector(selectUserEmail);

  const handleOpenGmail = () => {
    // Open the Gmail website directly
    window.open('https://mail.google.com', '_blank');
  };


    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[90%] rounded-lg bg-white p-4 shadow-lg sm:max-w-md sm:p-6 md:p-8">
        <div className="mb-4 flex justify-center sm:mb-6">
          <div className="relative">
            <div className="absolute -inset-4">
              <div className="h-full w-full rounded-full bg-gray-200"></div>
            </div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 sm:h-16 sm:w-16">
              <Mail className="h-6 w-6 text-indigo-900 sm:h-8 sm:w-8" />
            </div>
            <div className="absolute inset-0">
              <span className="absolute left-1 top-0 h-1.5 w-1.5 rounded-full bg-green-400 sm:h-2 sm:w-2"></span>
              <span className="absolute -right-1 top-3 h-1.5 w-1.5 rounded-full bg-yellow-300 sm:h-2 sm:w-2"></span>
              <span className="absolute -left-3 bottom-2 h-1.5 w-1.5 rounded-full bg-indigo-500 sm:h-2 sm:w-2"></span>
              <span className="absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full bg-red-400 sm:h-2 sm:w-2"></span>
            </div>
          </div>
        </div>
        <h2 className="mb-3 text-center text-xl font-semibold text-gray-800 sm:mb-4 sm:text-2xl">
          Verify your email address
        </h2>
        <p className="mb-3 text-center text-sm text-gray-600 sm:mb-4 sm:text-base">
          A verification email has been sent to your email{" "}
          <span className="font-medium text-green-500">{UserEmail}</span>
        </p>
        <p className="mb-4 text-center text-xs text-gray-500 sm:mb-6 sm:text-sm">
          Please check your email and click the link provided in the email to complete your account registration.
        </p>
        
        <button  onClick={handleOpenGmail}  className="w-full rounded-full bg-green-500 py-2 text-sm text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:py-3 sm:text-base">
          Verify Email
        </button>
      </div>
    </div>
    );
  };
  