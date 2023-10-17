import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css'
import '../components/Spinner.css';
import { apiConnector } from '../services/apiConnector';
import { SETTINGS } from '../services/apis';
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import {FaGraduationCap} from "react-icons/fa6";
import { motion, variant } from 'framer-motion';
const EnrolledCourses = () => {
    const [courses, setCourses] = useState(null);
    const {token} = useSelector((state)=>{
        return state.auth;
    })
    console.log(courses);
    async function fetchData(){
        try{
            const response = await apiConnector("GET", 
                                                    SETTINGS.GET_ENROLLED_COURSES_API, 
                                                    null,
                                                    {
                                                        authorization: `Bearer ${token}`
                                                    });
            setCourses(response.data.data);
        } catch(error){
            console.log("error occured");
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchData();
    }, []);
  return (
    <div className='w-full min-h-screen'>
        {
            !courses ? (<div className='w-full h-[80vh] flex flex-col justify-center items-center pr-6'><div className='custom-loader'></div></div>) : (<>
                <div className='text-richblack-5 text-2xl font-bold mb-4 flex gap-2 items-center'>
                    <FaGraduationCap/>
                    ENROLLED COURSES
                </div>
                <div className='flex flex-col gap-6 pr-6'>
                {
                    courses.map((course,index)=>{
                        return (<motion.div initial={index%2 === 0 ? {x:-400, opacity:0} : {x:400, opacity:0}} whileInView={{x:0, y:0, opacity:1, transition:{duration:0.4}}} className='bg-richblack-800 py-2 px-2 w-full rounded-md flex flex-col xl:flex-row gap-6 items-start'>
                                    <div className='cursor-pointer'>
                                        <img src={course.thumbnail} className='md:w-[400px] aspect-video object-fill rounded-md cursor-pointer relative'></img>
                                    </div>
                                    <div className='sm:flex flex-col gap-3 hidden'>
                                        <div className='text-richblack-100 text-xl font-bold'>{course.courseName}</div>
                                        <div className='text-richblack-200 text-md'>{course.courseDescription}</div>
                                        <div className='flex items-center gap-4'>
                                            {
                                                course.tag.map((tag)=>{
                                                    return (<div className='p-2  flex items-center justify-center rounded-full h-[2rem] bg-yellow-800 text-yellow-200 border-2 border-yellow-200'>{tag}</div>)
                                                })
                                            }
                                        </div>
                                        <div className='text-richblack-400 text-md font-bold'>{course.studentsEnrolled.length} students enrolled</div>
                                        <div>
                                            <span className='text-caribbeangreen-200 text-md font-bold'>₹ {course.price}</span>
                                        </div>
                                        <div className='w-full'>
                                            <ProgressBar completed={75}
                                            padding={"2px"}
                                            height={"15px"}
                                            borderRadius={"10px"}
                                            bgColor={"rgba(10, 120, 90)"}
                                            />
                                        </div>
                                    </div>
                                </motion.div>)
                    })
                }
                </div>
            </>)
        }
    </div>
  )
}
export default EnrolledCourses;