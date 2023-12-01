import { Link } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import {
  applyToJobFailure,
  applyToJobStart,
  applyToJobSuccess,
} from '../redux/jobs/jobsSlice'

export interface Job {
  id: number
  slug: string
  name: string
  country: string
  company: {
    company_name: string
  }
  job_type: string
  city: string
  min_annual_salary: number
  max_annual_salary: number
  resource_url: string
  job_description_text: string
}

interface JobCardProps {
  job: Job
  userSlug: string | undefined
  appliedJobs: string[]
}

const JobCard: React.FC<JobCardProps> = ({ job, userSlug, appliedJobs }) => {
  const dispatch = useAppDispatch()
  const applyToJob = async (jobId: string | null | undefined) => {
    try {
      if (!jobId || !userSlug) return
      dispatch(applyToJobStart())
      const res = await fetch(`/api/v1/crm/jobs/apply/${jobId}/${userSlug}`, {
        method: 'POST'
      })
      if (!res.ok) {
        throw new Error('Job not applied')
      }
      const data = await res.json()
      dispatch(applyToJobSuccess(jobId))
      return data
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message)
    }
  }
  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      e.preventDefault()
      const jobDescription = e.currentTarget.querySelector('.job-description')
      const jobId = e.currentTarget.getAttribute('data-id')
      const applyButton = (e.target as Element).closest('.apply__button')
      if (applyButton) {
        if (appliedJobs.includes(jobId as string)) {
          throw new Error('Already applied')
        }
        applyButton.textContent = 'Applied'
        const data = await applyToJob(jobId)
        if (data) {
          applyButton.classList.add('applied')
        }
      } else if (jobDescription) {
        jobDescription.classList.toggle('active')
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(applyToJobFailure(error.message))
      }
    }
  }

  return (
    <div className="job__card" data-id={job.slug} onClick={handleClick}>
      <div className="job__header">
        <h2>{job.name}</h2>
        <p>{job.job_type}</p>
      </div>
      <div className="job__details">
        <p>
          <strong>Company:</strong> {job.company.company_name}
        </p>
        <p>
          <strong>Location:</strong> {job.city}, {job.country}
        </p>
        <p>
          <strong>Salary:</strong> ${job.min_annual_salary} - $
          {job.max_annual_salary} per year
        </p>
      </div>
      <div
        className="job-description"
        dangerouslySetInnerHTML={{ __html: job.job_description_text }}
      />
      <div className="apply__button">
        <Link className="apply__button" to=".">
          {appliedJobs.includes(job.slug) ? 'Applied' : 'Apply Now'}
        </Link>
      </div>
    </div>
  )
}

export default JobCard
