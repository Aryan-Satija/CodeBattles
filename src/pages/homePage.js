import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import CTAbutton from "../components/CTAbutton";
import HighlightedText from "../components/HighlightedText";
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from "../components/CodeBlocks";
import logo1 from "../assets/Logo/fi-sr-badge.svg";
import logo2 from "../assets/Logo/fi-sr-diamond.svg";
import logo3 from "../assets/Logo/fi-sr-fox.svg";
import logo4 from "../assets/Logo/fi-sr-graduation-cap.svg";
import Line from '../components/Line';
import timeLineVideo from '../assets/Images/timelinevideo.mp4'
import planUrProgress from '../assets/Images/Plan_your_lessons.png';
import knowUrProgress from '../assets/Images/Know_your_progress.png';
import compareUrProgress from '../assets/Images/Compare_with_others.png';
import instructor from '../assets/Images/Instructor.png'
import grid from '../assets/Images/frame.png'
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { HomePageExplore } from "../data/tagData";
import { apiConnector } from "../services/apiConnector";
import { CATEGORIES } from '../services/apis.js'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { motion } from "framer-motion";
function Home(){
    const tags = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ];
    const signupData = useSelector((state)=>{
        return state.auth
    });
    console.log(signupData);
    const [categories, setCategories] = useState([]);
    async function fetchCategories(){
        try{
            console.log(CATEGORIES);
            const result = await apiConnector("GET", CATEGORIES.CATEGORIES_API);
            console.log(result);
        } catch(error){
            console.log(error.message);
            console.log('couldn\'t fetch categories')
        }
    }
    useEffect(()=>{
        fetchCategories();
    }, [])
    const [selectedTag, setSelectedTag] = useState("Free");
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    return (
    <div>
        <div className="w-11/12 mx-auto flex flex-col justify-between text-white items-center relative">
            <Link to='/signup'>
                <div className="group bg-richblack-800 text-richblack-200 text-md mt-24 font-bold w-fit duration-200 hover:scale-95 rounded-full border-2 border-richblack-700">
                    <div className="flex flex-row items-center gap-[10px] py-[6px] px-[18px] rounded-full group-hover:bg-richblack-900">
                        <p>Become An Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className="w-[90%] text-4xl font-bold mt-[38px] text-center">Empower Your Future with <HighlightedText text={'Coding Skills'}/></div>
            <div className="text-sm mt-4 text-center font-semibold text-richblack-300 max-w-[800px]">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</div>
            <div className="flex flex-col sm:flex-row justify-around gap-6 mt-4">
                <CTAbutton linkTo={'/signup'} yellow={true}>Learn More</CTAbutton>
                <CTAbutton linkTo={'/login'} yellow={false}>Book A Demo</CTAbutton>
            </div>
            <div className='my-8'>
                <video
                    muted
                    loop
                    autoPlay>
                    <source src={Banner}></source>
                </video>
            </div>
            <CodeBlocks 
                type={1}
                position= {'flex-col md:flex-row md:items-center'}
                title={<div className="text-4xl font-bold">Start <HighlightedText text={'coding potential'}/> with our online courses.</div>}
                body={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                CTAbtn1 = {
                    {
                        content : 'Try it Yourself'
                    }
                }
                CTAbtn2 = {
                    {
                        content : 'Learn More'
                    }
                } 
                color1 = {'#8A2BE2'}
                color2 = {'#FFA500'}
                color3 = {'#F8F8FF'}
            />
            <CodeBlocks 
                type={2}
                position= {'flex-col md:flex-row-reverse md:items-center md:gap-4'}
                title={<div className="text-4xl font-bold">Unlock your <HighlightedText text={'coding in seconds'}/></div>}
                body={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                CTAbtn1 = {
                    {
                        content : 'Continue Lesson'
                    }
                }
                CTAbtn2 = {
                    {
                        content : 'Learn More'
                    }
                } 
                color1 = {'#1FA2FF'}
                color2 = {'#12D8FA'}
                color3 = {'#A6FFCB'}
            />
            <div className="text-4xl font-semibold">Unlock The <HighlightedText text={"The Power Of Code"}></HighlightedText></div>
            <div className="text-base text-richblack-200">Learn to Build Anything You Can Imagine</div>
            <div className="flex flex-col lg:flex-row lg:w-2/3 items-center justify-between cursor-pointer rounded-md lg:rounded-full bg-richblack-800 px-2 py-2 my-4">
                {
                    tags.map((tag, index)=>{
                        return (<div onClick={()=>{
                                        setSelectedTag(tag);
                                        let newCourse = HomePageExplore.filter((course)=>{
                                            if(course.tag === tag){
                                                return course;
                                            }
                                        });
                                        setCourses(newCourse[0].courses);
                                    }} key={index} className={`px-6 py-2 duration-200 rounded-full ${selectedTag === tag ? 'bg-richblack-900' : 'text-richblack-200'}`}>{tag}</div>)
                    })
                }
            </div>
        </div>
        <div className="mx-auto w-11/12 flex flex-col xl:flex-row gap-4 my-4 justify-between items-center xl:translate-y-16">
            {
                courses.map((course, index)=>{
                    return(<motion.div initial={{y:400,opacity:0}} whileInView={{x:0, y:0,opacity:1}} key={index} className="group w-[340px] bg-richblack-800 duration-200 hover:bg-white hover:shadow-[10px_10px_0_0_rgba(255,215,10,1)] cursor-pointer">
                        <div className="px-[2rem] pt-[2rem] pb-[3.25rem] flex flex-col gap-[12px] border-dotted border-b-2 border-richblack-200">
                            <div className="group-hover:text-richblack-900 text-richblack-25 text-[20px] font-semibold">{course.heading}</div>
                            <div className="text-richblack-200">{course.description}</div>
                        </div>
                        <div className="w-full flex justify-between px-[2rem] py-[1rem]">
                            <div className="text-blue-500">level: {course.level}</div>
                            <div className="text-blue-500">{course.lessonNumber} lessons</div>
                        </div>
                    </motion.div>)
                })
            }
        </div>
        <div className="bg-[#F9F9F9] w-screen text-richblack-700 pb-[5.625rem]">
            <div className="bg-shape h-[15rem] w-full flex flex-col-reverse md:flex-row items-center justify-center gap-4">
                <CTAbutton linkTo={'/signup'} yellow={true}>Explore Full Catalog</CTAbutton>
                <CTAbutton linkTo={'/login'} yellow={false}>Learn More</CTAbutton>
            </div>
            <div className="w-11/12 mx-auto mt-[5.625rem]">
                <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
                    <div className="text-richblack-900 text-4xl font-bold">
                        Get the skills you need for a <HighlightedText text={'job that is in demand.'}/>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <div className="flex flex-col md:items-start gap-2">
                            <div className="text-base text-richblack-700">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                            <CTAbutton yellow={true}>Learn More</CTAbutton>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row w-11/12 mx-auto items-center justify-between mt-[4rem]">
                    <div className="flex flex-col justify-between relative">
                        <div className="flex items-center gap-[1.25rem]">
                            <div style={{boxShadow: '0px 0px 62px 0px rgba(0, 0, 0, 0.12)'}}  className="w-[3.25rem] h-[3.25rem] rounded-full bg-white flex items-center justify-center">
                                <img src={logo1}></img>
                            </div>
                            <div>
                                <div className="text-richblack-800 font-bold text-lg">Leadership</div>
                                <div>Fully committed to the success company</div>
                            </div>
                        </div>
                        <Line/>
                        <div className="flex items-center gap-[1.25rem]">
                            <div style={{boxShadow: '0px 0px 62px 0px rgba(0, 0, 0, 0.12)'}} className="w-[3.25rem] h-[3.25rem] rounded-full bg-white flex items-center justify-center">
                                <img src={logo2}></img>
                            </div>
                            <div>
                                <div className="text-richblack-800 font-bold text-lg">Responsibility</div>
                                <div className="text-richblack-700 text-sm">Students will always be our top priority</div>
                            </div>
                        </div>
                        <Line/>
                        <div className="flex items-center gap-[1.25rem]">
                            <div style={{boxShadow: '0px 0px 62px 0px rgba(0, 0, 0, 0.12)'}} className="w-[3.25rem] h-[3.25rem] rounded-full bg-white flex items-center justify-center">
                                <img src={logo3}></img>
                            </div>
                            <div>
                                <div className="text-richblack-800 font-bold text-lg">Flexibility</div>
                                <div>The ability to switch is an important skills</div>
                            </div>
                        </div>
                        <Line/>
                        <div className="flex items-center gap-[1.25rem]">
                            <div style={{boxShadow: '0px 0px 62px 0px rgba(0, 0, 0, 0.12)'}} className="w-[3.25rem] h-[3.25rem] rounded-full bg-white flex items-center justify-center">
                                <img src={logo4}></img>
                            </div>
                            <div>
                                <div className="text-richblack-800 font-bold text-lg">Solve the problem</div>
                                <div>Code your way to a solution</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div style={{
                                        borderRadius: '750px',  
                                        opacity: '0.6',
                                        background: 'var(--gradient-03, linear-gradient(118deg, #9CECFB -9.12%, #65C7F7 48.59%, #0052D4 106.3%))',
                                        filter: 'blur(34px)'
                                    }} className="xl:w-[750px] xl:h-[480px] absolute right-10 top-12 -z-1">
                        </div>
                        <video
                            muted
                            loop
                            autoPlay
                            className="relative z-1 lg:w-[710px] lg:h-[540px]">
                            <source src={timeLineVideo}></source>
                        </video>
                        <div className="w-[510px] h-[130px] bg-caribbeangreen-700 hidden xl:flex p-[2.625rem] justify-between absolute bottom-[0rem] right-[95px]">
                            <div className=" flex items-center pl-6 gap-6">
                                <div className="font-bold text-4xl text-white">10</div>
                                <div className="text-sm uppercase text-caribbeangreen-300">years experience</div>
                            </div>
                            <div className="flex items-center pl-6 gap-6">
                                <div className="font-bold text-4xl text-white">250</div>
                                <div className="text-sm uppercase text-caribbeangreen-300">types of courses</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-[5.625rem] w-11/12 bg-[#F9F9F9] mx-auto mt-[5.625rem]">
                    <div className="uppercase text-richblack-900 text-4xl text-center font-bold">Your swiss knife for <HighlightedText text={'learning any language'}/></div>
                    <div className="text-richblack-700 text-center text-base leading-6">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
                    <div className="flex justify-center items-center">
                        <motion.img width={400} height={400} className="object-contain -mr-24" src={knowUrProgress}></motion.img>
                        <motion.img className="object-contain" src={compareUrProgress}></motion.img>
                        <motion.img width={400} height={400} className="object-contain -ml-28" src={planUrProgress}></motion.img>
                    </div>
                    <div className="flex justify-center items-center">
                        <CTAbutton yellow={true} linkTo={'/signup'}>Learn More</CTAbutton>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-richblack-900 w-screen">
            <div className="py-[90px] w-11/12 mx-auto flex lg:flex-row lg:justify-between justify-center items-center">
                <div className="hidden xl:block w-[616px] h-[545px] relative">
                    <img style={{filter:'blur(5px)'}} className="absolute -left-[2rem] -top-[2rem] rounded-[10%]" src={grid}></img>
                    <img className="absolute" width={550} src={instructor}></img>
                </div>
                <div className="w-[486px]  mx-auto flex flex-col items-start">
                    <div className="text-4xl text-white capitalize font-bold leading-10 mb-8">
                        Become an <br/> <HighlightedText text={'instructor'}/>
                    </div>
                    <div className="text-base font-thin text-richblack-300 mb-16">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div>
                        <CTAbutton yellow={true}>
                            <div className="flex items-center gap-4">
                                Start Teaching Today
                                <div>
                                    <FaArrowRight/>
                                </div>
                            </div>
                        </CTAbutton>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>)
}
export default Home; 