import React from 'react'
import { useState } from 'react';
import CTAbutton from '../components/CTAbutton';
import { AUTH } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { toast } from 'react-toastify';
const ResetPassword = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    async function ClickHandler(){
        try{
            console.log(AUTH.RESET_TOKEN_API);
            const response = await apiConnector("POST", AUTH.RESET_TOKEN_API, {
                'email':email
            });
            toast.success(`Email Sent Successfully`, {
                position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
           }); 
           setIsEmailSent(true);
            console.log(response);
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
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            {
                !isEmailSent ? (<div className='w-1/4 flex flex-col gap-5'>
                    <div className='text-center text-4xl text-richblack-5 font-bold'>Reset Your Password</div>
                    <div className='text-center text-md text-richblack-400'>We’ll email you instructions to reset your password.</div>
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor='email' className='text-richblack-200 text-base'>email:</label>
                        <input type='email' id="email" placeholder='squarepants@gmail.com' onChange={(event)=>{
                            setEmail(event.target.value);
                        }} className='w-full bg-richblack-700 text-richblack-100 p-2 rounded-sm hover:outline-none'/>
                    </div>
                    <div className='w-full' onClick={()=>{ClickHandler()}}><CTAbutton yellow={true}>Reset Password</CTAbutton></div>
                </div>):(<div className='w-1/4 flex flex-col gap-5'>
                    <div className='text-center text-4xl text-richblack-5 font-bold'>Check email</div>
                    <div>
                        <div className='text-center text-md text-richblack-400'>We have sent the reset email to</div>
                        <div className='text-center text-md text-richblack-400'>{email}</div>
                    </div>
                    <div className='w-full'><CTAbutton yellow={true}>Resend Email</CTAbutton></div>
                </div>)
            }
        </div>
    )
}
export default ResetPassword;
