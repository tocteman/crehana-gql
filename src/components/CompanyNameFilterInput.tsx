import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import {companyNameFilter, sliceRange} from "../store/atoms"
import { CompanyNameInputProps } from "../Types"

const CompanyNameFilterInput:FunctionComponent<CompanyNameInputProps>= ({companies}) => {
  const [companyNameFiltered, setCompanyFilter] = useRecoilState(companyNameFilter)
  const [sliced, setSlice] = useRecoilState(sliceRange)
  return (
    <div>
  <label htmlFor="">Company</label>
          <select name="companies" 
          onChange={(e)=> {
            setCompanyFilter(e.target.value)
            setSlice({from: 0, to:5})
            }}>
         <option value="">...</option>
         {companies.map((company:string) => (
           <option key={company} value={company}>{company}</option>
         ))}
       </select>
  </div>
  )
}

export default CompanyNameFilterInput