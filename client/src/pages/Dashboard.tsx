import { PieChart } from '@mui/x-charts/PieChart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeHeader } from '../components/HomeHeader'
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
    Rejected: []
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
    console.log(GraphData)
    setData(GraphData)
  }, [jobStatus])

  return (
    <div>
      <div className="dashboard__container dashboard container">
        <HomeHeader currentUser={currentUser} loading={loading}>
          <PieChart
            colors={[
              '#67e8f9',
              '#60a5fa',
              '#86efac',
              '#8b5cf6',
              '#ec4899',
              '#f97316',
              '#f59e0b',
              '#10b981',
              '#3b82f6',
              '#ef4444'
            ]}
            series={[
              {
                data,
                innerRadius: 20,
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
        <div className="job__stats">
          <div className="candidate__status">
            {loading ? (
              <Loader />
            ) : (
              Object.entries(jobStatus).map(([key, value], index) => {
                return (
                  <div key={index} className="status">
                    <div className="label">
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
