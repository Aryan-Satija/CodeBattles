import { sidebarLinks } from "../data/dashboard-links";
import { useLocation, matchPath, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icon from "react-icons/vsc";
import {VscSettingsGear} from "react-icons/vsc";
import {BiLogOut} from "react-icons/bi";

function SideBar(){
    const user = useSelector((state)=>{
        return state.profile;
    });
    console.log('user', user);
    const location = useLocation();
    console.log(location);
    console.log(location.pathname);
    return(<div className="flex gap-2 flex-col">
        {
            sidebarLinks.map((link)=>{
                const ReactIcon = Icon[link.icon];
                console.log(link.type);
                console.log(user.user.accountType);
                if(link.type && link.type === user.user.accountType){
                    return(<div key={link.id} className={`${matchPath({path:link.path}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 px-8 relative`}>
                        <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:link.path}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
                        <div><ReactIcon className="text-lg"/></div>
                        <Link to={link.path}>{link.name}</Link>
                    </div>)
                }
                else if(link.type && link.type !== user.user.accountType){
                    return null;
                }
                return(<div key={link.id} className={`${matchPath({path:link.path}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 px-8 relative`}>
                <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:link.path}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
                    <div><ReactIcon className="text-lg"/></div>
                    <Link to={link.path}>{link.name}</Link>
                </div>)
            })
        }
        <div className="h-[1px] w-[90%] mx-auto bg-richblack-400 my-2"></div>
        <div className={`${matchPath({path:'/dashboard/settings'}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 px-8 relative`}>
            <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:'/dashboard/settings'}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
            <VscSettingsGear className="text-lg"/>
            <Link to='/dashboard/settings'>Settings</Link>
        </div>
        <div className={`${matchPath({path:'/dashboard/logout'}, location.pathname) ? 'text-yellow-200 bg-yellow-800' : 'text-richblack-200'}  flex items-center gap-4 px-8 relative`}>
        <div className={`h-full w-[0.2rem] absolute top-0 left-0 ${matchPath({path:'/dashboard/logout'}, location.pathname) ? 'bg-yellow-200' : 'bg-opacity-0'}`}></div>
            <BiLogOut className="text-lg"/>
            <button>Log Out</button>
        </div>
    </div>)
}
export default SideBar;