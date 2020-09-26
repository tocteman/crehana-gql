import React, { FunctionComponent } from "react"
import {useRecoilState} from "recoil"
import {companyNameFilter, sliceRange} from "../store/atoms"
import { CompanyNameInputProps } from "../Types"

const CompanyNameFilterInput:FunctionComponent<CompanyNameInputProps>= ({companies}) => {
  const [companyNameFiltered, setCompanyFilter] = useRecoilState(companyNameFilter)
  const [sliced, setSlice] = useRecoilState(sliceRange)
  return (
    <div className="mx-auto flex flex-col max-w-sm">
      <label htmlFor=""
      className="text-tangerine-200">
        Company
      </label>
      <select
      name="companies" 
      className="bg-tangerine-200 px-4 py-2 shadow border-2 border-black rounded-lg"
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