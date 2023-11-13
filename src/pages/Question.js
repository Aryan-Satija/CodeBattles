import React, {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python'; 
import { dracula } from '@uiw/codemirror-theme-dracula';
import {PiThumbsUpThin, PiThumbsDownThin} from 'react-icons/pi';
import {BsBookmarks, BsPlay, BsCloudArrowUp} from 'react-icons/bs';
import {TbSwitch3} from 'react-icons/tb';
import { apiConnector } from '../services/apiConnector';
import { Editor } from '../services/apis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const initCode = `#include <bits/stdc++.h>
using namespace std;
bool isRectangleOverlap(vector<int>& rec1, vector<int>& rec2){
    // return true or false
}
`
const driverRunCode = `
int main(){
    vector<int> vec1(4);
    vector<int> vec2(4);
    vec1[0] = 0; vec1[1] = 0; vec1[2] = 2; vec1[3] = 2;
    vec2[0] = 1; vec2[1] = 1; vec2[2] = 3; vec2[3] = 3;
    if(isRectangleOverlap(vec1, vec2) == true) cout << "1";
    else cout << "0";
    
    vec1[0] = 0; vec1[1] = 0; vec1[2] = 1; vec1[3] = 1;
    vec2[0] = 1; vec2[1] = 0; vec2[2] = 2; vec2[3] = 1;
    if(isRectangleOverlap(vec1, vec2) == false) cout << "1";
    else cout << "0"; 
    
    vec1[0] = 0; vec1[1] = 0; vec1[2] = 1; vec1[3] = 1;
    vec2[0] = 1; vec2[1] = 1; vec2[2] = 3; vec2[3] = 3;
    if(isRectangleOverlap(vec1, vec2) == false) cout << "1";
    else cout << "0"; 
    return 0;
}
`
export const Question = () => {
    const [userCode, setUserCode] = useState(initCode);
    const [theme, setTheme] = useState('dark');
    const [runOutput, setRunOutput] = useState([]);
    const {token} = useSelector(state => state.auth);
    const runUtil = async()=>{
        try{
            const response = await apiConnector("POST", Editor.RUN_PROGRAM_API, {language: "cpp", code: (userCode + driverRunCode)}, {Authorization : `Bearer ${token}`})
            const responseArray = response.data.output.split('');
            setRunOutput(responseArray);
            console.log(response);
            return true;
        }catch(err){
            console.log(err);
            console.log(err.message);
            return false;
        }
    }
    const run = async()=>{
        await toast.promise(
            new Promise(async(resolve, reject)=>{
                if(await runUtil())
                    resolve(1);
                else{
                    const error = new Error("something went wrong");
                    reject(error);
                }
            }),
            {
              pending: 'Loading',
              success: 'Task Successfull',
              error: 'Task Failed',
            }
        )
    }
    return (
        <div className='mt-[5.25rem]'>
            <div className='flex flex-col lg:flex-row item-center gap-2 px-2'>
                    <div className='text-richblack-50 h-[610px] overflow-y-auto bg-[#282b37] pl-2 flex flex-col gap-y-4 items-start rounded-md pt-2 w-full min-w-[320px]'>
                        {/* question name */}
                        <div className='flex items-center gap-4'>
                            <p className='text-richblack-50 font-bold text-2xl'>Rectangle Overlap</p>
                            <span className='text-2xl cursor-pointer'><BsBookmarks/></span>
                        </div>
                        
                        {/* question tag */}
                        <div className='flex items-center gap-4'>
                            <span className='text-caribbeangreen-200 bg-caribbeangreen-50/20 px-4 py-1 rounded-full'>Easy</span>
                            <span className='text-2xl cursor-pointer'><PiThumbsUpThin/></span>
                            <span className='text-2xl cursor-pointer'><PiThumbsDownThin/></span>
                        </div>

                        {/* question description */}
                        <p className='text-richblack-200 text-md'>
                            An axis-aligned rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) is the coordinate of its bottom-left corner, and (x2, y2) is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.
                            Two rectangles overlap if the area of their intersection is positive. To be clear, two rectangles that only touch at the corner or edges do not overlap.
                            Given two axis-aligned rectangles rec1 and rec2, return true if they overlap, otherwise return false.
                        </p>
                
                        {/* example inputs */}
                        <div className='text-richblack-100 flex flex-col gap-y-4'>
                            <p>
                                <p className='text-richblack-100 font-bold'>Example 1:</p>
                                <p className='px-4'>Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]</p>
                                <p className='px-4'>Output: true</p>
                            </p>
                            <p>
                                <p className='text-richblack-100 font-bold'>Example 2:</p>
                                <p className='px-4'>Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]</p>
                                <p className='px-4'>Output: false</p>
                            </p>
                            <p>
                                <p className='text-richblack-100 font-bold'>Example 3:</p>
                                <p className='px-4'>Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]</p>
                                <p className='px-4'>Output: false</p>
                            </p>
                        </div>
                    </div>
                <div className='w-full'>
                    <div className={theme === 'dark' ? `bg-richblack-800 h-4 rounded-tr-md rounded-tl-md` : `bg-richblack-50 h-4 rounded-tr-md rounded-tl-md`}></div>
                    {
                        runOutput.length == 0 ? (<CodeMirror
                                style={{borderRadius: '10px'}}
                                value={userCode}
                                height={"580px"}
                                theme={theme === 'dark' ? dracula : 'light'}
                                mode = "python"
                                extensions={[javascript({ jsx: true }), python({py: true})]}
                                onChange={(value)=>{
                                    setUserCode(value);
                                }}
                            />) : (
                                <div className={theme == 'dark' ? 'bg-richblack-700' : 'bg-richblack-100'}>
                                    {
                                        runOutput.map((outcome, i)=>{
                                            if(outcome === '0'){
                                                return (<p key={i} className='px-2 text-[#f44336] bg-[#e57373]/10'>WA</p>)
                                            }
                                            else{
                                                return (<p key={i} className='px-2 text-caribbeangreen-400 bg-caribbeangreen-100/10'>AC</p>)
                                            }
                                        })
                                    }
                                </div>
                            )
                    }
                    <div className={theme === 'dark' ? `bg-richblack-800 h-4 rounded-br-md rounded-bl-md` : `bg-richblack-50 h-4 rounded-br-md rounded-bl-md`}></div>
                </div>
            </div>
            <div className='pr-2 flex gap-4 items-center justify-end mt-2 flex-col sm:flex-row'>
                <div onClick={()=>{
                                    if(runOutput.length === 0)
                                        run();
                                    else setRunOutput("");
                                }} className='flex items-center gap-2 cursor-pointer hover:scale-90 duration-200 text-richblack-50 bg-richblack-400/20 px-4 py-1 rounded-full'>
                    <div className='text-2xl'>
                        <BsPlay/> 
                    </div>
                    <div>
                    {
                        runOutput.length === 0 ? <p>RUN</p> : <p>EDITOR</p>
                    }
                    </div>
                </div>
                <div className='flex items-center gap-2 cursor-pointer hover:scale-90 duration-200 text-caribbeangreen-200 bg-caribbeangreen-50/20 px-4 py-1 rounded-full'>
                    <div className='text-2xl'>
                        <BsCloudArrowUp/> 
                    </div>
                    <div>
                        SUBMIT
                    </div>
                </div>
                <div onClick={()=>{
                    if(theme == 'dark') 
                        setTheme('light');
                    else 
                        setTheme('dark');
                }} className='flex items-center gap-2 cursor-pointer hover:scale-90 duration-200 text-richblack-50 bg-richblack-400/20 px-4 py-1 rounded-full'> 
                    <div className='text-2xl'>
                        <TbSwitch3/> 
                    </div>
                    <div>
                        SWITCH THEME
                    </div>
                </div>
            </div>
        </div>
  )
}
