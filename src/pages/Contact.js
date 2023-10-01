import Footer from "../components/footer";
import CTAbutton from "../components/CTAbutton";
function Contact(){
    return(<div className="w-screen mt-[5rem]">
            <div className="w-11/12 mx-auto flex items-start justify-center gap-[10rem]">
                <div className="flex flex-col gap-5 p-6 bg-richblack-800 rounded-md">
                    <div className="flex items-start gap-5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M4.91307 2.65823C6.9877 2.38888 9.10296 2.25 11.2503 2.25C13.3974 2.25 15.5124 2.38885 17.5869 2.65815C19.5091 2.90769 20.8783 4.51937 20.9923 6.38495C20.6665 6.27614 20.3212 6.20396 19.96 6.17399C18.5715 6.05874 17.1673 6 15.75 6C14.3326 6 12.9285 6.05874 11.54 6.17398C9.1817 6.36971 7.5 8.36467 7.5 10.6082V14.8937C7.5 16.5844 8.45468 18.1326 9.9328 18.8779L7.28033 21.5303C7.06583 21.7448 6.74324 21.809 6.46299 21.6929C6.18273 21.5768 6 21.3033 6 21V16.9705C5.63649 16.9316 5.27417 16.8887 4.91308 16.8418C2.90466 16.581 1.5 14.8333 1.5 12.8626V6.63738C1.5 4.66672 2.90466 2.91899 4.91307 2.65823Z" fill="#AFB2BF"/>
                                <path d="M15.75 7.5C14.3741 7.5 13.0114 7.55702 11.6641 7.66884C10.1248 7.7966 9 9.10282 9 10.6082V14.8937C9 16.4014 10.128 17.7083 11.6692 17.8341C12.9131 17.9357 14.17 17.9912 15.4384 17.999L18.2197 20.7803C18.4342 20.9948 18.7568 21.059 19.037 20.9429C19.3173 20.8268 19.5 20.5533 19.5 20.25V17.8601C19.6103 17.8518 19.7206 17.8432 19.8307 17.8342C21.372 17.7085 22.5 16.4015 22.5 14.8938V10.6082C22.5 9.10283 21.3752 7.79661 19.836 7.66885C18.4886 7.55702 17.1259 7.5 15.75 7.5Z" fill="#AFB2BF"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-richblack-5 text-lg font-bold">Chat with us</div>
                            <div className="text-richblack-400 text-sm">
                                <div>Our friendly team is here to help.</div>
                                <div>@mail address</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C6.61522 2.25 2.25 6.61522 2.25 12C2.25 17.3848 6.61522 21.75 12 21.75C17.3848 21.75 21.75 17.3848 21.75 12C21.75 6.61522 17.3848 2.25 12 2.25ZM8.54688 4.50525C5.71517 5.8121 3.75 8.67655 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.3141 20.25 19.8548 16.9387 20.2191 12.7191L19.7582 12.2582C19.5872 12.0872 19.4449 11.8897 19.3367 11.6734L18.2567 9.5133C18.1304 9.26078 17.7939 9.20616 17.5942 9.4058C17.3818 9.61824 17.0709 9.69881 16.782 9.61627L15.5091 9.25259C15.0257 9.11447 14.524 9.40424 14.402 9.892C14.3109 10.2566 14.4588 10.6392 14.7715 10.8476L15.3582 11.2388C15.9489 11.6326 16.0317 12.4684 15.5297 12.9703L15.3295 13.1705C15.1186 13.3815 15 13.6676 15 13.966V14.3768C15 14.7846 14.8892 15.1847 14.6794 15.5344L13.3648 17.7254C12.9834 18.3611 12.2965 18.75 11.5552 18.75C10.9724 18.75 10.5 18.2776 10.5 17.6948V16.5233C10.5 15.6033 9.93989 14.7759 9.08565 14.4343L8.43151 14.1726C7.44978 13.7799 6.87393 12.7566 7.04776 11.7136L7.05479 11.6714C7.1012 11.393 7.19959 11.1257 7.34482 10.8837L7.43423 10.7347C7.92346 9.91928 8.87244 9.49948 9.80485 9.68597L10.9827 9.92153C11.5574 10.0365 12.124 9.69096 12.285 9.12744L12.4935 8.39774C12.6423 7.87721 12.3991 7.32456 11.9149 7.08245L11.25 6.75L11.159 6.84099C10.7371 7.26295 10.1648 7.5 9.56805 7.5H9.38712C9.13927 7.5 8.90098 7.59905 8.72572 7.7743C8.44225 8.05778 8.00817 8.12907 7.64961 7.94979C7.16435 7.70716 6.98836 7.10278 7.26749 6.63757L8.54688 4.50525Z" fill="#AFB2BF"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-richblack-5 text-lg font-bold">Visit us</div>
                            <div className="text-richblack-400 text-sm">
                                <div>Come and say hello at our office HQ.</div>
                                <div>Here is the location/ address</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5H5.87163C6.732 1.5 7.48197 2.08556 7.69064 2.92025L8.79644 7.34343C8.97941 8.0753 8.70594 8.84555 8.10242 9.29818L6.8088 10.2684C6.67447 10.3691 6.64527 10.5167 6.683 10.6197C7.81851 13.7195 10.2805 16.1815 13.3803 17.317C13.4833 17.3547 13.6309 17.3255 13.7316 17.1912L14.7018 15.8976C15.1545 15.2941 15.9247 15.0206 16.6566 15.2036L21.0798 16.3094C21.9144 16.518 22.5 17.268 22.5 18.1284V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5H17.25C8.55151 22.5 1.5 15.4485 1.5 6.75V4.5Z" fill="#AFB2BF"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-richblack-5 text-lg font-bold">Call us</div>
                            <div className="text-richblack-400 text-sm">
                                <div>Mon - Fri From 8am to 5pm</div>
                                <div>+123 456 7890</div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="">
                    <div className="text-richblack-5 text-4xl text-center">Got an Idea? We’ve got the skills. Let’s team up</div>
                    <div className="text-richblack-500 text-base text-center mb-8">Tall us more about yourself and what you’re got in mind.</div>
                    <form className="flex flex-col items-center gap-5">
                        <div className="flex items-center justify-between w-full">
                            <div className="w-[48%]">
                                <label htmlFor="fname" className="text-richblack-5">First Name</label>
                                <input type="text" id="fname" placeholder="Enter first name" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none w-full rounded-sm my-2"/>
                            </div>
                            <div className="w-[48%]">
                                <label htmlFor="lname" className="text-richblack-5">Last Name</label>
                                <input type="text" id="lname" placeholder="Enter Last name" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none w-full rounded-sm my-2"/>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <label htmlFor="email" className="text-richblack-5">Email Address</label>
                            <input type="email" id="email" placeholder="Enter email address" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none rounded-sm my-2"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label htmlFor="contact" className="text-richblack-5">Contact Number</label>
                            <input type="text" maxLength={10} id="contact" plceholder="Enter contact number" className="px-2 py-2 text-richblack-400 bg-richblack-800 focus:outline-none rounded-sm my-2"/>
                        </div>
                        <div className="w-full flex flex-col">
                            <label htmlFor="comments" className="text-richblack-5">Comments</label>
                            <textarea id="comments" rows={10} className="bg-richblack-800 resize-none rounded-sm p-2 my-2 focus:outline-none text-richblack-400" placeholder="enter comments"/>
                        </div>
                        <div className="w-full mb-10">
                            <CTAbutton yellow={true}>Send Message</CTAbutton>
                        </div>
                    </form>
                </div>
        </div>
        <Footer/>
    </div>)
}
export default Contact;