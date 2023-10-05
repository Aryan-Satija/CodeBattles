import { useState, useEffect } from "react";
import frame from '../assets/Images/frame.png';
import login from '../assets/Images/login.png';
import { AUTH } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
function Login(){
    const dispatch = useDispatch(); 
    const {token} = useSelector((state)=>{
        return state.auth;
    });
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email:"",password:"",role:"student"});
    async function submitHandler(event){
        event.preventDefault();
        try{
            const response = await apiConnector("POST", AUTH.LOGIN_API, {
                'email': formData.email,
                'password': formData.password
            });
            console.log("********************************");
            console.log(response);
            console.log("********************************");
            toast.success(`Welcome ${response.data.user.firstName}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });  
            console.log(response);
            dispatch(setToken(JSON.stringify(response.data.token)));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user",  JSON.stringify(response.data.user));
            dispatch(setUser(response.data.user));
            navigate('/dashboard/profile');
        } catch(error){
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
    useEffect(()=>{
        if(token)
            navigate('/dashboard/profile')
    }, [])
    return (<div className="w-screen py-[4rem] min-h-screen bg-richblack-900 flex place-items-center">
        <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-around items-center gap-10">
            <div className="w-[100%] md:w-[50%]">
                <div className="text-2xl text-richblack-5 font-bold">Welcome Back</div>
                <p className="text-richblack-500">Discover Your Passion,</p>
                <p style={{fontFamily:'Edu SA Beginner'}} className="text-blue-100">Be Unstoppable</p>
                <form onSubmit={submitHandler} className="w-full">
                    <div className="my-4 w-full">
                        <label htmlFor="email" className="text-richblack-5 font-bold">Email:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                            })
                        }} type="email" id="email" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5" />
                    </div>
                    <div className="my-8 w-full">
                        <label htmlFor="password" className="text-richblack-5 font-bold">Password:</label>
                        <input onChange={(event)=>{
                            setFormData((prev)=>{
                                return {
                                    ...prev,
                                    [event.target.id]:event.target.value 
                                }
                        })}} type="password" id="password" className="w-full rounded-sm h-10 p-2 bg-richblack-700 focus:outline-none border-2 border-richblack-500/50 text-richblack-5"/>
                        <div className="mt-1"><Link to="/login/reset-password" className="text-xs text-blue-100 float-right">Forget Password</Link></div>
                    </div>
                    <div className="w-full">
                        <button className="w-full text-center bg-yellow-100 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 hover:scale-95">LOGIN</button>
                    </div>
                </form>
            </div>
            <div className="w-[500px] relative">
                <img src={frame} className="absolute top-[-1rem] left-[1rem]"/>
                <img src={login} className="relative z-1"/>
            </div>
        </div>
    </div>)
}
export default Login;