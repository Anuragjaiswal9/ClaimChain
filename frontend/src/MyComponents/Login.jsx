import React from 'react'
import Mycarousel from './Mycarousel'
import Myform from './Myform'
import { useNavigate } from 'react-router-dom';


function Login() {
    


    return (
        <div className="relative  max-sm:flex max-sm:flex-col">

            {/* Logo section */}
            <div className="w-1/2 h-32  max-sm:w-full   max-sm:h-12 flex justify-center items-center max-sm:mb-5 ">
                <img
                    src="ClaimLogo.png"
                    className=" max-sm:w-60 sm:w-80 mt-10 max-sm:h-14  max-sm:mt-5 left-0 top-0"
                />
            </div>

            {/* Main content section */}
            <div className="flex max-sm:flex-col-reverse">

                {/* Form Section */}
                <div className="w-1/2 flex max-sm:w-full  justify-center items-center  ">
                    <div className="max-sm:mt-5 max-sm:mb-5  ">
                        <Myform />
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-1/2 max-sm:w-full sm:-mt-32  ">
                    <Mycarousel />
                </div>

            </div>
        </div>
    )
}

export default Login