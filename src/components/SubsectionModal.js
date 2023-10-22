import React, { useEffect, useState } from 'react'
import { RxCross2, RxDropdownMenu } from "react-icons/rx"
import { motion } from 'framer-motion';
import Upload from './Upload';
import { useForm } from 'react-hook-form';
import { COURSE } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
export const SubsectionModal = ({activeSection, activeSubSection, closeModal, refConstraints, updateUI, add, edit, view}) => {
    const form = useForm();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector(state => state.course);
    const {register, handleSubmit, getValues, setValue} = form;
    console.log("see here", activeSubSection);
    const util = async(data)=>{
        try{
            const formData = new FormData();
            formData.append("sectionId", activeSection);
            formData.append("title", data.lectureTitle);
            formData.append("description", data.lectureDesc);
            formData.append("video", data.lectureVideo);
            await apiConnector("POST", COURSE.COURSE_ADD_SUBSECTION,formData, {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${token}`
            });
            updateUI();
            closeModal();
            return true;
        } catch(error){
            return false;
            console.log("error while adding subsection", error);
        }
    }
    const submitHandler = async(data)=>{
        await toast.promise(
            new Promise(async(resolve, reject)=>{
                if(await util(data)) resolve(1);
                else{
                    const error = new Error("Something went wrong");
                    reject(error);
                }
            }),
            {
              pending: 'Loading',
              success: 'SubSection Created Successfully',
              error: 'Something went wrong',
            }
        )
    }
    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle", activeSubSection.title); 
            setValue("lectureVideo", activeSubSection.videoUrl); 
            setValue("lectureDesc", activeSubSection.description); 
        }
    }, []);
    return (
        <motion.div initial={{scale: 0}} animate = {{scale: activeSection ? 1: 0}} drag dragConstraints={refConstraints} style={{"backdrop-filter":"blur(10px)"}} className={`absolute top-[-45%] left-[30%] px-8 py-8 rounded-md flex flex-col gap-[20px] items-center bg-richblack-700/50 duration-200 `}>
            <div className='flex items-center justify-between'>
                <p className="text-xl font-semibold text-richblack-5">
                    <span>
                        {
                            add ? "Adding" : (view ? "Viewing" : "Editing")
                        }
                    </span> Lecture
                </p>
                <button onClick={closeModal}>
                    <RxCross2 className='text-2xl text-richblack-5'/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-y-4'>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    url={view || edit ? activeSubSection.videoUrl : null}
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
                        readOnly={view}
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
                        readOnly={view}
                    />
                </div>
                <div className="flex justify-end">
                    <button className='text-yellow-50 bg-yellow-800 py-2 px-4 rounded-md border-2 border-yellow-50 duration-200 hover:scale-95'>SAVE</button>
                </div>
            </form>
        </motion.div>
    )
}
