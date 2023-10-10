import { Link } from "react-router-dom";
import { FooterLink2 } from "../data/footer-links";
import facebook  from "../assets/Images/facebook.svg";
import google  from "../assets/Images/google.svg";
import twitter  from "../assets/Images/twitter.svg";
import youtube  from "../assets/Images/youtube.svg";
import logo from '../assets/Logo/logo.svg'
import { motion, variants } from "framer-motion";
function Footer(){
    const footerVarientsLeft = {
        hidden:{
            x:-200,
            opacity:0
        },
        visible:{
            x: 0,
            opacity: 1,
            type: "spring",
            damping:0,
            when:"beforeChildren",
            staggerChildren:0.5
        }
    }
    const footerListVarientsLeft = {
        hidden:{
            x:-200,
            opacity:0
        },
        visible:{
            x: 0,
            opacity: 1,
            type: "spring",
            damping:0,
        }
    }
    const footerVarientsRight = {
        hidden:{
            x:200,
            opacity:0
        },
        visible:{
            x: 0,
            opacity: 1,
            type: "spring",
            damping:0,
            when:"beforeChildren",
            staggerChildren:0.5
        }
    }
    const footerListVarientsRight = {
        hidden:{
            x:200,
            opacity:0
        },
        visible:{
            x: 0,
            opacity: 1,
            type: "spring",
            damping:0,
        }
    }
    return(
        <div className="flex flex-col lg:flex-row justify-center gap-[6rem] w-screen p-8 bg-richblack-800">
            <motion.div variants={footerVarientsLeft} initial="hidden" whileInView="visible" className="flex flex-wrap gap-16 items-start justify-between">
                <motion.div variants={footerListVarientsLeft} className="flex flex-col gap-4">
                    <div className="text-white/60 text-2xl font-bold flex gap-2">CodeBattles <img src={logo}></img></div>
                    <div className="text-white/60 font-bold">Company</div>
                    <Link className="text-richblack-600">About</Link>
                    <Link className="text-richblack-600">Careers</Link>
                    <Link className="text-richblack-600">Affliates</Link>
                    <div className="flex gap-2">
                        <Link><img src={facebook}></img></Link>
                        <Link><img src={google}></img></Link>
                        <Link><img src={twitter}></img></Link>
                        <Link><img src={youtube}></img></Link>
                    </div>
                </motion.div>
                <motion.div variants={footerListVarientsLeft} className="flex flex-col gap-4">
                    <div className="text-white/60 font-bold">Resources</div>
                    <Link className="text-richblack-600">Article</Link>
                    <Link className="text-richblack-600">Blog</Link>
                    <Link className="text-richblack-600">Chart Sheet</Link>
                    <Link className="text-richblack-600">Code Challenges</Link>
                    <Link className="text-richblack-600">Docs</Link>
                    <Link className="text-richblack-600">Projects</Link>
                    <Link className="text-richblack-600">Videos</Link>
                    <Link className="text-richblack-600">Workspaces</Link>
                    <div className="text-white/60 font-bold">Support</div>
                    <Link className="text-richblack-600">Help Center</Link>
                </motion.div>
                <motion.div variants={footerListVarientsLeft} className="flex flex-col gap-4">
                    <div className="text-white/60 font-bold">Plans</div>
                    <Link className="text-richblack-600">Paid memberships</Link>
                    <Link className="text-richblack-600">For students</Link>
                    <Link className="text-richblack-600">Business solutions</Link>
                    <div className="text-white/60 font-bold">Community</div>
                    <Link className="text-richblack-600">Forums</Link>
                    <Link className="text-richblack-600">Chapters</Link>
                    <Link className="text-richblack-600">Events</Link>
                </motion.div>
            </motion.div>
            <motion.div className="flex flex-wrap gap-16 items-start justify-between">
            {
                FooterLink2.map((links, index)=>{  
                    return(<motion.div variants={footerVarientsRight} initial="hidden" whileInView="visible" key={index} className="flex flex-col gap-8 justify-between">
                        <motion.div variants={footerListVarientsRight} className="text-white/60 font-bold relative cursor-pointer">{
                            links.title
                        }
                        </motion.div>
                        <motion.div variants={footerListVarientsRight} className="flex flex-col justify-between gap-2">
                            {
                                links.links.map((link)=>{
                                    return (
                                        <Link to={link.link} className="text-richblack-600">{link.title}</Link>
                                    )
                                })
                            }
                        </motion.div>
                    </motion.div>) 
                })
            }
            </motion.div>
        </div>
    )
}
export default Footer;