import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import {cityNameFilter, sliceRange} from "../store/atoms"
import { CityNameInputProps } from "../Types"

const CityNameFilterInput:FunctionComponent<CityNameInputProps> = ({cities}) => {

  const [cityNameFiltered, setCityNameFilter] = useRecoilState(cityNameFilter)
  const [sliced, setSlice] = useRecoilState(sliceRange)

  return (
      <div className="mx-auto flex flex-col max-w-sm">
        <label htmlFor=""
        className="text-tangerine-200">
          City
        </label>
        <select name="city" 
        className="bg-tangerine-200 px-4 py-2 shadow border-2 border-black rounded-lg"
        onChange={(e)=> {
            setCityNameFilter(e.target.value)
            setSlice({from:0, to:5})
            }}>
        <option value="">...</option>
         {cities.map((city:any) => (
           <option key={city} value={city}>{city}</option>
         ))}
        </select>
      </div>
  )
}

export default CityNameFilterInput