import React, { FunctionComponent } from 'react'
import {useRecoilValue} from 'recoil'
import { currentJob } from '../store/atoms'
import {useQuery, gql} from "@apollo/client"
import ReactMarkdown from 'react-markdown'

const SELECTED_JOB_QUERY=gql`
query ($input: JobInput!){
  job (input: $input){
    id
    title
    description
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
  if (!data) {
    return (
      <div className="w-1/2">
        "wait"
      </div>
      )
  }




  return (
    <div className="w-1/2">
      {data.job && 
      <div className="overflow-y-auto; p-16">
        <ReactMarkdown 
        source={data.job.description}
        className="leading-normal"
        escapeHtml={true}
        
        />
      </div>
      }
    </div>
  )
}

export default Details