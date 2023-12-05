import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

import { HomeHeader } from '../components/HomeHeader'
import { JobStatusCard } from '../components/jobs/JobStatusCard'
import Loader from '../components/ui/Loader'

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

  

  return (
    <div>
      <div className="container job__status">
        <HomeHeader
          currentUser={currentUser}
        />
        {loading ? <Loader /> : <JobStatusCard jobs={jobs} />}
      </div>
    </div>
  )
}
