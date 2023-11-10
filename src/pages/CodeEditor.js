import React, {useState} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
export const CodeEditor = () => {
    const [code, setCode] = useState("");
    console.log(code);
    return (
    <>

        <div className='pr-6 flex gap-4 justify-between'>
            <div className='w-full'>
                <CodeMirror
                    value={code}
                    height={"625px"}
                    theme={dracula}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value)=>{
                        setCode(value);
                    }}
                />
            </div>
            <div className='w-[500px] h-[625px] bg-richblack-800'>

            </div>
        </div>
    </>
  )
}
