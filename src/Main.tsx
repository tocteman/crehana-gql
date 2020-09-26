import React, { FunctionComponent, useState } from "react"
import {useQuery, gql} from "@apollo/client"
import {useRecoilValue, useRecoilState} from "recoil" 
import { currentJob, cityNameFilter, companyNameFilter, titleFilter, sliceRange, currentJobCount } from "./store/atoms";
import CityNameFilterInput from "./components/CityNameFilterInput";
import CompanyNameFilterInput from "./components/CompanyNameFilterInput";
import TitleFilterInput from "./components/TitleFilterInput"
import Paginator from "./components/Paginator"
import Loader from "./components/Loader"
import {City, Job} from "./Types"

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

  const {data, loading, error} = useQuery(JOBS_QUERY, {});
  const companyNameFiltered = useRecoilValue(companyNameFilter)
  const cityNameFiltered = useRecoilValue(cityNameFilter)
  const titleFiltered = useRecoilValue(titleFilter)
  const sliced = useRecoilValue(sliceRange)
  const [selectedJob, setSelectedJob] = useRecoilState(currentJob)
  const [jobCount, setJobCount] = useRecoilState(currentJobCount)

  if (!data || loading || error) return <Loader/>

  const getCompanies = (retrivedJobs:Job[]) => {
    const retrievedCompanies = retrivedJobs.map((job:Job)=> (job.company.name))
    const companies = new Set(retrievedCompanies)
    return Array.from(companies).sort()
  }
  
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
      currentData = currentData.filter(
        (job:Job) => 
          job.title.toLowerCase().replace(" ", "")
          .includes(
            titleFiltered.toLowerCase().replace(" ", "")
          )
      )
    }

    setJobCount(currentData.length)
    const slicedData = currentData.slice(sliced.from, sliced.to)
  

   return (
    <div className="w-full bg-purpureo-700">
      <div className="p-12 max-w-xl mx-auto">
        
        <div>
          <h1
          className="my-8 font-bold text-tangerine-200 cursor-pointer hover:underline hover:text-white"
          onClick={()=> setSelectedJob({slug: "", company: {slug: ""}})}
          >
            gqljobs
          </h1>
       </div>
       <div className="my-2">
        <TitleFilterInput/>
      </div>
      <div className="my-2 flex flex-col md:flex-row w-full justify-between">
        <CityNameFilterInput cities={getCities(data.jobs)}/>
        <CompanyNameFilterInput companies={getCompanies(data.jobs)}/>
      </div>

      <hr className="border-2 border-purpureo-900 my-8"></hr>

      {slicedData.map((job:Job) => (
        <div key={job.id}
          className="mt-8 my-4 px-4 py-3 rounded-lg shadow bg-purpureo-900 cursor-pointer border-2 border-black hover:border-tangerine-200 hover:shadow-lg"
          onClick={()=> setSelectedJob({slug: job.slug, company: {slug: job.company.slug}})}
        >
          <h2 className="font-bold text-xl bg-white leading-tight">{job.title}</h2>
          <div className="flex justify-between items-baseline my-1">
            <p className="text-purple-300 leading-tight text-lg">{job.company.name}</p>
            {job.cities.map((city:City)=>(
              <p className="text-tangerine-200 leading-tight">{city.name}</p>
            ))}
          </div>
        </div>
      ))}
     
      <Paginator/>

      </div>
    </div>
   )
}

export default Main


