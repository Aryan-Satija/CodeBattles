import React from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import Footer from '../components/footer.js';
import { COURSE } from '../services/apis';
import { useState, useEffect } from 'react';
import {PiTelevisionSimple} from 'react-icons/pi';
import {RxDropdownMenu} from 'react-icons/rx';
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Rating } from '../components/Rating';
import CTAbutton from '../components/CTAbutton';
import {BsClock, BsCursor, BsColumnsGap, BsBoxSeam} from 'react-icons/bs'
export const CourseDetails = () => {
    const [course, setCourse] = useState(null);
    const [rating, setRating] = useState(0);
    const [sections, setSections] = useState(0);
    const [lectures, setLectures] = useState(0);
    const [duration, setDuration] = useState(0);
    const {courseId} = useParams();
    console.log('course', course);
    async function getRating(){
        const response = await apiConnector("POST", COURSE.COURSES_GET_AVG_RATING, 
        {
            courseId: courseId
        });
        setRating(response.data.averageRating);
    }
    async function getCourseDetails(){
        const response = await apiConnector("POST", 
                                        COURSE.COURSE_GET_DETAILS,
                                        {
                                            courseId: courseId 
                                        }
                                    );
        setCourse(response.data.updatedCourse[0]);
        setSections(response.data.updatedCourse[0].courseContent.length);
        let lec = 0, dur = 0;
        response.data.updatedCourse[0].courseContent.forEach(section => {
            section.subSection.forEach((subsection)=>{
                dur += parseInt(subsection.timeDuration);
            })
            lec += 1;
        });
        setLectures(lec);
        setDuration(dur);
    }
    useEffect(()=>{
        getCourseDetails();
        getRating();
    }, []);
  return (
    <>
        <div className='relative w-full bg-richblack-800'>
            <div className='lg:w-[1260px] mx-auto box-content mt-20 px-4 relative py-4'>
                <div className={`flex flex-col justify-center gap-4 text-lg text-richblack-5 max-w-[768px]`}>
                    <div className="text-4xl font-bold text-richblack-5 sm:text-[42px]"> {course?.courseName} </div>
                    <div className='text-richblack-200'>{course?.courseDescription}</div>
                    <div className='text-md flex flex-wrap items-center gap-2'>
                        <span className='text-yellow-25'>{rating}</span>
                        <Rating rating={rating}/>
                        <span>{`(${course?.ratingAndReviews?.length} reviews)`}</span>
                        <span>{`(${course?.studentsEnrolled?.length} students enrolled)`}</span>
                    </div>
                    <div>
                        <p>
                            Created By {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-5 text-lg">
                        <p className="flex items-center gap-2">
                            {" "}
                            <BiInfoCircle /> Created at 2/12/2022
                        </p>
                        <p className="flex items-center gap-2">
                            {" "}
                            <HiOutlineGlobeAlt /> English
                        </p>
                    </div>
                </div>
                <div className='w-[384px] absolute top-0 right-0 bg-richblack-700 rounded-lg'>
                    {
                        course && <img
                        src={course.thumbnail}
                        className="aspect-auto w-full rounded-t-lg"
                        />
                    }
                    <div className="flex w-full flex-col gap-4 0 py-4 px-4">
                        <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">₹ {course?.price}</p>
                        <CTAbutton yellow={true}>Buy Now</CTAbutton>
                        <CTAbutton yellow={false}>Add To Cart</CTAbutton>
                        <p className='text-center text-richblack-300'>30-Day Money-Back Guarantee</p>
                        <div>
                            <p className='text-md text-richblack-50'>This course includes:</p>
                            <p className='text-caribbeangreen-200 flex items-center gap-2'><BsClock/> 8 hours on-demand video</p>
                            <p className='text-caribbeangreen-200 flex items-center gap-2'><BsCursor/> Lifetime access</p>
                            <p className='text-caribbeangreen-200 flex items-center gap-2'><BsColumnsGap/> Acess on Mobile and TV</p>
                            <p className='text-caribbeangreen-200 flex items-center gap-2'><BsBoxSeam/> Certificate of completion</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='lg:w-[1260px] mx-auto box-content mt-4 flex flex-col gap-2'>
            <div className='text-md text-richblack-100 w-[768px] p-4 border-[1px] border-richblack-700'>
                <div className='text-[24px] text-richblack-5'>What You'll Learn?</div>
                <div>
                {course?.whatYouWillLearn?.split(`\r\n`).map((line)=>{
                    return (<div className='text-richblack-200'>{line}</div>)
                })}
                </div>
            </div>
            <div className='text-md text-richblack-100 w-[768px] p-4 border-[1px] border-richblack-700'>
                <div className='text-[24px] text-richblack-5'>Course Content</div>
                <div className='flex items-center gap-4 mb-4'>
                    <div>• {sections} sections</div>
                    <div>• {lectures} lectures</div>
                    <div>• {Math.floor(duration/3600)}h {Math.floor((duration/60) - (Math.floor(duration/3600)*60))}m</div>
                </div>
                <div>
                    {
                        course?.courseContent?.map((section)=>{
                            return (<details>
                                <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2 bg-richblack-500/40 rounded-sm px-2 '>
                                    <div className='flex items-center gap-2'>
                                        <div>
                                            <RxDropdownMenu className='text-2xl'/>
                                        </div>
                                        <div className='font-semibold text-richblack-50'>{section.sectionName}</div>
                                    </div>
                                </summary>
                                <div>
                                    {
                                        section.subSection.map((subsection)=>{
                                            return (<div className='flex items-center justify-between text-lg pl-6'>
                                                <div className='flex items-center gap-2'>
                                                    <div><PiTelevisionSimple/></div>
                                                    <div>{subsection.title}</div>
                                                </div>
                                                <div className='text-sm'> 
                                                    {
                                                        Math.floor((subsection.timeDuration)/60) < 10 ? `0${Math.floor((subsection.timeDuration)/60)}` : Math.floor((subsection.timeDuration)/60)
                                                    }:
                                                    {
                                                        ( Math.floor(subsection.timeDuration - Math.floor((subsection.timeDuration)/60)*60)) 
                                                    }
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                            </details>)
                        })
                    }
                </div>
            </div>
            <div className='text-md text-richblack-100 w-[768px] p-4 mb-4 border-[1px] border-richblack-700'>
                <div className='text-[24px] text-richblack-5'>Author</div>
                <div className='flex items-center gap-6'>
                    <img src={course?.instructor?.image} className='w-[80px] aspect-square rounded-full'></img>
                    <div className='capitalize text-richblack-5 text-lg'>{course?.instructor?.firstName} {course?.instructor?.lastName}</div>
                </div>
                <div>
                    {
                        course?.instructor?.additionalDetails?.about
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
