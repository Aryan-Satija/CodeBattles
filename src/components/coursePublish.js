import React from 'react'
import { useForm } from 'react-hook-form'
export const CoursePublish = () => {
    const form = useForm();
    const {register, setValue, getValue, error} = form; 
    return (<div className="rounded-md border-1 border-richblack-700 bg-richblack-800 p-6">
          <p className="text-2xl font-semibold text-richblack-5">
            Publish Settings
          </p>
          <form>
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
                type="button"
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900 duration-200 hover:scale-95"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>);
}
