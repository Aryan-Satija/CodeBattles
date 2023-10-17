import React, { useState } from 'react'
import { RxCross2, RxDropdownMenu } from "react-icons/rx"
import { motion } from 'framer-motion';
import Upload from './Upload';
import { useForm } from 'react-hook-form';
import { COURSE } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export const SubsectionModal = ({activeSection, setActiveSection, refConstraints, updateUI}) => {
    const form = useForm();
    const {token} = useSelector((state) => state.auth);
    console.log("token: ", token);
    const {register, handleSubmit, setValue} = form;
    const submitHandler = async(data)=>{
        console.log(data);
        console.log(activeSection);
        try{
            const formData = new FormData();
            formData.append("sectionId", activeSection);
            formData.append("title", data.lectureTitle);
            formData.append("description", data.lectureDesc);
            formData.append("video", data.lectureVideo);
            const response = await apiConnector("POST", COURSE.COURSE_ADD_SUBSECTION,formData, {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${token}`
            });
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
            updateUI();
            setActiveSection(null);
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
            console.log("error while adding subsection", error);
        }
    }
    return (
        <motion.div initial={{scale: 0}} animate = {{scale: activeSection ? 1: 0}} drag dragConstraints={refConstraints} style={{"backdrop-filter":"blur(10px)"}} className={`absolute top-[-65%] left-[30%] px-8 py-8 rounded-md flex flex-col gap-[20px] items-center bg-richblack-700/50 duration-200 `}>
            <div className='flex items-center justify-between'>
                <p className="text-xl font-semibold text-richblack-5">
                    Viewing Lecture
                </p>
                <button>
                    <RxCross2 className='text-2xl text-richblack-5'/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-y-4'>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    video={true}
                />
                <div className='flex flex-col space-y-2'>
                    <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>Lecture Title</label>
                    <input
                        type='text' 
                        id="lectureTitle"
                        placeholder="Enter Lecture Title"
                        {...register("lectureTitle", { required: true })}
                        className="bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                    Lecture Description <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                    id="lectureDesc"
                    placeholder="Enter Lecture Description"
                    {...register("lectureDesc", { required: true })}
                    className="bg-richblack-700 text-richblack-50 p-[12px]  rounded-md focus:outline-none resize-x-none min-h-[100px] w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <button className='text-yellow-50 bg-yellow-800 py-2 px-4 rounded-md border-2 border-yellow-50'>SAVE</button>
                </div>
            </form>
        </motion.div>
    )
}
