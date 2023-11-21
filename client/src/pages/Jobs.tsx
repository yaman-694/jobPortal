import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
interface Job {
  id: number
  name: string
  country: string
}

export default function Jobs() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const jobCardId = e.currentTarget.closest('div[data-id]')
    console.log(jobCardId)
  }
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/v1/crm/jobs')
      if (!res.ok) {
        navigate('/login')
        return
      }
      const data = await res.json()
      setJobs(data.data)
      setLoading(false)
    }
    fetchJobs()
  }, [])
  return (
    <div className="jobCard__container container">
      { loading ? <h2>Loading...</h2> :
        jobs.map((job: Job, index) => (
          <div className="job__card" key={index} data-id={job.id}>
            <h2>{job.name}</h2>
            <p>{job.country}</p>
            <button onClick={handleClick}>apply</button>
          </div>
        ))
      }
    </div>
  )
}
