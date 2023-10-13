import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import { IoAddCircleOutline } from "react-icons/io5"
export const CourseBuilder = () => {
    const [editSectionName, setEditSectionName] = useState(false)
    const course = useSelector(state => {
                                            return state.course;
                                        });
   return (
    <div className='space-y-8 rounded-md border-1 border-richblack-700 bg-richblack-800 p-6'>
        <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
        <form>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='sectionName'>Section Name<sup className='text-pink-200'>*</sup></label>
                <input
                    id="sectionName"
                    placeholder='Add a section to build your course'
                    className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'
                />
            </div>
            <div className='flex items-end gap-2 mt-4'>
                <div className={`cursor-pointer rounded-[8px] px-[24px] py-[12px] text-center flex items-center justify-between gap-2 bg-richblack-900 text-richblack-50 duration-200 hover:scale-95`}>{
                    editSectionName ? "Edit Section Name" : "Create Section" 
                } <IoAddCircleOutline size={20} className="text-yellow-50 font-bold"/></div>
                {
                    editSectionName && <button className='text-sm text-richblack-300 underline'>Cancel Edit</button>
                }
            </div>
        </form>
        {
            course && (
                <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                    {
                        course?.courseContent.map((section)=>{

                        })
                    }
                </div>
            )
        }
        <div className='flex justify-end gap-x-4'>
            <button className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-900 py-[8px] px-[20px] font-semibold text-richblack-50 duration-200 hover:scale-95'>BACK</button>
            <button className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-900 py-[8px] px-[20px] font-semibold text-richblack-50 duration-200 hover:scale-95'>NEXT</button>
        </div>
    </div>
  )
}
