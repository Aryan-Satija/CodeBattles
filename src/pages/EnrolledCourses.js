import React, { useEffect, useState } from 'react';
import '../App.css'
import '../components/Spinner.css';
import { apiConnector } from '../services/apiConnector';
import { SETTINGS } from '../services/apis';
import { useSelector } from 'react-redux';
import { AiOutlineEye } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import {FaGraduationCap} from "react-icons/fa6";
import { motion, variant } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const EnrolledCourses = () => {
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();
    const {token} = useSelector((state)=>{
        return state.auth;
    })
    async function fetchData(){
        try{
            
            const response = await apiConnector(    "GET", 
                                                    SETTINGS.GET_ENROLLED_COURSES_API, 
                                                    null,
                                                    {
                                                        authorization: `Bearer ${token}`
                                                    }
                                                );
            setCourses(response.data.data);
        } catch(error){
            console.log("error occured");
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchData();
    }, []);
  return (
    <div className='w-full min-h-screen'>
        {
            !courses ? (<div className='w-full h-[80vh] flex flex-col justify-center items-center pr-6'><div className='custom-loader'></div></div>) : (<>
                <div className='text-richblack-5 text-2xl font-bold mb-4 flex gap-2 items-center'>
                    <FaGraduationCap/>
                    ENROLLED COURSES
                </div>
                <div className='flex flex-col gap-6 pr-6'>
                {
                    courses.map((course)=>{
                        return (<div key={course._id} className="flex flex-col gap-4 md:flex-row justify-between border-b border-richblack-800 px-6 py-8">
                            <div className='flex flex-col lg:flex-row flex-1 gap-x-4' col={2}>
                                <img src={course.thumbnail} className='h-[140px] w-[220px] rounded-lg object-fill'/>
                                <div className='flex flex-col justify-between max-w-[400px] gap-y-4'>
                                    <p className='text-lg font-semibold text-richblack-200'>{course.courseName}</p>
                                    <p className="text-xs text-richblack-400">{course.courseDescription.slice(0, 200)}....</p>
                                    {
                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-caribbeangreen-600/40 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-100">Enrolled</p>
                                    }
                                </div>
                            </div>
                            <div className='flex items-center gap-x-10'>
                                <div className="text-sm flex-1 font-medium text-richblack-200">
                                    100+ hours
                                </div>
                                <div className="text-sm flex-1 font-medium text-richblack-200">
                                    ₹{course.price}
                                </div>
                                <div className="text-sm flex-1 flex justify-start gap-x-2 font-medium text-richblack-200">
                                    <button className='cursor-pointer duration-200 hover:text-caribbeangreen-400 hover:scale-105' onClick={()=>{
                                        navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                                    }}><AiOutlineEye size={20} /></button>
                                    <button className='cursor-pointer duration-200 hover:text-pink-400 hover:scale-105' onClick={()=>{}}><RiDeleteBin6Line size={20} /></button>
                                </div>
                            </div>
                        </div>)  
                    })
                }
            </div>
            </>)
        }
    </div>
  )
}
export default EnrolledCourses;