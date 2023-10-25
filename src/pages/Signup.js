import { useState } from "react";
import { useNavigate } from "react-router-dom";
import frame from '../assets/Images/frame.png';
import signup from '../assets/Images/signup.png';
import { AUTH } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {setSignUpForm} from '../slices/authSlice.js';
import { setLoading } from "../slices/authSlice.js";
import { Spinner } from "../components/Spinner";
function SignUp(){
    const {loading} = useSelector((state)=>{
        return state.auth;
    })
    const [formData, setFormData] = useState({fname:"",lname: "",contact:"",email:"",password:"", confirmpassword:"",role:"Student"});
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    console.log(formData);
    async function submitHandler(event){
        event.preventDefault();
        try{
            dispatch(setLoading(true));
            if(formData.password !== formData.confirmpassword){
                toast.error('Passwords don\'t match', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            else{
                dispatch(setSignUpForm(formData));
                const response = await apiConnector(
                    "POST", AUTH.OTP_API, { 'email' : formData.email }
                )
                navigate("/signup/verify-email");
                toast.success('otp sent successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });  
                dispatch(setLoading(false));
            }
        } catch(error){
            dispatch(setLoading(false));
            console.log(error);
            toast.error(`${error.response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return(loading ? <Spinner/> : <div className="w-screen py-[4rem] min-h-screen bg-richblack-900 flex place-items-center">
    <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-[100%] md:w-[50%]">
            <div className="text-2xl text-richblack-5 font-bold">Welcome Back</div>
            <p className="text-richblack-500">Discover Your Passion,</p>
            <p style={{fontFamily:'Edu SA Beginner'}}className="text-blue-100">Be Unstoppable</p>
            <form onSubmit={submitHandler} className="w-full">
                <div className="bg-richblack-700 flex w-[250px] my-5 py-1 px-1 justify-between rounded-full">
                    <div onClick={()=>{
                        setFormData((prev)=>{
                            return {...prev, ["role"] : "Student"}
                        })
                    }} className={`text-richblack-5 py-2 px-4 cursor-pointer rounded-full text-base ${formData.role === 'Student' ? 'bg-richblack-900' : ''}`}>Student</div>
                    <div onClick={()=>{
                        setFormData((prev)=>{
                            return {...prev, ["role"] : "Instructor"}
                        })
                    }} className={`text-richblack-5 py-2 px-4 cursor-pointer rounded-full text-base ${formData.role === 'Instructor' ? 'bg-richblack-900' : ''}`}>Instructor</div>
                </div>
                <div className="my-4 w-full flex items-center justify-between gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="fname" className="text-richblack-5 font-bold">First Name:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                            })}} type="text" id="fname" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>                        
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="lname" className="text-richblack-5 font-bold">Last Name:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                            })}} type="text" id="lname" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>
                    </div>
                </div>
                <div className="my-4 w-full">
                    <label htmlFor="contact" className="text-richblack-5 font-bold">Contact:</label>
                    <input onChange={(event)=>{
                        setFormData((prev)=>{
                            return {
                                ...prev,
                                [event.target.id]:event.target.value 
                            }
                        })
                    }} type="text" id="contact" maxLength={10} className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>
                </div>
                <div className="my-4 w-full">
                    <label htmlFor="email" className="text-richblack-5 font-bold">Email:</label>
                    <input onChange={(event)=>{
                        setFormData((prev)=>{
                            return {
                                ...prev,
                                [event.target.id]:event.target.value 
                            }
                        })
                    }} type="email" id="email" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>
                </div>
                <div className="my-4 w-full flex items-center justify-between gap-5">
                    <div className="w-[50%]">
                        <label htmlFor="password" className="text-richblack-5 font-bold">Password:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                            })}} type="password" id="password" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>                        
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="confirmpassword" className="text-richblack-5 font-bold">Confirm Password:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                            })}} type="password" id="confirmpassword" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" required/>
                    </div>
                </div>
                <div className="w-full">
                    <button className="w-full text-center bg-yellow-100 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 hover:scale-95">LOGIN</button>
                </div>
            </form>
        </div>
        <div className="w-[500px] relative">
                <img src={frame} className="absolute top-[-1rem] left-[1rem]"/>
                <img src={signup} className="relative z-1"/>
        </div>
    </div>
</div>)
}
export default SignUp;