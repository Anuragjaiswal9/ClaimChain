import React from 'react'
import EditProfile from './EditProfile'
import EmailVerification from './VerificationComp'
import MyNavbar from './MyNavbar'
import HomeCard from './HomeCard'



function Mainpage() {
  return (
    <div>

      <div>
        <MyNavbar />
      </div>


      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </div>







    </div>

  )
}

export default Mainpage