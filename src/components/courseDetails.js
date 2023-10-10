import {useForm} from 'react-hook-form';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Upload from './Upload';
const CourseDetails = ({setPage}) => {
    const form = useForm();
	const displayTag = (event)=>{
		if(event.keyCode === 13 && event.target.value !== ''){
			setTagList((prev)=>{
				return [...prev, tagValue];
			})
			setTagValue('');
		}
	}
    const addInstruction = ()=>{
        if(instructionValue !== ''){
            setInstructionList(prev=>[...prev, instructionValue]);
            setInstructionValue('');    
        }
    }
    const deleteInstruction = (index)=>{
        let newList = [...instructionList]
        newList.splice(index, 1);
        setInstructionList(newList);
    }
	const {register, watch, handleSubmit, setValue} = form;
	const [tagList, setTagList] = useState([]);
	const [tagValue, setTagValue] = useState('');
	const [instructionList, setInstructionList] = useState([]);
	const [instructionValue, setInstructionValue] = useState('');
	console.log(tagList);
	useEffect(()=>{
		setValue("tag", tagList);
	}, [tagList]);
	useEffect(()=>{
		register("tag");
	}, [])
	const submitHandler = (data)=>{
        setPage(2);
        console.log(data);
    }  

    return (<form onSubmit={handleSubmit(submitHandler)} className='bg-richblack-800 p-[24px] rounded-lg flex flex-col gap-4'>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Course Title
            <input placeholder='Enter Your Name'  {...register("courseName")} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
        </label>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Course Short Description
            <textarea placeholder='Enter Description' {...register("courseDescription")} rows={4} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
        </label>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Price
            <input placeholder='Enter Price' {...register("price")} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
        </label>
        <label onKeyDown={displayTag} className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Tags
            <div className='flex flex-wrap gap-4'>
            {
                tagList.map((tag, index)=>{
                    return <div key={index} className='text-yellow-200 py-[6px] px-[12px] min-w-[65px] border-2 border-yellow-200 bg-yellow-800 flex items-center gap-1 justify-center rounded-full'><span className="animate-pulse">#</span>{tag}</div>
                })
            }
            </div>
            <input placeholder='Enter A Tag' value={tagValue} onChange={(event)=>{
                setTagValue(event.target.value);
            }} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
        </label>
        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}/>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Enter Benefits Of The Course
            <textarea placeholder='Enter Description' rows={4} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
        </label>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Instructions
            <input placeholder='Enter Instructions'  value={instructionValue} onChange={(event)=>{
                setInstructionValue(event.target.value);
            }} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
            <div className='font-bold text-yellow-400 text-base' onClick={addInstruction}>ADD</div>
        </label>
        <div className='flex flex-col gap-1 items-start'>
        {
            instructionList.map((instruction, index)=>{
                return (<div key={index} className='text-richblack-200 flex gap-2 items-baseline'>
                    {instruction} <span className='text-richblack-400 text-sm underline cursor-pointer duration-200 hover:text-richblack-100' onClick={()=>{deleteInstruction(index)}}>clear</span>
                </div>)
            })
        }
        </div>
        <div>
            <button className={`cursor-pointer float-right rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-800 text-yellow-200 border-2 border-yellow-200 duration-200 hover:scale-95`}>Next</button>
        </div>
    </form>)
}
export default CourseDetails;