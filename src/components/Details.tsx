import React, { FunctionComponent } from 'react'
import {useRecoilValue} from 'recoil'
import { currentJob } from '../store/atoms'
import {useQuery, gql} from "@apollo/client"
import ReactMarkdown from 'react-markdown'
import Laberynth from "../assets/img/laberynth.svg"
import Loader from "../components/Loader"

const SELECTED_JOB_QUERY=gql`
query ($input: JobInput!){
  job (input: $input){
    id
    title
    description
    commitment{
      slug
    }
    cities{
      name
    }
    company{
      name
    }
  }
}
`


const Details:FunctionComponent = () => {

  const selectedJob = useRecoilValue(currentJob)
  const { data, loading, error } = useQuery(SELECTED_JOB_QUERY, {
    variables: {
      input:{
        jobSlug: selectedJob?.slug || "",
        companySlug: selectedJob?.company?.slug
      }
    }
  });
  if (loading) return <Loader/>
  if (!data) {
    return (
      <div className="w-full min-h-screen bg-purpureo-900">
        <img src={Laberynth} alt="" className="pt-12 w-5/6 mx-auto"/>
      </div>
      )
  }

  return (
    <div className="w-full bg-tangerine-200">
      {data.job && 
      <div className="overflow-y-auto; p-16 text-tangerine-200 max-w-xl mx-auto">
        <div>
          <h1 className="font-bold text-4xl leading-tight my-4">
            {data.job.title}
          </h1>
          <div className="font-bold text-3xl my-2 text-purpureo-700 underline">
            {data.job?.company?.name}
            </div>
          <div className="flex text-purpureo-700 mx-auto text-center">
            <div className="bg-purpureo-900 text-tangerine-200 rounded-full px-4 py-1">{data.job?.commitment?.slug || ""}</div>
            <div>
              {data.job?.cities?.map((city:any)=> (
              <div key={city.name} className="bg-purpureo-900 text-tangerine-200 rounded-full px-4 py-1 mx-2">
                {city.name}
              </div>
              ))} 
            </div>
          </div>
        </div>
        <ReactMarkdown 
        source={data.job.description}
        className="leading-normal text-purpureo-900 mt-4"
        escapeHtml={true}
        />
      </div>
      }
    </div>
  )
}

export default Details