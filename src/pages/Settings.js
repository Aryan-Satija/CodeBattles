import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {BiSave} from 'react-icons/bi';
import {apiConnector} from '../services/apiConnector.js';
import {SETTINGS} from '../services/apis.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Settings = () => {
  const navigate = useNavigate();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
  };
  const {user} = useSelector((state)=>{
    return state.profile;
  });
  const {token} = useSelector((state)=>{
    return state.auth;
  });
  const [preview, setPreview] = useState(user.image)
  useEffect(() => {
      window.addEventListener('resize', updateViewportWidth);
      return () => {
        window.removeEventListener('resize', updateViewportWidth);
      };
  }, []);
  const updateProfile = async()=>{
    try{
        const formData = new FormData();
        formData.append("displayPicture", preview);
        const response = await apiConnector("PUT", 
                      SETTINGS.UPDATE_PROFILE_API, 
                      formData,
                      {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                      });
        console.log(response);   
        
    } catch(error){
      console.log(error);
      toast.error('Changes Couldn\'t Be Updated', {
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
  async function deleteAccount(){
    try{
        const response = await apiConnector("DELETE", SETTINGS.DELETE_ACCOUNT_API, {
        user,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success(`Account Deleted Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }); 
      localStorage.clear(); 
      navigate("/");
    } catch(error){
      console.log(error);
      toast.error('Account Couldn\'t Be Deleted', {
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
  console.log(user);
  return (
    <div className='w-full h-screen flex flex-col gap-6 pr-6 pb-10 item-center'>
      <div>
        <div className='text-richblack-5 text-2xl float-left'>Edit Profile</div>
      </div>
      <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md flex gap-[20px] justify-between items-center'>
            <div className='w-[100%] flex item-center gap-4'>
              <div>
                <img src={preview} className='w-[4.875rem] aspect-square rounded-full'></img>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='text-richblack-100 font-bold text-lg'>Change Profile Picture</div>
                <div className='flex gap-4 items-center'>
                  <div onClick={updateProfile} className={`cursor-pointer flex items-center gap-2 rounded-[8px] px-[24px] py-[8px] text-center bg-yellow-50 text-richblack-900 duration-200 hover:scale-95`}>CONFIRM</div>
                  <div className={`cursor-pointer flex items-center gap-2 rounded-[8px] px-[24px] py-[8px] text-center bg-richblack-700 text-richblack-5 duration-200 hover:scale-95`}>  
                    <label htmlFor='fileupload'>PREVIEW</label>
                    <input 
                      id="fileupload"
                      type='file'
                      onChange={(event)=>{
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = (e) => {
                          setPreview(e.target.result);
                        };
                      }}
                      className='hidden'
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md'>
            <div className='text-xl text-richblack-100 font-thin'>About</div>
            <div>
                <textarea rows={5} placeholder={user.additionalDetails.about ? user.additionalDetails.about : "WRITE SOMETHING ABOUT YOURSELF...."} className='w-full bg-richblack-50/10 p-4 text-richblack-25 focus:outline-none'/>
            </div>
        </div>
        <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md flex flex-col gap-[20px]'>
          <div className='w-full flex item-center justify-between'>
            <div className='text-xl text-richblack-100 font-thin'>Personal Details</div>
            <div className={`cursor-pointer flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-50 text-richblack duration-200 hover:scale-95`}><BiSave/> SAVE</div>
          </div>
          <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>First Name</div>
                  <div className='text-richblack-200 text-md'>{user.firstName}</div>
                </div>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Last Name</div>
                  <div className='text-richblack-200 text-md'>{user.lastName}</div>
                </div>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Email</div>
                  <div className='text-richblack-200 text-md'>{user.email}</div>
                </div>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Contact Number</div>
                  <div className='text-richblack-200 text-md'>{user.contactNumber ? user.contactNumber : '-'}</div>
                </div>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Gender</div>
                  <div>
                    <select className='text-richblack-200 text-md bg-transparent focus:outline-none cursor-pointer'>
                        <option selected={user.additionalDetails?.gender==="Male" ? "selected" : ""}>Male</option>
                        <option selected={user.additionalDetails?.gender==="Female" ? "selected" : ""}>Female</option>
                        <option selected={user.additionalDetails?.gender==="Non-binary" ? "selected" : ""}>Non-binary</option>
                        <option selected={user.additionalDetails?.gender==="Prefer not to respond" ? "selected" : ""}>Prefer not to respond</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-col w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Date Of Birth</div>
                  <div><input type='date' value={user.additionalDetails.dateOfBirth} className='text-richblack-200 text-md bg-transparent focus:outline-none cursor-pointer'/></div>
                </div>
          </div>
        </div>
        <div className='flex gap-[24px] items-start p-[24px] bg-pink-900 border-2 border-pink-700 rounded-lg'>
            <div onClick={deleteAccount} className='p-[14px] cursor-pointer bg-pink-700 rounded-full flex justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                <path d="M22 4.5C22 3.67158 21.3285 3 20.5 3H16.724C16.0921 1.20736 14.4007 0.00609375 12.5 0H9.50002C7.59928 0.00609375 5.90789 1.20736 5.27602 3H1.5C0.671578 3 0 3.67158 0 4.5C0 5.32842 0.671578 6 1.5 6H2.00002V18.5C2.00002 21.5376 4.46245 24 7.5 24H14.5C17.5376 24 20 21.5376 20 18.5V6H20.5C21.3285 6 22 5.32842 22 4.5ZM17 18.5C17 19.8807 15.8807 21 14.5 21H7.5C6.1193 21 5.00002 19.8807 5.00002 18.5V6H17V18.5Z" fill="#EF476F"/>
                <path d="M8.5 18C9.32842 18 10 17.3284 10 16.5V10.5C10 9.67158 9.32842 9 8.5 9C7.67158 9 7 9.67158 7 10.5V16.5C7 17.3284 7.67158 18 8.5 18Z" fill="#EF476F"/>
                <path d="M13.5 18C14.3284 18 15 17.3284 15 16.5V10.5C15 9.67158 14.3284 9 13.5 9C12.6716 9 12 9.67158 12 10.5V16.5C12 17.3284 12.6716 18 13.5 18Z" fill="#EF476F"/>
              </svg>
            </div>
            <div>
                <div className='text-pink-5 font-bold text-md'>Delete Account</div>
                <div className='text-pink-25 '>Would you like to delete account?</div>
                <div className='text-pink-25 '>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</div>
                <div className='text-pink-300 text-md'>I want to delete my account.</div>
            </div>
        </div>
    </div>
  )
}
export default Settings;