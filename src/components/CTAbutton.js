function CTAbutton({children, yellow}){
    return(
        <div className={`cursor-pointer rounded-[8px] px-[24px] py-[12px] text-center ${yellow ? 'bg-yellow-50 text-richblack-900' : 'bg-richblack-800 text-richblack-50'} duration-200 hover:scale-95`}>
            {children}
        </div>
    )
}
export default CTAbutton;