import CTAbutton from "../components/CTAbutton";
import { AUTH } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
function UpdatePassword(){
    const location = useLocation();
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    async function submitHandler(){
        try{
            if(!password || !confirmpassword){
                toast.error('All fields are required', {
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
                const token = location.pathname.split("/").at(-1);
                const response = await apiConnector("POST", AUTH.RESET_PASSWORD_API,{
                    'password': password,
                    'confirmPassword': confirmpassword,
                    'token': token
                });
                toast.success(`Password Reset Successfull`, {
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
        } catch(error){
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
    return (<div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="w-[508px] p-[32px] flex flex-col gap-5">
            <div className="text-richblack-5 text-3xl font-bold">Choose New Password</div>
            <div className="text-richblack-200 text-lg">Almost done. Enter your new password and youre all set.</div>
            <div>
                <label htmlFor="password" className="text-richblack-100 flex items-center">New Password <div className="text-pink-600 text-2xl">*</div></label>
                <input type="password" id="password" onChange={(event)=>{setpassword(event.target.value)}} className="w-full p-2 rounded-md bg-richblack-700 text-richblack-5"/>
            </div>
            <div>
                <label htmlFor="confirmpassword" className="text-richblack-100 flex items-center">Confirm New Password <div className="text-pink-600 text-2xl">*</div></label>
                <input type="password" id="confirmpassword" onChange={(event)=>{setconfirmpassword(event.target.value)}} className="w-full p-2 rounded-md bg-richblack-700 text-richblack-5"/>
            </div>
            <div className="w-full" onClick={submitHandler}>
                <CTAbutton yellow={true}>Reset Password</CTAbutton>
            </div>
        </div>
    </div>)
}
export default UpdatePassword;