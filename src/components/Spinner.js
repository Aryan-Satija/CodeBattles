import React from 'react'
import "./Spinner.css"
export const Spinner = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <div className="custom-loader"></div>
    </div>
  )
}
