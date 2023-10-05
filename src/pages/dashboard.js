import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.js'
import { useState, useEffect } from 'react';
import CTAbutton from '../components/CTAbutton.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice.js';
import { setUser } from '../slices/profileSlice.js';
function Dashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const updateViewportWidth = () => {
        setViewportWidth(window.innerWidth);
    };
    const [modal, setModal] = useState(false);
    useEffect(() => {
        window.addEventListener('resize', updateViewportWidth);
        return () => {
          window.removeEventListener('resize', updateViewportWidth);
        };
    }, []);
    const logout = ()=>{
        setModal(false);
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.clear();
        navigate("/login");
    }
    return(<div className={`w-screen min-h-screen flex justify-between relative`}>
        <div className='h-screen bg-richblack-800 pt-[6rem] fixed'>
            <SideBar modal={modal} setModal={setModal}/>
        </div>
        <div style={{width: `calc(100vw - ${viewportWidth > 800 ? '15rem' : '2rem'})` , float: 'right'}} className={`h-screen ${viewportWidth > 800 ? 'ml-[15rem]' : 'ml-[4rem]'} py-[6rem]`}>
            <Outlet/>
        </div>
        <div style={{"backdrop-filter":"blur(10px)"}} className={`absolute top-[40%] left-[40%] p-24 rounded-md flex flex-col gap-[20px] items-center bg-richblack-600/50 duration-200 ${modal ? 'scale-100' : 'scale-0'}`}>
            <div>
                <div className='text-center text-lg text-richblack-200 font-bold'>Sure About Logging Out?</div>
                <p className='text-richblack-200 text-center text-sm mt-2'>ALL UNSAVED CHANGES WILL BE LOST!</p>
            </div>
            <div className='flex gap-[24px]'>
                <div onClick={()=>{
                    logout();
                }}><CTAbutton yellow={true}>Log Out</CTAbutton></div>
                <div onClick={()=>{setModal(false)}}><CTAbutton>Cancel</CTAbutton></div>
            </div>
        </div>
    </div>)
}
export default Dashboard;