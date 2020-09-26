import React, { FunctionComponent, useState } from "react"
import debounce from "lodash.debounce";
import {useQuery, gql} from "@apollo/client"
import {useRecoilState} from "recoil" 
import { currentJob, cityNameFilter, companyNameFilter, titleFilter, sliceRange } from "./store/atoms";
import CityNameFilterInput from "./components/CityNameFilterInput";
import CompanyNameFilterInput from "./components/CompanyNameFilterInput";
import {Company, City, Job} from "./Types"




const JOBS_QUERY=gql`
query{
	jobs{
    slug
    id
    title
    updatedAt
    company{
      id
      name
      slug
    }
    cities{
      name
      id
      slug
    }
  },
  countries{
    name
    slug
  }
}

`

const Main: FunctionComponent = () => {

  const [companyNameFiltered, setCompanyFilter] = useRecoilState(companyNameFilter)
  const [cityNameFiltered, setCityFilter] = useRecoilState(cityNameFilter)
  const [titleFiltered, setTitleFilter] = useRecoilState(titleFilter)
  const {data, loading, error} = useQuery(JOBS_QUERY, {});



  const [selectedJob, setSelectedJob] = useRecoilState(currentJob)
  const [sliced, setSlice] = useRecoilState(sliceRange)
  const [filterConditions, setFilterConditions] = useState(null)



  const setWordFilter = (eventData:string) => {

  }

  const debouncedChange = debounce(eventData => console.log(eventData), 250);

  const handleChange = (e:string|null) => {
      debouncedChange(e);
      
  }

  const getCompanies = (retrivedJobs:Job[]) => {
    const retrievedCompanies = retrivedJobs.map((job:Job)=> (job.company.name))
    const companies = new Set(retrievedCompanies)
    return Array.from(companies).sort()
  }
  
  if (!data) return <div>fetching</div>

  const getCities = (retrivedJobs:Job[]) => {
    const currentCitiesArrayed = retrivedJobs
    .map((job:Job)=>(job.cities))
    .reduce((acc:any, cum:any)=> acc.concat(cum), [])
    .map((city:City)=> city.name)
    const cities = new Set(currentCitiesArrayed)
    return Array.from(cities).sort()
  }
  
  let currentData = data.jobs
    if (companyNameFiltered.length>0){
      currentData =  currentData.filter(
        (job:Job) => job.company.name === companyNameFiltered)
    }

    if (cityNameFiltered.length>0){
      currentData = currentData
      .filter(
        (job:Job) => 
          (job.cities.map((city:City)=> city.name))
          .includes(cityNameFiltered) === true
      )
    }

    if (titleFiltered.length>0){

    }
    

    const slicedData = currentData.slice(sliced.from, sliced.to)
  

   return (

     <div className="font-sans w-1/2">
       <div>

       <input
        onChange={(e) => handleChange(e.target.value)}
       ></input>
       
       </div>

        <CityNameFilterInput cities={getCities(data.jobs)}/>
        <CompanyNameFilterInput companies={getCities(data.jobs)}/>
  
      {slicedData.map((job:Job) => (
        <div key={job.id}
          className="mt-8"
          onClick={()=> setSelectedJob({slug: job.slug, company: {slug: job.company.slug}})}
        >
          <h2 className="font-bold text-xl bg-white leading-tight">{job.title}</h2>
          <p className=" leading-tight">{job.company.name}</p>
            {job.cities.map((city:City)=>(
              <p className=" leading-tight">{city.name}</p>
          ))}
      </div>
      ))}
      <div onClick={()=> setSlice({from: sliced.from-5, to: sliced.to-5})}>Anterior</div>
      <div onClick={()=>setSlice({from: sliced.from+5,
      to: sliced.to+5})}>Siguiente</div>
    /</div>
   )
}

export default Main


