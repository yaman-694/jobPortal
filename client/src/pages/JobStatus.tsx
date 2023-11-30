import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import Loader from '../components/ui/Loader'
import StatusTag from '../components/ui/StatuTag'

interface IJobStatusCardProps {
  jobs: any[]
  category?: string
}

const appliedCategories = ['Applied', 'Assigned']
const offeredCategories = ['Offered', 'Selected', 'Placed']
const rejectedCategories = [
  'Rejected',
  'Did Not Join',
  'Interview Not Attended'
]


const JobStatusCardCategory: React.FC<IJobStatusCardProps> = ({
  jobs,
  category
}) => {
  return (
    <div className="job__status--categories">
      <span className="status__heading">{category}</span>
      {jobs.map((job: any) => {
        if (
          category === 'Applied' &&
          !appliedCategories.includes(job.candidate_status)
        )
          return null
        if (
          category === 'In Progress' &&
          (appliedCategories.includes(job.candidate_status) ||
            offeredCategories.includes(job.candidate_status) ||
            rejectedCategories.includes(job.candidate_status))
        )
          return null
        if (
          category === 'Offered' &&
          !offeredCategories.includes(job.candidate_status)
        )
          return null
        if (
          category === 'Rejected' &&
          !rejectedCategories.includes(job.candidate_status)
        )
          return null
        return (
          <div key={job.job_slug} className="job__status--item card">
            <div className="job__status--item__title">
              <span>{job.job_name}</span>
              <span>{job.company_name}</span>
            </div>
            <div className="job__status--stage">
              <StatusTag status={job.candidate_status} />
              {/* <StatusTag status="applied" />
              <StatusTag status="assigned" />
              <StatusTag status="Placed" />
              <StatusTag status="Selected" />
              <StatusTag status="Offered" />
              <StatusTag status="Rejected" />
              <StatusTag status="Did Not Join" />
              <StatusTag status="Interview Not Attended" /> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const JobStatusCard: React.FC<IJobStatusCardProps> = ({ jobs }) => {
  return (
    <div className="job__stats">
      <div className="total__application">
        <span>Applied on</span>
        <span>{jobs.length}</span>
      </div>
      <div className="job__status">
        <JobStatusCardCategory jobs={jobs} category="Applied" />
        <JobStatusCardCategory jobs={jobs} category="In Progress" />
        <JobStatusCardCategory jobs={jobs} category="Offered" />
        <JobStatusCardCategory jobs={jobs} category="Rejected" />
      </div>
    </div>
  )
}

export default function JobStatus() {
  const { currentUser } = useAppSelector(state => state.user)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch(`/api/v1/crm/jobs/history/${currentUser?.slug}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setJobs(data.data.applied)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // useEffect(() => {
  //   const findPipeLine = async () => {
  //     jobs.forEach(async (job: any) => {
  //       const response = await fetch(
  //         `/api/v1/crm/hiring-pipelines/${job.job.hiring_pipeline_id}`
  //       )
  //       const data = await response.json()
  //       if (!data.success) {
  //         return
  //       }
  //       const pipelines = data.data
  //       console.log(pipelines)
  //     })
  //   }
  //   if (jobs.length) {
  //     findPipeLine()
  //   }
  // }, [jobs])

  return (
    <div>
      <div className="container job__status">
        <h1 className="home__heading">Job Status</h1>
        {loading ? <Loader /> : <JobStatusCard jobs={jobs} />}
      </div>
    </div>
  )
}
