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
import PrivateRoute from "./components/PrivateRoute.js";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import { ACCOUNT_TYPE } from "./utils/constants";
import { UseSelector, useSelector } from "react-redux";
import { ViewCourse } from "./pages/ViewCourse.js";
import EnrolledCourses from "./pages/EnrolledCourses";
import Wishlist from "./pages/Wishlist";
import CreateCourse from "./pages/CreateCourse";
import { MyCourses } from "./pages/MyCourses";
import Catalog from "./pages/Catalog";
import {CourseDetails} from "./pages/CourseDetails";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import PrivateRoutes from "./components/PrivateRoute.js";
function App(){
  const {user} = useSelector((state)=>{
    return state.profile;
  });
  console.log("user", user);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/catalog/:catalogname" element={<Catalog/>}/>
        <Route exact path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/signup/verify-email" element={<VerifyEmail/>}/>
        <Route exact element={<PrivateRoute><Dashboard/></PrivateRoute>}>
        <Route exact path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<PrivateRoutes><ViewCourse/></PrivateRoutes>}/>
          <Route exact path="/dashboard/profile" element={<Profile/>}/>
          <Route exact path="/dashboard/settings" element={<Settings/>}/>
          {
            user && user.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route exact path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route exact path="/dashboard/wishlist" element={<Wishlist/>}/>
              </>
            )
          }
          {
            user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route exact path="/dashboard/add-course" element={<CreateCourse/>}/>
                <Route exact path="/dashboard/courses" element={<MyCourses/>}/>
                <Route exact path="/dashboard/instructor" element={<InstructorDashboard/>}/>
              </>
            )
          }
        </Route>
        <Route exact path="/login/reset-password" element={<ResetPassword/>}/>
        <Route exact path="/login/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
