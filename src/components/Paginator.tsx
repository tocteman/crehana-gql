import React, { FunctionComponent } from "react"
import {useRecoilState, useRecoilValue} from "recoil"
import { sliceRange, currentJobCount } from "../store/atoms"

const Paginator:FunctionComponent = () => {
  const [sliced, setSlice] = useRecoilState(sliceRange)
  const jobCount = useRecoilValue(currentJobCount)

  const handleSlicePrev =() => {
    if (sliced.from >= 5){
      setSlice({
        from: sliced.from-5,
        to: sliced.to-5
      })
    }
  }

  const jobString = () => {
    if (jobCount < 1) {
      return (
        <div>found no jobs.</div>
      )
    }
    if (jobCount === 1) {
      return (
        <div>found <span className="font-bold">1</span> job.</div>
      )
    }
    if (jobCount > 1){
      return (

        <div>found <span className="font-bold">{jobCount}</span> jobs.</div>
      )
    }
  }

  const handleSliceNext = () => {
    if (sliced.to <= jobCount){
      setSlice({
        from: sliced.from+5,
        to: sliced.to+5
      })}
    }


  return (
  <div className="flex text-bold text-white font-lg my-4 justify-between items-center">
    <div className="flex items-baseline">      
      <div
      onClick={()=> handleSlicePrev()}>
        <svg className="w-8 h-8 text-tangerine-200 hover:text-white underline cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </div>
      <div onClick={()=> handleSliceNext()}>
        <svg className="w-8 h-8 text-tangerine-200 hover:text-white underline cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
    </div>
    <div className="text-tangerine-200 text-lg">
        {jobString()}
    </div>
  </div>
  )
}


export default Paginator