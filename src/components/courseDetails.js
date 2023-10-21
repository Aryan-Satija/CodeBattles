import {useForm} from 'react-hook-form';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Upload from './Upload';
import { apiConnector } from '../services/apiConnector';
import { COURSE } from '../services/apis';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCourse } from '../slices/courseSlice';
import { Spinner } from './Spinner';
const CourseDetails = ({setPage}) => {
    const form = useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
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
        let newList = [...instructionList];
        newList.splice(index, 1);
        setInstructionList(newList);
    }
	const {register, handleSubmit, setValue} = form;
	const [tagList, setTagList] = useState([]);
	const [tagValue, setTagValue] = useState('');
	const [instructionList, setInstructionList] = useState([]);
	const [instructionValue, setInstructionValue] = useState('');
	const [categoryList, setCategoryList] = useState([]);
    const {token} = useSelector(state=>state.auth);
	useEffect(()=>{
		setValue("tag", tagList);
	}, [tagList]);
	useEffect(()=>{
        const getCategories = async() => {
            const response = await apiConnector("GET", COURSE.COURSE_GET_CATEGORIES);
            console.log('response', response);
            setCategoryList(response?.data?.data);
        }
        getCategories();
        register("tag");
	}, []);
	const util = async(data)=>{
        console.log('data', data);
        try{
            setLoading(true);
            const formData = new FormData();
            formData.append("courseName", data.courseName);
            formData.append("courseDescription", data.courseDescription);
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("price", data.price);
            formData.append("tag", JSON.stringify(data.tag));
            formData.append("category", data.courseCategory);
            formData.append("thumbnailImage", data.courseImage);
            formData.append("status", 'Draft');
            formData.append("instructions", JSON.stringify(instructionList));
            const response = await apiConnector("POST", COURSE.COURSE_CREATE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
            console.log("response", response.data.data);
            dispatch(setCourse(response.data.data));
            localStorage.setItem("course",  JSON.stringify(response.data.data));
            setLoading(false);
            setPage(2);
        } catch(error){
            console.log(error);
        }
    }  
	const submitHandler = async(data)=>{
        toast.promise(
            util(data),
            {
              pending: 'Loading',
              success: 'Course Created Successfully',
              error: 'Something went wrong',
              theme:'dark'
            }
        )
    }  
    return (
        <form onSubmit={handleSubmit(submitHandler)} className='bg-richblack-800 p-[24px] rounded-lg flex flex-col gap-4'>
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
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Categories
            <select  {...register("courseCategory", { required: true })} className='bg-richblack-700 text-richblack-200 p-[12px] w-full rounded-md focus:outline-none'>
                <option value="" disabled>Choose A Category</option>
                {
                    categoryList.map((category)=>{
                        return (<option key={category._id} value={category._id}>{category.name}</option>);
                    })
                }
            </select>
        </label>
        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}/>
        <label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
            Enter Benefits Of The Course
            <textarea placeholder='Enter Description' {...register("courseBenefits")} rows={4} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
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
        <div className='w-full'>
            <button type='submit' className={"float-right cursor-pointer gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-800 duration-200 hover:scale-95"}>Next</button>
        </div>
    </form>)
}
export default CourseDetails;