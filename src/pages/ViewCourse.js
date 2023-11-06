import React, {useParams, useState, useEffect} from 'react'
import VideoDetailsSidebar from './VideoDetailsSidebar';
import CourseReviewModal from './CourseReviewModal';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
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
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  useEffect(() => {
    ;(async () => {
      const courseData = await apiConnector(
        "POST",
        COURSE.COURSE_GET_DETAILS,
        {
          courseId
        },
        {
          Authorization: `Bearer ${token}`,
        }
      )
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures));
    })()
  }, [])
  return (
    <>
      <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
          <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
            <div className="mx-6">
              <Outlet/>
            </div>
          </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
