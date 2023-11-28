import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { useAppSelector } from '../redux/hooks'
import { Filter, JobFilter } from '../components/Filter'

export default function Jobs() {
  const { currentUser } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>({
    job_category: '',
    name: '',
    country: '',
    job_skill: '',
    job_type: ''
  })

  useEffect(() => {
    const queryParams = Object.entries(filter)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    const fetchJobs = async () => {
      try {
        setLoading(true)
        let url
        if (queryParams) {
          url = `/api/v1/crm/jobs/search?${queryParams}`
        } else {
          url = `/api/v1/crm/jobs`
        }
        const res = await fetch(url)
        if (!res.ok) {
          navigate('/login')
          return
        }
        const data = await res.json()
        setJobs(data.data.jobs)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
      }
    }
    fetchJobs()
  }, [filter])

  return (
    <div className="jobs container">
      <JobFilter filter={filter} setFilter={setFilter} jobs={jobs}/>
      <div className="jobs__cards">
        {loading ? (
          <h2>Loading...</h2>
        ) : !jobs ? (
          <h2>No jobs found</h2>
        ) : (
          (jobs.map((job: any) => (
            <JobCard key={job.slug} job={job} userSlug={currentUser.slug} />
          )))
        )}
      </div>
    </div>
  )
}