import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './Rating';
import { apiConnector } from '../services/apiConnector';
import { COURSE } from '../services/apis';
export const CourseCard = ({course, isSlider}) => {
    const [rating, setRating] = useState(0);
    async function getRating(){
        const response = await apiConnector("GET", COURSE.COURSES_GET_AVG_RATING, {
            courseId: course._id
        });
        console.log(course._id, response)
        setRating(response.data.averageRating);
    }
    useEffect(()=>{
        getRating();
    }, [course])
    return (<Link>
        <>
            <div className='rounded-lg'>
                <img src={course.thumbnail} className={isSlider ? `aspect-video h-[250px] rounded-md object-fill cursor-pointer` : `h-[400px] w-full rounded-md object-fill cursor-pointer`}></img>
            </div>
            <div >
                <p className='text-xl text-richblack-5'>{course.courseName}</p>
                <p className='text-sm text-richblack-400'>{course.courseDescription}</p>
                <p className='text-md text-richblack-200'>Rs {course.price}</p>
                <Rating rating={rating}/>
                <p className='text-md text-richblack-200'>{rating}/5</p>
            </div>
        </>
    </Link>
  )
}