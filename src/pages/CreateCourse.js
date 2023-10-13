import { useState } from 'react';
import {FaCheck} from 'react-icons/fa6'
import CourseDetails from '../components/courseDetails';
import {CourseBuilder} from '../components/courseBuilder';
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
			{
				page === 1 && 
				<CourseDetails setPage={setPage}/>
			}
			{
				page === 2 &&
				<CourseBuilder/>
			}
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