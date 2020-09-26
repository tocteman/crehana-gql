import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import { titleFilter } from "../store/atoms"
import debounce from "lodash.debounce";


const TitleFilterInput:FunctionComponent = () => {
  const [titleFiltered, setTitleFilter] = useRecoilState(titleFilter)
  const debouncedChange = debounce(eventData => setTitleFilter(eventData), 250);
  const handleChange = (e:string|null) => {
        debouncedChange(e);   
    }

  return (
    <div className="flex flex-col mx-2">
      <label htmlFor=""
      className="text-tangerine-200">
        Search by job title
      </label>
    <input
    placeholder="type here..."
    className="bg-tangerine-200 px-4 py-2 shadow border-2 border-black rounded-lg text-purpureo-900 font-bold text-lg"
    onChange={(e) => handleChange(e.target.value)}
    >
    </input>

  </div>
  )
}

export default TitleFilterInput