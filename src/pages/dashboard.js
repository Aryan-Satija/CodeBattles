import SideBar from '../components/SideBar.js'
function Dashboard(){
    return(<div className='w-screen min-h-screen'>
        <div className='min-h-screen float-left bg-richblack-800 px-8 pt-[6rem]'>
            <SideBar/>
        </div>
    </div>)
}
export default Dashboard;