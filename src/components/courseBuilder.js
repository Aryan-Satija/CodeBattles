import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { IoAddCircleOutline } from "react-icons/io5"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxCross2, RxDropdownMenu } from "react-icons/rx"
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../services/apiConnector';
import { COURSE } from '../services/apis';
import { setCourse } from '../slices/courseSlice';
import { motion } from 'framer-motion';
import { SubsectionModal } from './SubsectionModal';
import CTAbutton from './CTAbutton';
import { useRef } from 'react';
export const CourseBuilder = ({setPage}) => {
    const [editSectionName, setEditSectionName] = useState(false)
    const {course} = useSelector(state => {
        return state.course;
    });
    const refConstraints = useRef();
    const dispatch = useDispatch();
    console.log('course ->', course);
    const {token} = useSelector((state)=>{
        return state.auth;
    });
    const [modal, setModal] = useState(true);
    const form = useForm();
    const {register, handleSubmit, setValue} = form;
    const addSection = async(data)=>{
        try{
            const response = await apiConnector(
                "POST",
                COURSE.COURSE_ADD_SECTION,
                {
                    "sectionName":data.sectionName,
                    "courseId":course._id 
                },
                {
                    Authorization : `Bearer ${token}`
                }
            )
            dispatch(setCourse(response.data.updatedCourse));
            localStorage.setItem("course", JSON.stringify(response.data.updatedCourse));
            toast.success(`Section Added Successfully`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch(error){
            toast.error(`Something Went Wrong`, {
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
    const deleteSection = async(ID)=>{
        try{
            const response = await apiConnector("POST", 
                                                COURSE.COURSE_DELETE_SECTION, 
                                                {
                                                    "sectionId": ID,
                                                    "courseId": course._id
                                                },
                                                {
                                                    Authorization: `Bearer ${token}`
                                                })
            dispatch(setCourse(response.data.updatedCourse));
            localStorage.setItem("course", JSON.stringify(response.data.updatedCourse));
            toast.success(`Section Deleted Successfully`, {
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
         catch(err){
            console.log(err);
            console.log(err.message);
            toast.error(`Something Went Wrong`, {
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
    <div ref={refConstraints} className='space-y-8 relative rounded-md border-1 border-richblack-700 bg-richblack-800 p-6'>
        <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
        <form onSubmit={handleSubmit(addSection)}>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='sectionName'>Section Name<sup className='text-pink-200'>*</sup></label>
                <input
                    {...register("sectionName")}
                    id="sectionName"
                    placeholder='Add a section to build your course'
                    className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'
                />
            </div>
            <div className='flex items-end gap-2 mt-4'>
                <button className={`cursor-pointer rounded-[8px] px-[24px] py-[12px] text-center flex items-center justify-between gap-2 bg-richblack-900 text-richblack-50 duration-200 hover:scale-95`}>{
                    editSectionName ? "Edit Section Name" : "Create Section" 
                } <IoAddCircleOutline size={20} className="text-yellow-50 font-bold"/></button>
                {
                    editSectionName && <button className='text-sm text-richblack-300 underline'>Cancel Edit</button>
                }
            </div>
        </form>
        {
            course && course.courseContent.length > 0 && (
                <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                    {
                        course?.courseContent.map((section)=>{
                            return (<details key={section._id} open>
                                <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                                    <div className='flex items-center gap-2'>
                                        <RxDropdownMenu className='text-2xl text-richblack-50'/>
                                        <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button>
                                            <MdEdit className='text-xl text-richblack-300'/>
                                        </button>
                                        <button onClick={() => {deleteSection(section._id)}}>
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                        <span className="font-medium text-richblack-300">|</span>
                                        <AiFillCaretDown className={`text-xl text-richblack-300`} />
                                    </div>
                                </summary>
                                <div className='px-6 pb-4'>{
                                    section.subSection.map((data)=>{
                                        return (<div
                                            key={data._id}
                                            className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                        >
                                            <div className='flex items-center gap-x-3 py-2 '>
                                                <RxDropdownMenu className='text-2xl text-richblack-50 '/>
                                                <p className='font-semibold text-richblack-50'>{data.title}</p>
                                            </div>
                                            <div>
                                                <button>
                                                    <MdEdit className='text-xl text-richblack-300'/>
                                                </button>
                                                <button>
                                                    <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                                </button>
                                            </div>
                                        </div>)
                                    })
                                }</div>

                                <button className="flex items-center px-4 rounded-md gap-x-2 py-2 text-yellow-50 bg-yellow-800 border-2 border-yellow-50 duration-200 hover:scale-95">
                                    <FaPlus className="text-lg" />
                                    <p>Add Lecture</p>
                                </button>
                            </details>)
                        })
                    }
                </div>
            )
        }
        <div className='flex justify-end gap-x-4'>
            <button className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-900 py-[8px] px-[20px] font-semibold text-richblack-50 duration-200 hover:scale-95' onClick={()=>{
                setPage(1);
            }}>BACK</button>
            <button className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-900 py-[8px] px-[20px] font-semibold text-richblack-50 duration-200 hover:scale-95' onClick={()=>{
                if(course && course.courseContent.length >= 1){
                    if(course.courseContent.some((section)=>{
                        if(section.length === 0)
                            return true;
                        return false;
                    })){
                        toast.error(`Please Add Atleast One Lecture in every Section`, {
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
                        setPage(3);
                    }
                }
                else{
                    toast.error(`Please Add Atleast One Section`, {
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
            }}>NEXT</button>
        </div>
        <subsectionModal modal={modal} refConstraints={refConstraints} />
    </div>
  )
}
