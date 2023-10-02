import { sidebarLinks } from "../data/dashboard-links";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
    return(<div className="flex gap-2 flex-col">
        {
            sidebarLinks.map((link)=>{
                const ReactIcon = Icon[link.icon];
                console.log(link.type);
                console.log(user.user.accountType);
                if(link.type && link.type === user.user.accountType){
                    return(<div key={link.id} className="text-richblack-200 flex items-center gap-4">
                        <div><ReactIcon className="text-lg"/></div>
                        <Link to={link.path}>{link.name}</Link>
                    </div>)
                }
                else if(link.type && link.type !== user.user.accountType){
                    return null;
                }
                return(<div key={link.id} className="text-richblack-200 flex items-center gap-4">
                    <div><ReactIcon className="text-lg"/></div>
                    <Link to={link.path}>{link.name}</Link>
                </div>)
            })
        }
        <div className="h-[1px] w-full bg-richblack-400 my-2"></div>
        <div className="text-richblack-200 flex items-center gap-4">
            <VscSettingsGear className="text-lg"/>
            <Link>Settings</Link>
        </div>
        <div className="text-richblack-200 flex items-center gap-4">
            <BiLogOut className="text-lg"/>
            <button>Log Out</button>
        </div>
    </div>)
}
export default SideBar;