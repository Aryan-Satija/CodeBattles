import React, {useRef} from 'react'
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { CATEGORIES } from '../services/apis';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Footer from '../components/footer';
import CourseSlider  from '../components/CourseSlider';
import { CourseCard } from '../components/CourseCard';
const Catalog = () => {
  const {catalogname} = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [otherCategories, setOtherCategories] = useState(null);
  const [mostSelling, setMostSelling] = useState(null);
  console.log("mostSellingCourses", mostSelling);
  const [active, setActive] = useState(1);
  const fetchCategoryDetails = async()=>{
    try{
        let name = catalogname.split("-").join(" ");
        const response = await apiConnector("POST", 
                    CATEGORIES.CATEGORY_DETAILS,
                    {
                        name: name
                    }
        )
        setSelectedCategory(response.data.data.selectedCategory[0]);
        setOtherCategories(response.data.data.otherCategories);
        setMostSelling(response.data.data.mostSellingCourses);
        console.log(response);
    } catch(err){
        toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }
  }
  useEffect(()=>{
    fetchCategoryDetails();
  }, [catalogname])
  return (
    <>
        <div className='bg-richblack-800 px-4'>
            <div className='flex w-full mt-12 '>
                <div className="mx-4 flex flex-col items-start gap-4 min-h-[260px] max-w-maxContentTab">
                    <p className='text-md pt-20 text-richblack-200'>
                        home/catalog/
                        <span className='text-yellow-25'>
                            {selectedCategory && selectedCategory.name}
                        </span>
                    </p>
                    <p className='text-4xl text-richblack-5'>{selectedCategory && selectedCategory.name}</p>
                    <p className='text-md text-richblack-100'>
                    {
                        selectedCategory && selectedCategory.description
                    }
                    </p>
                </div>
            </div>
            <div className='box-content w-full px-4 py-12 '>
                <div className='text-4xl text-richblack-5'>Courses to get you started</div>
                <div className='my-4 flex items-center text-sm'>
                    <p className={`mr-8 py-2 ${
                                active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`} onClick={()=>{setActive(1)}}>Most Popular</p>
                    <p className={`mr-8 py-2 ${
                                active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`} onClick={()=>{setActive(2)}}>New</p>
                    <p className={`mr-8 py-2 ${
                                active === 3 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`} onClick={()=>{setActive(3)}}>Trending</p>
                </div>
                <div className='relative '>
                {
                    selectedCategory &&
                    <CourseSlider courses={selectedCategory.courses}/>
                }
                {
                    selectedCategory && <div className='h-full w-[80px] absolute bg-gradient-to-r from-richblack-800 via-richblack-800/50 to-richblack-900/0  left-0 top-0 z-10'></div>
                }
                {
                    selectedCategory && <div className='h-full w-[80px] absolute bg-gradient-to-l from-richblack-800 via-richblack-800/50 to-richblack-900/0  right-0 top-0 z-10'></div>
                }
                </div>
            </div>
        </div>
        <div className='box-content bg-richblack-900 w-full px-4 py-12 '>
            <div className='text-4xl text-richblack-5'>Top courses in {selectedCategory && selectedCategory.name}</div>
            <div className='relative mr-12 mt-4'>
                {
                    selectedCategory &&
                    <CourseSlider courses={selectedCategory.courses}/>
                }
                {
                    selectedCategory && <div className='h-full w-[80px] absolute bg-gradient-to-r from-richblack-900 via-richblack-900/50 to-richblack-900/0  left-0 top-0 z-10'></div>
                }
                {
                    selectedCategory && <div className='h-full w-[80px] absolute bg-gradient-to-l from-richblack-900 via-richblack-900/50 to-richblack-900/0  right-0 top-0 z-10'></div>
                }
            </div>
        </div>
        <div className='box-content w-full px-4 py-12 '>
            <div className='text-4xl text-richblack-5'>Frequently Bought Courses</div>
            <div className='relative mr-12 mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {
                    mostSelling && 
                    mostSelling.slice(0, 4).map((course, index)=>{
                        return (<div> 
                                    <CourseCard course={course} key={index}/>
                                </div>)
                    })
                }
            </div>
        </div>
        <Footer/>
    </>
  )
}
export default Catalog;