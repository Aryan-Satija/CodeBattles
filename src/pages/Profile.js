import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi';
const Profile = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
  };
  useEffect(() => {
      window.addEventListener('resize', updateViewportWidth);
      return () => {
        window.removeEventListener('resize', updateViewportWidth);
      };
  }, []);
  const {user} = useSelector((state)=>{
    return state.profile;
  });
  return (
    <div className='w-full h-screen flex flex-col gap-6 pr-6 item-center min-w-[300px]'>
        <div>
          <div className='text-richblack-5 text-2xl float-left'>My Profile</div>
        </div>
        <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md flex flex-col sm:flex-row gap-[20px] justify-between items-center'>
            <div className='w-full sm:w-[70%] flex flex-col sm:flex-row item-center gap-4'>
              <div>
                <img src={user.image} className='w-[4.875rem] mx-auto aspect-square rounded-full'></img>
              </div>
              <div className='flex flex-col justify-evenly py-4 mx-auto sm:mx-0'>
                <div className='text-richblack-5 font-bold text-lg'>{user.firstName} {user.lastName} <span className='text-yellow-50'>({user.accountType})</span></div>
                <div className='text-richblack-300 text-sm mx-auto sm:mx-0'>{user.email}</div>
              </div>
            </div>
            <div>
              <div onClick={()=>{ navigate("/dashboard/settings") }} className={`cursor-pointer flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-50 text-richblack duration-200 hover:scale-95`}><BiEdit/> Edit</div>
            </div>
        </div>
        <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md flex gap-[20px] justify-between items-center'>
            <div className='flex flex-col sm:flex-row justify-between w-full gap-4 items-center'>
              <p className='text-richblack-400 text-base'>
                {
                  user.additionalDetails.about ? user.additionalDetails.about : 'Write Something About Yourself....'
                }
              </p>
              <div onClick={()=>{ navigate("/dashboard/settings") }} className={`cursor-pointer flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-50 text-richblack duration-200 hover:scale-95`}><BiEdit/> Edit</div>
            </div>
        </div>
        <div className='w-full p-[1.5rem] bg-richblack-800 rounded-md flex flex-col gap-[20px]'>
          <div className='w-full flex item-center justify-between'>
            <div className='text-xl text-richblack-100 font-thin'>Personal Details</div>
            <div onClick={()=>{ navigate("/dashboard/settings") }} className={`cursor-pointer hidden sm:flex items-center gap-2 rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-50 text-richblack duration-200 hover:scale-95`}><BiEdit/> Edit</div>
          </div>
          <div className='flex flex-wrap gap-5'>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>First Name</div>
                  <div className='text-richblack-200 text-md'>{user.firstName}</div>
                </div>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Last Name</div>
                  <div className='text-richblack-200 text-md'>{user.lastName}</div>
                </div>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Email</div>
                  <div className='text-richblack-200 text-md'>{user.email}</div>
                </div>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Contact Number</div>
                  <div className='text-richblack-200 text-md'>{user.contactNumber ? user.contactNumber : '-'}</div>
                </div>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Gender</div>
                  <div className='text-richblack-200 text-md'>{user.additionalDetails.gender ? user.additionalDetails.gender : 'Male'}</div>
                </div>
                <div className='flex flex-col min-w-[215px] w-[45%] justify-between gap-2'>
                  <div className='text-richblack-600 text-md'>Date Of Birth</div>
                  <div className='text-richblack-200 text-md'>{user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth : '-' }</div>
                </div>
          </div>
        </div>
    </div>
  )  
}
export default Profile;