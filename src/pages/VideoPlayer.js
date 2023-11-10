import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"
export const VideoPlayer = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (video) => video._id === subSectionId
        )
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
  
  }
  const goToNextVideo = () => {
  
  }
  const isLastVideo = () => { 
  
  }
  const goToPrevVideo = () => {
  
  }
  const handleLectureCompletion = async () => {
  
  }
  return (
    <div className="text-white mt-28">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="2:1"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center"/>

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <div  className={`cursor-pointer rounded-sm px-[24px] py-[12px] font-bold text-center bg-yellow-50 text-richblack-900 duration-200 hover:scale-95`}>Mark As Completed</div>
              )}
              <div onClick={()=>{setVideoEnded(false); playerRef?.current?.seek(0)}} className={`cursor-pointer rounded-sm px-[24px] py-[12px] font-bold text-center bg-yellow-50 text-richblack-900 duration-200 hover:scale-95 mt-4`}>Rewatch</div>
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={goToPrevVideo} className={`cursor-pointer rounded-sm px-[24px] py-[12px] text-center bg-richblack-800 text-richblack-50 duration-200 hover:scale-95`}>Prev</button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading} onClick={goToNextVideo} className={`cursor-pointer rounded-sm px-[24px] py-[12px] text-center bg-richblack-800 text-richblack-50 duration-200 hover:scale-95`}>Next</button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
    </div>
  )
}