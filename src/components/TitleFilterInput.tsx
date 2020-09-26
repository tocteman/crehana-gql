import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import { titleFilter } from "../store/atoms"


const TitleFilterInput:FunctionComponent = () => {
  const [titleFiltered, setTitleFilter] = useRecoilState(titleFilter)
  return (
  <div>

  </div>
  )
}

export default TitleFilterInput