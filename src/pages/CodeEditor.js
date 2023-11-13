import React, {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Editor } from '../services/apis';
import { useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { toast } from 'react-toastify';
export const CodeEditor = () => {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");
    console.log(language);
    const {token} = useSelector((state) => {return state.auth});
    const [loading, setLoading] = useState(false);
    const runUtil = async()=>{
        try{
            setLoading(true);
            const {data} = await apiConnector("POST", Editor.RUN_PROGRAM_API,
                                                {
                                                    language, 
                                                    code
                                                }, 
                                                {
                                                    Authorization: `Bearer ${token}`
                                                });
            setOutput(data.output);
            setLoading(false);
            return true;
        } catch(error){
            console.log(error);
            setOutput("");
            setLoading(false);
            return false;
        }
    }
    const runProgram = async()=>{
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
    <>
        <div className='pr-6 flex gap-4 justify-between'>
            <div className='w-full'>
                <CodeMirror
                    value={code}
                    height={"600px"}
                    theme={dracula}
                    mode = "python"
                    extensions={[javascript({ jsx: true }), python({py: true})]}
                    onChange={(value)=>{
                        setCode(value);
                    }}
                />
                <div className='mt-[0.4rem] flex justify-between items-center'>
                    <button disabled={loading} onClick={runProgram} className={`cursor-pointer rounded-sm px-[24px] py-[8px] text-center bg-richblack-800 text-richblack-50 duration-200 hover:scale-95`}>RUN</button>
                    <div className=''>
                        <span className='text-richblack-50'>LANGUAGE: </span>
                        <select onChange={(event)=>{setLanguage(event.target.value)}} className='bg-richblack-600 py-[8px] outline-none text-richblack-200 cursor-pointer'>
                            <option value={'cpp'}>C++</option>
                            <option value={'py'}>PYTHON</option>
                            <option value={'java'}>JAVA</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='w-[500px] h-[560px] bg-richblack-800'>
                <p className='p-2 text-richblack-200'>OUTPUT</p>
                <textarea className='p-2 text-richblack-50 bg-richblack-800 w-full h-full' readOnly={true} value={output}>
                </textarea>
            </div>
        </div>
    </>
  )
}
