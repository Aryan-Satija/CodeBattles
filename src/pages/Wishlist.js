import React, {useEffect, useState} from 'react';
import { SETTINGS } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wishlist = () => {
  const [List, SetList] = useState([])
  const navigate = useNavigate();
  const {token} = useSelector(state => state.auth);

  useEffect(()=>{
    const getList = async()=>{
        try{
          const response = await apiConnector("GET", SETTINGS.GET_USER_DETAILS_API, null,{ Authorization : `Bearer ${token}`}) 
          console.log(response);
          SetList(response.data.data.bookmarkedProblems);
        } catch(error){
            console.log(error.message);
        }
    }
    getList();
  }, []);
  return(
    <div className='flex flex-col gap-2'>
        {
            List.map((problem, index)=>{
                return (<div className='text-richblack-200 flex justify-between '>
                    <div onClick={() => {
                                            navigate(`/problem/${problem._id}`)
                                        }} className='flex gap-4'>
                        <div>{index + 1}{`)`}</div>
                        <div className='cursor-pointer hover:text-richblack-50 hover:drop-shadow-xl duration-400 '>{problem.name}</div>
                    </div>
                    <div className = {
                                        problem.difficulty === "Easy" ? "text-caribbeangreen-400 bg-caribbeangreen-25/20 px-2 flex justify-center items-center rounded-full" : 
                                        (problem.difficulty === "Medium" ? "text-yellow-400 bg-yellow-25/20 px-2 flex justify-center items-center rounded-full" : "text-pink-600 bg-pink-400/20 px-2 flex justify-center items-center rounded-full")
                                    }>{problem.difficulty}</div>
                </div>)
            })
        }
    </div>
  )
}
export default Wishlist;