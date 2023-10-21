import React, { useEffect, useState } from 'react';
import { VscAdd } from "react-icons/vsc";
import { apiConnector } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { FiEdit2 } from "react-icons/fi"
import { COURSE } from '../services/apis';
import { RiDeleteBin6Line } from "react-icons/ri"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
export const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    console.log("user", user._id);
    const fetchCourses = async()=>{
        try{
            const response = await apiConnector("POST", 
                                                COURSE.INSTRUCTOR_COURSES_GET_DETAILS,
                                                {
                                                    "instructorId" : user._id
                                                }, 
                                                {
                                                    Authorization : `Bearer ${token}`
                                                });
            setCourses(response.data.courses);
        } catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        toast.promise(
            fetchCourses(),
            {
              pending: 'Loading Courses',
              success: 'Task Successfull',
              error: 'Something went wrong',
            }
        )

    }, [])
    const utildelete = async(ID)=>{
        try{
            await apiConnector("DELETE", 
                                COURSE.COURSE_DELETE,
                                {
                                    'courseId':ID,
                                    "instructorId" : user._id
                                },
                                {
                                    Authorization : `Bearer ${token}`
                                })
            fetchCourses();
        } catch(err){
            console.log(err);
        }
    }
    const deleteSection = async(ID)=>{
        toast.promise(
            utildelete(ID),
            {
              pending: 'Loading',
              success: 'Course Deleted Successfully',
              error: 'Something went wrong',
            }
        )
    }
    return (
    <div className='min-h-screen mr-6 mb-6'>
      <div className='flex items-center justify-between w-[90%]'>
        <div className='text-richblack-50 text-2xl font-bold'>My Courses</div>
        <button className='cursor-pointer rounded-[8px] px-[20px] py-[10px] text-center bg-yellow-50 text-richblack-900 duration-200 hover:scale-95 flex gap-x-2 items-center'>Add Course <VscAdd/></button>
      </div>
      <div>
        <div className="mt-6 rounded-xl border border-richblack-800">
            <div className="rounded-t-md flex justify-between items-center gap-10 border-b border-b-richblack-800 px-6 py-2 ">
                <div className="text-left flex-1 text-sm font-medium uppercase text-richblack-100">Courses</div>
                <div className='hidden md:flex items-center gap-x-10'>
                    <div className="text-left flex-1 text-sm font-medium uppercase text-richblack-100">Duration</div>
                    <div className="text-left flex-1 text-sm font-medium uppercase text-richblack-100">Price</div>
                    <div className="text-left flex-1 text-sm font-medium uppercase text-richblack-100">Actions</div>
                </div>
            </div>
            <div>
            {
                courses.map((course)=>{
                    return (<div key={course._id} className="flex flex-col gap-4 md:flex-row justify-between border-b border-richblack-800 px-6 py-8">
                        <div className='flex flex-col lg:flex-row flex-1 gap-x-4' col={2}>
                            <img src={course.thumbnail} className='h-[140px] w-[220px] rounded-lg object-fill'/>
                            <div className='flex flex-col justify-between max-w-[400px] gap-y-4'>
                                <p className='text-lg font-semibold text-richblack-200'>{course.courseName}</p>
                                <p className="text-xs text-richblack-400">{course.courseDescription}</p>
                                {
                                    course.status === "Draft" ? <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">Draft</p> : <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-pink-700 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-100">Published</p>
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
                                <button className='cursor-pointer duration-200 hover:text-caribbeangreen-400 hover:scale-105'><FiEdit2 size={20} /></button>
                                <button className='cursor-pointer duration-200 hover:text-pink-400 hover:scale-105' onClick={()=>{deleteSection(course._id)}}><RiDeleteBin6Line size={20} /></button>
                            </div>
                        </div>
                    </div>)  
                })
            }
            </div>
        </div>
      </div>
    </div>
  )
}





