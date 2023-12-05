import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import filterSvg from '../assets/svg/filter.svg'
import { Filter, JobFilter } from '../components/Filter'
import JobCard from '../components/JobCard'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { Svg } from '../components/ui/Svg'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetApplyToJob } from '../redux/jobs/jobsSlice'

export default function Jobs() {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(state => state.user)
  const { appliedJobs, error } = useAppSelector(state => state.jobs)
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
        dispatch(resetApplyToJob())
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

    return () => {
      dispatch(resetApplyToJob())
    }
  }, [filter])
  const handleClick = () => {
    const filterContainer = document.querySelector('.jobs')
    if (filterContainer) {
      filterContainer.classList.toggle('open')
    }
  }

  return (
    <div className="jobs container open">
      <div className="filter__btn--container">
        <button className="filter__btn" onClick={handleClick}>
          <span>
            Filters
            <Svg path={filterSvg} width="18px" height="18px" />
          </span>
        </button>
      </div>
      <JobFilter filter={filter} setFilter={setFilter} jobs={jobs} />
      {error && <ErrorMessage message={error} />}
      <div className="jobs__cards">
        {loading ? (
          <Loader />
        ) : !jobs ? (
          <ErrorMessage message="No jobs found" />
        ) : (
          jobs.map((job: any) => (
            <JobCard
              appliedJobs={appliedJobs}
              key={job.slug}
              job={job}
              userSlug={currentUser.slug}
            />
          ))
        )}
      </div>
    </div>
  )
}
