import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { COURSE } from '../services/apis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCourse } from '../slices/courseSlice';
export const CoursePublish = () => {
    const form = useForm();
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, getValue, error} = form; 
    const navigate = useNavigate();
    const {token} = useSelector(state=>state.auth);
    const {course} = useSelector(state=>state.course);
    async function util(){
      try{
        await apiConnector("POST", COURSE.COURSE_PUBLISH_API, {
          courseId: course._id,
          category: course.category.name
        }, {
          Authorization: `Bearer ${token}`
        })
        return true;
      } catch(err){
        console.log("error", err);
        return false;
      }
    }
    async function submitHandler(data){
      if(data.public === true){
        toast.promise(
          new Promise(async(resolve, reject)=>{
              if(await util())
                  resolve(1);
              else{
                  const error = new Error("something went wrong");
                  reject(error);
              }
          }),
          {
            pending: 'Loading',
            success: 'Course Created Successfully',
            error: 'Something went wrong',
          })
      }
      localStorage.removeItem("course");
      dispatch(setCourse(null));
      navigate('/dashboard/courses')
    }
    return (<div className="rounded-md border-1 border-richblack-700 bg-richblack-800 p-6">
          <p className="text-2xl font-semibold text-richblack-5">
            Publish Settings
          </p>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="my-6 mb-8">
              <label htmlFor="public" className="inline-flex items-center text-lg">
                <input
                  type="checkbox"
                  id="public"
                  {...register("public")}
                  className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                />
                <span className="ml-2 text-richblack-400">
                  Make this course as public
                </span>
              </label>
            </div>
            <div className="ml-auto flex max-w-max items-center gap-x-4">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900 duration-200 hover:scale-95"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900 duration-200 hover:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>);
}
