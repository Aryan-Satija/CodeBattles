import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/homePage";
import Navbar from "./components/navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import VerifyEmail from "./pages/verifyEmail";
import ResetPassword from "./pages/resetPassword";
import UpdatePassword from "./pages/updatePassword";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/signup/verify-email" element={<VerifyEmail/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/login/reset-password" element={<ResetPassword/>}/>
        <Route exact path="/login/update-password/:id" element={<UpdatePassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
