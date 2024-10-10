import React from "react";
import Login from "./MyComponents/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Mainpage from "./MyComponents/MainPage";






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
          element={isAuthenticated ? <Mainpage /> : <Navigate to="/login" />} 
        />

        {/* Default Route: Redirect to Login <Route path="*" element={<Navigate to="/login" />} /> */ }
        
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
