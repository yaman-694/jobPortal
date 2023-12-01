import { PieChart } from '@mui/x-charts'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import { HomeHeader } from '../components/HomeHeader'
import Loader from '../components/ui/Loader'
import StatusTag from '../components/ui/StatusTag'

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
  const [data, setData] = useState<any>([])
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

  useEffect(() => {
    const GraphData = [
      {
        id: 1,
        label: 'Applied',
        value: jobs.filter(
          (job: any) =>
            job.candidate_status === 'Applied' ||
            job.candidate_status === 'Assigned'
        ).length
      },
      {
        id: 2,
        label: 'In Progress',
        value: jobs.filter(
          (job: any) =>
            job.candidate_status === 'Interview Scheduled' ||
            job.candidate_status === 'Interview Not Attended' ||
            job.candidate_status === 'Interview Rescheduled' ||
            job.candidate_status === 'On Hold'
        ).length
      },
      {
        id: 3,
        label: 'Offered',
        value: jobs.filter(
          (job: any) =>
            job.candidate_status === 'Offered' ||
            job.candidate_status === 'Selected' ||
            job.candidate_status === 'Placed'
        ).length
      },
      {
        id: 4,
        label: 'Rejected',
        value: jobs.filter(
          (job: any) =>
            job.candidate_status === 'Rejected' ||
            job.candidate_status === 'Did Not Join'
        ).length
      }
    ]
    setData(GraphData)
  }, [jobs])

  return (
    <div>
      <div className="container job__status">
        <HomeHeader currentUser={currentUser} loading={loading}>
              <PieChart
                colors={['#8b5cf6', '#ec4899', '#f97316', '#ef4444']}
                series={[
                  {
                    data,
                    innerRadius: 80,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 156,
                    cy: 150
                  }
                ]}
                width={500}
                height={300}
              />
        </HomeHeader>
        {loading ? <Loader /> : <JobStatusCard jobs={jobs} />}
      </div>
    </div>
  )
}
