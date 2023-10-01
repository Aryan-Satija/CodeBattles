import HighlightedText from "../components/HighlightedText";
import about from '../assets/Images/aboutus2.webp';
import banner from '../assets/Images/bannerAbout.mp4'
import Footer from '../components/footer.js';
import Statistics from '../components/statistics.js';
import CTAbutton from '../components/CTAbutton.js';
import {useForm} from 'react-hook-form';
const aboutGridData = 
                    [   
                        {
                            id:1,
                            title:'World-Class Learning for | Anyone, Anywhere',
                            description:'Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.'
                        },
                        {
                            id:2,
                            title:'Curriculum Based on Industry Needs',
                            description:'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.'
                        },
                        {
                            id:3,
                            title:'Our Learning Methods',
                            description:'The learning process uses the namely online and offline.'
                        },
                        {
                            id:4,
                            title:'Certification',
                            description:'You will get a certificate that can be used as a certification during job hunting.'
                        },
                        {
                            id:5,
                            title:'Rating "Auto-grading"',
                            description: 'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.'
                        },
                        {
                            id:6,
                            title:'Ready to Work',
                            description: 'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.'
                        }
                    ]
function About(){
    const {
            register, 
            handleSubmit, 
            watch,
            formState:{
                errors
            }    
        } = useForm();
    return(<div className="w-screen min-h-screen bg-richblack-900 overflow-x-hidden">
            <div className="w-full bg-richblack-700 py-[8rem] flex flex-col justify-center items-center">
                <div className="w-11/12 flex flex-col items-center gap-10">
                    <p className="text-richblack-200">About Us</p>
                    <div className="text-4xl">
                        <div className="text-richblack-5 text-center">Driving Innovation in Online Education for a</div>
                        <div className="text-center"><HighlightedText text={'Brighter Future'}/></div>
                    </div>
                    <div className="w-[500px] text-center text-base text-richblack-400">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>
                    <div>
                        <video
                            muted
                            loop
                            autoPlay className="w-[100%] mx-auto">
                            <source src={banner}></source>
                        </video>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 mx-auto w-11/12 my-[8rem]">
                <div className="text-center text-richblack-400 text-4xl mx-auto pb-[1.5rem]">
                    <span className="bg-gradient-to-b from-[#fc4a1a] to-[#f7b733] bg-clip-text text-transparent">" </span>
                    We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise and community to create an unparalleled educational experience.
                    <span className="bg-gradient-to-b from-[#fc4a1a] to-[#f7b733] bg-clip-text text-transparent"> "</span>
                </div>
                <div className="flex flex-col gap-[5rem] mx-auto px-[5rem]">
                    <div className="flex justify-between items-center">
                        <div className="w-[45%] flex flex-col gap-5">
                            <div className="text-4xl"><HighlightedText text={"Our Founding Story"}/></div>
                            <p className="text-richblack-400 text-lg">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-richblack-400 text-lg">We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div className="w-[45%]">
                            <img src={about}/>
                        </div>
                    </div>S
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-10 w-[45%]">
                            <div className="text-4xl">
                                <HighlightedText text={"Our Vision"}/>
                            </div>
                            <div className="text-lg text-richblack-400">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</div>
                        </div>
                        <div className="flex flex-col gap-10 w-[45%]">
                            <div className="text-4xl">
                                <HighlightedText text={"Our Mission"}/>
                            </div>
                            <div className="text-lg text-richblack-400">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums and live sessions</div>
                        </div>
                    </div>
                </div>
            </div>
            <Statistics/>
            <div className="w-11/12 mx-auto my-[6rem]">
                <div className="grid grid-cols-4">
                {
                    aboutGridData.map((box)=>{
                        if(box.id === 1){
                            return (<div className="col-span-2 flex h-[20rem] flex-col gap-10 py-10 px-5">
                                        <div>
                                            <div className="text-richblack-5 text-4xl">{box.title.split("|")[0]}</div>
                                            <div className="text-4xl"><HighlightedText text={`${box.title.split("|")[1]}`}/></div>
                                        </div>
                                        <div className="text-richblack-400 text-base">{box.description}</div>
                                        <div className="w-1/4">
                                            <CTAbutton yellow={true}>Learn More</CTAbutton>
                                        </div>
                                    </div>)
                        }
                        else{
                            return (<div className={`col-span-1 flex h-[20rem] flex-col gap-10 py-10 px-5 ${box.id % 2 === 0 ? 'bg-richblack-700' : 'bg-richblack-800'} ${box.id === 4 ? 'col-start-2' : ''}`}>
                                        <div className="text-richblack-5 text-2xl">{box.title}</div>
                                        <div className="text-richblack-100 text-base">{box.description}</div>
                                    </div>)
                        }
                    })
                }
                </div>
            </div>
            <div className="w-1/3 mx-auto">
                <div className="text-richblack-5 text-4xl text-center">Get in Touch</div>
                <div className="text-richblack-500 text-base text-center mb-8">We'd love to be here for you, Please fill out this form.</div>
                <form className="flex flex-col items-center gap-5">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-[48%]">
                            <label htmlFor="fname" className="text-richblack-5">First Name</label>
                            <input type="text" id="fname" placeholder="Enter first name" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none w-full rounded-sm my-2"/>
                        </div>
                        <div className="w-[48%]">
                            <label htmlFor="lname" className="text-richblack-5">Last Name</label>
                            <input type="text" id="lname" placeholder="Enter Last name" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none w-full rounded-sm my-2"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="email" className="text-richblack-5">Email Address</label>
                        <input type="email" id="email" placeholder="Enter email address" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none rounded-sm my-2"/>
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="contact" className="text-richblack-5">Contact Number</label>
                        <input type="text" maxLength={10} id="contact" plceholder="Enter contact number" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none rounded-sm my-2"/>
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="comments" className="text-richblack-5">Comments</label>
                        <textarea id="comments" rows={10} className="bg-richblack-800 resize-none rounded-sm p-2 my-2" placeholder="enter comments"/>
                    </div>
                    <div className="w-full mb-10">
                        <CTAbutton yellow={true}>Send Message</CTAbutton>
                    </div>
                </form>
            </div>
            <Footer/>
    </div>)
}
export default About;