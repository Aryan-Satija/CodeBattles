import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.js'
import { useState, useEffect } from 'react';
function Dashboard(){
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const updateViewportWidth = () => {
        setViewportWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', updateViewportWidth);
        return () => {
          window.removeEventListener('resize', updateViewportWidth);
        };
    }, []);
    return(<div className='w-screen min-h-screen flex justify-between'>
        <div className='h-screen bg-richblack-800 pt-[6rem] fixed'>
            <SideBar/>
        </div>
        <div style={{width: `calc(100vw - ${viewportWidth > 800 ? '15rem' : '2rem'})` , float: 'right'}} className={`h-screen ${viewportWidth > 800 ? 'ml-[15rem]' : 'ml-[4rem]'} py-[6rem]`}>
            <Outlet/>
        </div>
    </div>)
}
export default Dashboard;