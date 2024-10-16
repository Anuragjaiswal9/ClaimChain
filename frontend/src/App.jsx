import React from "react";
import Login from "./MyComponents/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Mainpage from "./MyComponents/MainPage";
import EmailVerified from "./components/redirecting/email-verified";
import EditProfile from "./MyComponents/EditProfile";
import VerificationComp from "./MyComponents/VerificationComp";
import ForgotPassword from "./MyComponents/ForgotPassword";
import ResetPassword from "./MyComponents/ResetPassword";






function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);



  return (
    <Router>
      <Routes>

        {/* Login Page Route */}
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Main Page Route: Redirect to login if not authenticated {isAuthenticated ? <MainPage/> : <Navigate to="/login" />} */}
        <Route
          path="/main"
          element={<Mainpage />}
        />

        {/* Default Route: Redirect to Login <Route path="*" element={<Navigate to="/login" />} /> */}

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/Verify-Email" element={<EmailVerified />} />

        <Route path="/Email-Verified" element={<VerificationComp />} />

        <Route
          path="/Edit"
          element={<EditProfile />}
        />

        <Route
          path="/Forgot-Password"
          element={<ForgotPassword />}
        />

        <Route
          path="/Reset-Password"
          element={<ResetPassword />}
        />


      </Routes>
    </Router>
  );
}

export default App;