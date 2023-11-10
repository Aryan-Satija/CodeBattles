import React, { useState, useEffect} from 'react'
import VideoDetailsSidebar from './VideoDetailsSidebar';
import CourseReviewModal from './CourseReviewModal';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"
import { COURSE } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
export const ViewCourse = () => {
  const {courseId} = useParams();
  console.log("courseId", courseId);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  useEffect(() => {
    ;(async () => {
      try{
        const courseData = await apiConnector(
          "POST",
          COURSE.COURSE_GET_FULL_DETAILS,
          {
            courseId
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )
        dispatch(setCourseSectionData(courseData.data.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.data.courseDetails));
        dispatch(setCompletedLectures(courseData.data.completedVideos));
        let lectures = 0
        courseData?.data.courseDetails?.courseContent?.forEach((section) => {
          lectures += section.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures));
      } catch(err){
        console.log(err);
      }
    })()
  }, [])
  return (
    <>
      <div className='relative flex min-h-[100vh]'>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
          <div className="h-[100vh] flex-1 overflow-auto">
            <div >
              <Outlet/>
            </div>
          </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}
