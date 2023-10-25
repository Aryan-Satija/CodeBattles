import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { CourseCard } from './CourseCard';
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
const CourseSlider = ({courses}) => {
    return ( <>
        <Swiper
            slidesPerView={1}
            breakpoints={{
                1024:{
                    slidesPerView: 3
                }
            }}
            autoplay={{
                delay: 1500,
                disableOnInteraction: false,
            }}
            spaceBetween={25}
            modules={[Autoplay, FreeMode, Pagination]}
            loop={true}
            className='max-h-[30rem]'
        >
        {
            courses.map((course, index)=>{
                return (<SwiperSlide key={index}>
                    <CourseCard course={course} isSlider={true}/>
                </SwiperSlide>);
            })
        }
        </Swiper>
    </>
  )
}
export default CourseSlider;