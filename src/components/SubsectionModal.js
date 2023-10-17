import React, { useState } from 'react'
import { RxCross2, RxDropdownMenu } from "react-icons/rx"
import { motion } from 'framer-motion';
import Upload from './Upload';
import { useForm } from 'react-hook-form';
export const SubsectionModal = ({modal, refConstraints}) => {
    const form = useForm();
    const {register, handleSubmit, setValue} = form;
    return (
    <motion.div initial={{scale: 0}} animate = {{scale: modal ? 1: 0}} drag dragConstraints={refConstraints} style={{"backdrop-filter":"blur(10px)"}} className={`absolute top-[-10%] left-[30%] p-24 rounded-md flex flex-col gap-[20px] items-center bg-richblack-700/50 duration-200 `}>
    <div className='flex items-center justify-between'>
        <p className="text-xl font-semibold text-richblack-5">
            Viewing Lecture
        </p>
        <button>
            <RxCross2 className='text-2xl text-richblack-5'/>
        </button>
    </div>
    <form>
        <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            video={true}
        />
        
    </form>
</motion.div>
  )
}
