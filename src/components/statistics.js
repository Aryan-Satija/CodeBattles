import { useState, useEffect } from 'react';
const Statistics = () => {
        const statistics = [
            { title: 'active students', count: 5000 },
            { title: 'active instructors', count: 10 },
            { title: 'coding problems', count: 200 },
            { title: 'courses', count: 20 },
        ];
    
        const [studentCnt, setStudentCnt] = useState(0);
        const [instructorCnt, setInstructorCnt] = useState(0);
        const [problemCnt, setProblemCnt] = useState(0);
        const [courseCnt, setCourseCnt] = useState(0);
        useEffect(() => {
            let studentInterval = setInterval(() => {
              setStudentCnt((prevStudentCnt) => {
                if (prevStudentCnt === statistics[0].count) {
                  clearInterval(studentInterval);
                  return prevStudentCnt;
                }
                return prevStudentCnt + 1;
              });
            }, 5);
          
            return () => {
              clearInterval(studentInterval);
            };
          }, [studentCnt]);
          
          useEffect(() => {
            let instructorInterval = setInterval(() => {
              setInstructorCnt((prevInstructorCnt) => {
                if (prevInstructorCnt === statistics[1].count) {
                  clearInterval(instructorInterval);
                  return prevInstructorCnt;
                }
                return prevInstructorCnt + 1;
              });
            }, 5);
          
            return () => {
              clearInterval(instructorInterval);
            };
          }, [instructorCnt]);
          
          useEffect(() => {
            let problemInterval = setInterval(() => {
              setProblemCnt((prevProblemCnt) => {
                if (prevProblemCnt === statistics[2].count) {
                  clearInterval(problemInterval);
                  return prevProblemCnt;
                }
                return prevProblemCnt + 1;
              });
            }, 5);
          
            return () => {
              clearInterval(problemInterval);
            };
          }, [problemCnt]);
          
          useEffect(() => {
            let courseInterval = setInterval(() => {
              setCourseCnt((prevCourseCnt) => {
                if (prevCourseCnt === statistics[3].count) {
                  clearInterval(courseInterval);
                  return prevCourseCnt;
                }
                return prevCourseCnt + 1;
              });
            }, 5);
          
            return () => {
              clearInterval(courseInterval);
            };
          }, [courseCnt]);
    return (
        <div className="bg-richblack-700 py-[90px] px-[120px] flex justify-between">
            <div>
                <div className="text-richblack-100 text-center text-3xl font-bold">{studentCnt} +</div>
                <div className='text-richblack-500 font-bold'>Active Students</div>
            </div>
            <div>
                <div className="text-richblack-100 text-center text-3xl font-bold">{instructorCnt} +</div>
                <div className='text-richblack-500 font-bold'>Active Instructors</div>
            </div>
            <div>
                <div className="text-richblack-100 text-center text-3xl font-bold">{problemCnt} +</div>
                <div className='text-richblack-500 font-bold'>Coding Problems</div>
            </div>
            <div>
                <div className="text-richblack-100 text-center text-3xl font-bold">{courseCnt} +</div>
                <div className='text-richblack-500 font-bold'>Courses</div>
            </div>
        </div>
    )
}
export default Statistics;