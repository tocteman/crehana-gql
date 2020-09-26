import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import {cityNameFilter, sliceRange} from "../store/atoms"
import { CityNameInputProps } from "../Types"

const CityNameFilterInput:FunctionComponent<CityNameInputProps> = ({cities}) => {

  const [cityNameFiltered, setCityNameFilter] = useRecoilState(cityNameFilter)
  const [sliced, setSlice] = useRecoilState(sliceRange)

  return (
      <div>
        <label htmlFor="">City</label>
        <select name="city" 
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