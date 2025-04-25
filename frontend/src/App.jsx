import React from "react";
import Login from "./MyComponents/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Mainpage from "./MyComponents/MainPage";
import EmailVerified from "./components/redirecting/email-verified";
import EditProfile from "./MyComponents/EditProfile";
import VerificationComp from "./MyComponents/VerificationComp";
import ForgotPassword from "./MyComponents/ForgotPassword";
import ResetPassword from "./MyComponents/ResetPassword";
import ReportItem from "./MyComponents/ReportItem";
import ProtectedRoute from "./MyComponents/ProtectedRoute";
import PasswordResetSucc from "./MyComponents/PasswordResetSucc";
import Notification from "./MyComponents/Notification";
import { useEffect } from "react";
import Home from "./MyComponents/ChatMessage/Home";


function App() {

  return (
    <>
      {/* <Home receiverId={"user2"} username={username} contacts={users}/> */}
      <Router>
        <Routes>
          {/* Login Page Route */}
          <Route path="/" element={<Login />} />

          {/* Main Page Route: Redirect to login if not authenticated {isAuthenticated ? <MainPage/> : <Navigate to="/login" />} */}
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Mainpage />
              </ProtectedRoute>
            }
          />

          {/* Default Route: Redirect to Login <Route path="*" element={<Navigate to="/login" />} /> */}

          <Route path="*" element={<Navigate to="/login" />} />

          <Route path="/Verify-Email" element={<EmailVerified />} />

          <Route path="/Email-Verified" element={<VerificationComp />} />

          <Route
            path="/Edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/Forgot-Password" element={<ForgotPassword />} />

          <Route path="/Reset-Password" element={<ResetPassword />} />

          <Route path="/chat" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            

          

          <Route
            path="/Report-Item"
            element={
              <ProtectedRoute>
                <ReportItem />
              </ProtectedRoute>
            }
          />

          <Route path="/Reset-Successful" element={<PasswordResetSucc />} />

          <Route
            path="/Notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
