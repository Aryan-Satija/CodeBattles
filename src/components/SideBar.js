import { sidebarLinks } from "../data/dashboard-links";
import { useLocation, matchPath, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icon from "react-icons/vsc";
import {VscSettingsGear} from "react-icons/vsc";
import {BiLogOut} from "react-icons/bi";
import { useState, useEffect } from "react";
function SideBar({modal, setModal}){
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const updateViewportWidth = () => {
        setViewportWidth(window.innerWidth);
    };
    function openModal(){
        
        setModal(!modal);
    }
    useEffect(() => {
        window.addEventListener('resize', updateViewportWidth);
        return () => {
          window.removeEventListener('resize', updateViewportWidth);
        };
    }, []);
    const user = useSelector((state)=>{
        return state.profile;
    });
    const location = useLocation();
    return(<div className="flex gap-2 flex-col">
        {
            sidebarLinks.map((link)=>{
                const ReactIcon = Icon[link.icon];
                if(link.type && link.type === user.user.accountType){
                    return(<div key={link.id} className={`${matchPath({path:link.path}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 ${viewportWidth > 800 ? 'px-8' : 'px-2'} relative`}>
                        <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:link.path}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
                        <Link to={link.path} className="flex gap-2 items-center"><ReactIcon className="text-lg"/> {viewportWidth > 800 ? link.name : ''}</Link>
                    </div>)
                }
                else if(link.type && link.type !== user.user.accountType){
                    return null;
                }
                return(<div key={link.id} className={`${matchPath({path:link.path}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 ${viewportWidth > 800 ? 'px-8' : 'px-2'} relative`}>
                <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:link.path}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
                    <Link to={link.path} className="flex gap-2 items-center"><ReactIcon className="text-lg"/> {viewportWidth > 800 ? link.name : ''}</Link>
                </div>)
            })
        }
        <div className="h-[1px] w-[90%] mx-auto bg-richblack-400 my-2"></div>
        <div className={`${matchPath({path:'/dashboard/settings'}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 ${viewportWidth > 800 ? 'px-8' : 'px-2'} relative`}>
            <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:'/dashboard/settings'}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
            <Link to='/dashboard/settings' className="flex gap-2 items-center"><VscSettingsGear className="text-lg"/> {viewportWidth > 800 ? 'Settings' : ''}</Link>
        </div>
        <div className={`${matchPath({path:'/dashboard/logout'}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 ${viewportWidth > 800 ? 'px-8' : 'px-2'} relative`}>
        <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:'/dashboard/logout'}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
            <button onClick={openModal} className="flex gap-2 items-center"><BiLogOut className="text-lg"/> {viewportWidth > 800 ? 'Log Out' : ''}</button>
        </div>
    </div>)
}
export default SideBar;