import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeHeader } from '../components/HomeHeader'
import ListDashBoard from '../components/ui/ListDashboard'
import Loader from '../components/ui/Loader'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setAppliedJobs } from '../redux/jobs/jobsSlice'

interface IJobStatus {
  applied: any[]
  'Assigned Jobs': any[]
  'Shortlisted Jobs': any[]
  'Interview Scheduled': any[]
  'Interview Not Attended': any[]
  'Interview Rescheduled': any[]
  'On Hold': any[]
  Offered: any[]
  Rejected: any[]
  all: any[]
}

export default function Home() {
  const { currentUser } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [jobStatus, setJobStatus] = useState<IJobStatus>({
    applied: [],
    'Assigned Jobs': [],
    'Shortlisted Jobs': [],
    'Interview Scheduled': [],
    'Interview Not Attended': [],
    'Interview Rescheduled': [],
    'On Hold': [],
    Offered: [],
    Rejected: [],
    all: []
  })
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await fetch(
        `/api/v1/crm/jobs/history/${currentUser?.slug}`
      )
      const data = await response.json()
      if (!data.success) {
        navigate('/login')
        return
      }
      setLoading(false)
      setJobStatus(data.data)
      const jobs = data.data
      const appliedJobsSlug = jobs.applied.map((job: any) => job.job_slug)
      dispatch(setAppliedJobs(appliedJobsSlug))
    }
    getData()
  }, [])

  useEffect(() => {
    const GraphData = Object.entries(jobStatus).map(([key, value], index) => {
      if (key === 'all') return
      const label = Array.from(key.split('_'))
        .map(word => {
          return word[0].toUpperCase() + word.slice(1) + ' '
        })
        .join('')

      return {
        id: index,
        label,
        value: value.length
      }
    })
    setData(GraphData)
  }, [jobStatus])

  return (
    <div>
      <div className="dashboard__container dashboard container">
        <HomeHeader currentUser={currentUser} />
        <div className="job__stats">
          <div className="candidate__status">
            <h3>Recent Activity</h3>
            <li className="list__dashboard list__heading">
              <div>Sno.</div>
              <div className="job__name--list">Job Name</div>
              <div className="company__name--list">Company</div>
              <div>Status</div>
            </li>
            {loading && <Loader />}
            {!loading &&
              (jobStatus.all.length > 0 ? (
                jobStatus.all
                  .slice(0, 6)
                  .map((job: any, id) => {
                    return (
                      <ListDashBoard
                        key={id}
                        id={id}
                        jobName={job.job_name}
                        jobStatus={job.candidate_status}
                        company={job.company_name}
                      />
                    )
                  })
              ) : (
                <p>No Recent Activity</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
