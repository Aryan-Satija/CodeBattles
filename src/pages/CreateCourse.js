import React from 'react';
import { useState } from 'react';
import {FaCheck} from 'react-icons/fa6'
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form';
const steps = [
  	{
		id: 1,
		title: "Course Details"
  	}, 
  	{
		id: 2,
		title: "Course Builder"
  	},
  	{
		id: 3,
		title: "Course Publish"
  	}
]
const CreateCourse = () => {
	const [page, setPage] = useState(1);
	const form = useForm();
	const displayTag = (event)=>{
		if(event.keyCode === 13 && event.target.value !== ''){
			toast.success('Tag Added Successfully', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});  
			setTags((prev)=>{
				return [...prev, tagValue];
			})
			setTagValue('');
		}
	}
	const {register, watch, handleSubmit} = form;
	const [tags, setTags] = useState([]);
	const [tagValue, setTagValue] = useState('');
	const submitHandler = (data)=>{
		console.log(data);
	}
	return (
    <div className='w-full min-h-screen flex gap-4 items-start justify-between pr-8'>
		<div className='w-full flex flex-col gap-8'>
			<div className='text-richblack-50 text-2xl'>My Course</div>
			<div className="flex items-center w-full justify-around relative">
				{
					steps.map((step)=>{
						if(step.id == page)
							return ( <div key={step.id} className="flex flex-col justify-center items-center gap-2">
									<div className="bg-yellow-900 w-[2.5rem] h-[2.5rem] rounded-full border-2 border-yellow-200 text-yellow-200 flex items-center justify-center">{step.id}</div>
									<div className="text-richblack-50">{step.title}</div>
								</div>)
						else if(step.id < page){
							return (<div key={step.id} className="flex flex-col justify-center items-center gap-2">
								<div className="bg-yellow-900 w-[2.5rem] h-[2.5rem] rounded-full border-2 border-yellow-200 text-yellow-200 flex items-center justify-center"><FaCheck/></div>
								<div className="text-richblack-400">{step.title}</div>
							</div>)
						}
						else{
							return (<div key={step.id} className="flex flex-col justify-center items-center gap-2">
								<div className="bg-richblack-800 w-[2.5rem] h-[2.5rem] rounded-full border-2 border-richblack-100 text-richblack-100 flex items-center justify-center">{step.id}</div>
								<div className="text-richblack-400">{step.title}</div>
							</div>)
						}
					})
				}
				<div className={`w-[25%] h-2 border-t-2 border-dotted ${page > 1 ? 'border-yellow-400' : 'border-richblack-200' }  top-5 left-44 absolute`}></div>
				<div className={`w-[25%] h-2 border-t-2 border-dotted ${page > 2 ? 'border-yellow-400' : 'border-richblack-200' } top-5 right-44 absolute`}></div>
			</div>
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
						tags.map((tag, index)=>{
							return <div key={index} className='text-yellow-200 py-[6px] px-[12px] min-w-[65px] border-2 border-yellow-200 bg-yellow-800 flex items-center gap-1 justify-center rounded-full'><span className="animate-pulse">#</span>{tag}</div>
						})
					}
					</div>
					<input placeholder='Enter A Tag'  value={tagValue} onChange={(event)=>{
						setTagValue(event.target.value);
					}} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
				</label>
				<label className='text-richblack-200 cursor-pointer flex flex-col gap-2'>
					Enter Benefits Of The Course
					<textarea placeholder='Enter Description' rows={4} className='bg-richblack-700 text-richblack-50 p-[12px] w-full rounded-md focus:outline-none'/>
				</label>
				<div>
					<button className={`cursor-pointer float-right rounded-[8px] px-[24px] py-[12px] text-center bg-yellow-800 text-yellow-200 border-2 border-yellow-200 duration-200 hover:scale-95`}>Next</button>
				</div>
			</form>
		</div>
		<div className="bg-richblack-800 p-[24px] max-w-[380px] text-richblack-100 rounded-lg flex flex-col gap-4">
			<div className="text-md font-bold">⚡Course Upload Tips</div>
			<div className="flex text-richblack-200 flex-col gap-2 text-sm">
				<div>• Set the Course Price option or make it free.</div>
				<div>• Standard size for the course thumbnail is 1024x576.</div>
				<div>• Video section controls the course overview video.</div>
				<div>• Course Builder is where you create & organize a course.</div>
				<div>• Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</div>
				<div>• Information from the Additional Data section shows up on the course single page.</div>
				<div>• Make Announcements to notify any important</div>
				<div>• Notes to all enrolled students at once.</div>
			</div>
		</div>
    </div>
  )
}
export default CreateCourse;