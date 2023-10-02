import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar.js'
function Dashboard(){
    return(<div className='w-screen min-h-screen flex justify-between'>
        <div className='min-h-screen float-left bg-richblack-800 pt-[6rem]'>
            <SideBar/>
        </div>
        <div style={{width:'calc(100vw - 13.5rem)'}}>
            <Outlet/>
        </div>
    </div>)
}
export default Dashboard;