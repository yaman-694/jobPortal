import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
}
export default function Home() {
  const { currentUser } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [jobStatus, setJobStatus] = useState<IJobStatus>({
    applied: [],
    'Assigned Jobs': [],
    'Shortlisted Jobs': [],
    'Interview Scheduled': [],
    'Interview Not Attended': [],
    'Interview Rescheduled': [],
    'On Hold': [],
    Offered: []
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
      const jobs = data.data;
      const appliedJobsSlug = jobs.applied.map((job: any) => job.job_slug)
      dispatch(setAppliedJobs(appliedJobsSlug))
    }
    getData()
  }, [])
  return (
    <div>
      <div className="dashboard__container dashboard container">
        <h1 className="home__heading">Dashboard</h1>
        <div className="job__stats">
          <div className="candidate__status">
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              Object.entries(jobStatus).map(([key, value], index) => {
                return (
                  <div key={index} className="status">
                    <div className='label'>
                      {Array.from(key.split('_')).map(word => {
                        return word[0].toUpperCase() + word.slice(1) + ' '
                      })}
                    </div>
                    <span className="count">{'- ' + value.length}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
