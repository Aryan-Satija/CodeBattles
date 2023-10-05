import { Link, useNavigate } from "react-router-dom";
import {FaArrowLeftLong} from 'react-icons/fa6'
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AUTH } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import {  useSelector, useDispatch } from "react-redux";
import { Spinner } from "../components/Spinner";
import { setLoading } from "../slices/authSlice";
function VerifyEmail(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>{
        return state.auth;
    })
    const [otp, setOtp] = useState({dig1:"", dig2:"",dig3:"",dig4:"",dig5:"",dig6:""});
    const {signupData} = useSelector((state)=>{
        return state.auth;
    });
    console.log("data: ", signupData);
    useEffect(()=>{
        if(!signupData)
            navigate('/signup');
    }, []);
    async function submitHandler(){
        try{
            dispatch(setLoading(true));
            let user_otp = "";
            for(let dig in otp) 
                user_otp += otp[dig];
            console.log(user_otp); 
            const response = await apiConnector("POST", AUTH.SIGNUP_API, {
                firstName:signupData.fname,
                lastName:signupData.lname,
                email:signupData.email,
                password:signupData.password,
                confirmPassword:signupData.confirmpassword,
                accountType:signupData.role,
                contactNumber:signupData.contact,
                otp:user_otp
            });
            toast.success('user regitered successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate("/login");
            console.log(response);
            dispatch(setLoading(false));
        } catch(error){
            dispatch(setLoading(false));
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
            console.log(error);
        }
    } 
    return (loading ? <Spinner/> : <div className="flex flex-col justify-center items-center w-screen h-screen">
        <div className="text-richblack-5 text-4xl font-semibold capitalize leading-10">Verify email</div>
        <p className="text-richblack-500 text-lg font-thin">A verification code has been sent to you. Enter the code below</p>
        <div className="flex items-center justify-between w-[400px] mt-8 select-none">
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig1" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig2" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig3" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig4" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig5" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
            <div className="h-12 aspect-square"><input onChange={(event)=>{
                setOtp((prev)=>{
                    return {
                        ...prev,
                        [event.target.id] : event.target.value
                    }
                })
            }} type="text" id="dig6" placeholder="-" maxLength={1} pattern="\d{1}" className="w-full h-full bg-richblack-800 focus:outlibe-none cursor-pointer duration-200  hover:scale-95 flex text-center rounded-md text-richblack-5" required/></div>
        </div>
        <div className="mt-8 w-[400px]">
            <button onClick={submitHandler} className="w-full text-center bg-yellow-100 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 hover:scale-95">VERIFY</button>
        </div>
        <div className="w-[400px] mt-2">
            <div onClick={()=>{navigate("/signup")}} className="text-richblack-5 text-sm flex gap-2 items-center"><FaArrowLeftLong/> Back to SignUp Page</div>
        </div>
    </div>)
}
export default VerifyEmail;