import React, { useState, useEffect } from 'react'
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
  } from "react-icons/ti"
export const Rating = ({rating}) => {
  const [full, setFull] = useState(0);
  const [half, setHalf] = useState(0);
  const [empty, setEmpty] = useState(0);
  useEffect(()=>{
    setFull(Math.floor(rating));
    if(rating - Math.floor(rating) === 0){
        setEmpty(5 - Math.floor(rating));
        setHalf(0);
    }
    else{
        setHalf(1);
        setEmpty(5 - Math.floor(rating) - 1);
    }
    
  }, [rating]);  
  return (
    <div className="flex gap-1 text-yellow-100 items-center gap-x-2">
        {
            [...new Array(full)].map(()=>{
                return <span><TiStarFullOutline/></span>
            })
        }
        { 
            [...new Array(half)].map(()=>{
                return <span><TiStarHalfOutline/></span>
            })
        }
        {
            [...new Array(empty)].map(()=>{
                return <span><TiStarOutline/></span>
            })
        }
    </div>
  )
}
