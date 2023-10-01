import { Link } from "react-router-dom";
import { NavbarLinks } from "../data/navbar-links";
import logo from '../assets/Logo/logo.svg'
import { matchPath, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const location = useLocation();
    const navigate = useNavigate();
    function util(g_path){
        return matchPath({path: g_path}, location.pathname);
    }
    return( <div className="w-full bg-richblack-800 py-4 fixed z-10 shadow-2xl">
        <div className="w-11/12 mx-auto flex justify-between items-center">
            <div className="text-lg font-bold text-richblack-25 flex items-center gap-2"><Link to="/">CodeBattles</Link> <img src={logo}></img></div>
            <nav className="text-lg text-richblack-25">
                <ul className="flex gap-10">
                    {
                        NavbarLinks.map((link, index)=>{
                            if(link.title === 'Catalog'){
                                return <li key={index} className="cursor-pointer group relative">
                                    {
                                        link.title
                                    }
                                    <div className="lg:w-[20rem] py-4 px-2 bg-richblack-700 rounded-md invisible group-hover:visible absolute top-10 -left-[7.5rem]"></div>
                                    <div className="w-6 h-6 rotate-45 bg-richblack-700 absolute invisible group-hover:visible top-8 left-8"></div>
                                </li>
                            }
                            else{
                                return(
                                    <li key={index}><Link to={link.path} className={`${util(link.path) ? 'text-yellow-200' : ''}`}>{link.title}</Link></li>
                                )
                            }
                        })
                    }
                </ul>
            </nav>
            <div className="flex items-center gap-10">
                <button className={`text-richblack-100 ${util('/signup') ? 'text-yellow-200': ''}`} onClick={()=>{navigate("/signup")}}>SIGN UP</button>
                <button className={`text-richblack-100 ${util('/login') ? 'text-yellow-200': ''}`} onClick={()=>{navigate("/login")}}>LOG IN</button>
            </div>
        </div>
    </div>)
}
export default Navbar;