import React from 'react';
import { SETTINGS } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { useState, useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import CourseSlider from '../components/CourseSlider';
import { Chart as ChartJS} from 'chart.js/auto';
import { Pie, PolarArea, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
export const InstructorDashboard = () => {
    const {token} = useSelector(state => state.auth);
    const [instructorDetails, setInstructorDetails] = useState(null);
    const [courseLabels, setCourseLabels] = useState([]);
    const [studentDistribution, setStudentDistribution] = useState([]);
    const [incomeDistribution, setIncomeDistribution] = useState([]);
    const [flag, setFlag] = useState(true);
    const getRandomArray = ()=>{
        let res = [];
        for(let i = 0; i < 12; i++){
            let random_number = Math.floor(50*(Math.random()));
            res.push(random_number); 
        }
        return res;
    }
    const pieData = {
        labels: courseLabels,
        datasets: [
          {
            label: flag ? 'Students:' : 'Income:',
            data: flag ? studentDistribution : incomeDistribution,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };      
    const polarData = {
        labels: ["Courses", "Students", "Income"],
        datasets: [
          {
            label: 'points: ',
            data: [courseLabels.length, instructorDetails?.courses?.reduce((accumalator, course)=>{return accumalator + course.studentsEnrolled.length}, 0), (incomeDistribution.reduce((accumalator, current)=>{return accumalator + current}, 0))/1000],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };  
    const lineData = {
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Rating',
            data: getRandomArray(),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };    
    const dashboardData = async()=>{
        const response = await apiConnector("GET", SETTINGS.GET_USER_DETAILS_API, {}, {Authorization: `Bearer ${token}`});
        setInstructorDetails(response.data.data);
        let income = [], students = [], courses = [];
        response.data.data.courses.forEach(course => {
            income.push(course.studentsEnrolled.length*course.price);
            students.push(course.studentsEnrolled.length);
            courses.push(course.courseName);
        });
        setIncomeDistribution(income);
        setStudentDistribution(students);
        setCourseLabels(courses);
    }
   useEffect(()=>{
        dashboardData();
   }, []) 
   return (
    <div className='pr-10 pb-4'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-around'>
            <div className='min-w-[248px] w-full lg:w-1/2 bg-richblack-800/90 rounded-md p-8 mb-8'>
                <div className='w-[200px] mx-auto flex justify-between items-center text-xl text-richblack-400 duration-200 mb-4'>
                    <div onClick={()=>{
                        setFlag(true);
                    }} className={flag ? 'text-richblack-100 bg-richblack-700/60 p-2 rounded-sm cursor-pointer' : 'rounded-sm cursor-pointer'}>Students</div>
                    <div onClick={()=>{
                        setFlag(false);
                    }} className={!flag ? 'text-richblack-100 bg-richblack-700/60 p-2 rounded-sm cursor-pointer' : 'rounded-sm cursor-pointer'}>Income</div>
                </div>
                <Pie data={pieData}/>
            </div>
            <div className='min-w-[248px] w-full lg:w-1/3 p-8 bg-richblack-800/90 rounded-md'>
                <div className='text-richblack-5 text-4xl font-bold'>Statistics</div>
                <div className='text-xl text-richblack-400'>Total Courses : {courseLabels.length}</div>
                <div className='text-xl text-richblack-400'>Total Students : {studentDistribution.reduce((accumalator, current)=>{return accumalator + current}, 0)}</div>
                <div className='text-xl text-richblack-400'>Total Income : ₹{incomeDistribution.reduce((accumalator, current)=>{return accumalator + current}, 0)}</div>
                <PolarArea data={polarData} />
            </div>
        </div>
        <div className='w-full bg-richblack-800/90 p-10 rounded-md flex items-center justify-center mt-10'>
            <Line data={lineData}/>
        </div>
    </div>
  )
}
