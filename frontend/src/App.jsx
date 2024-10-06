import React from "react";
import Mycarousel from "./MyComponents/Mycarousel";
import Myform from "./MyComponents/Myform";



function App() {


  return (
    <div className="flex flex-row justify-between">
      <div className="">

        <div className="relative w-64 h-32 ">
          <img src="ClaimLogo.png" className="w-64  pl-4 pt-3 absolute left-0 top-0 " />
        </div>
        
        <div className="ml-20 mt-14">
        <Myform  />
        </div>
       
       
       

      </div>

      <div className="">
        <Mycarousel />
      </div>



    </div>
  )
}

export default App
