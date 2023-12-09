import { useAppSelector } from '../redux/hooks'

import { HomeHeader } from '../components/HomeHeader'
import { JobStatusCard } from '../components/jobs/JobStatusCard'
import Loader from '../components/ui/Loader'
import { useJobStatus } from '../contexts/JobStatusContext'

export default function JobStatus() {
  const { currentUser } = useAppSelector(state => state.user)
  const { loading } = useJobStatus()

  return (
    <div>
      <div className="container job__status">
        <HomeHeader currentUser={currentUser} />
        {loading ? <Loader /> : <JobStatusCard />}
      </div>
    </div>
  )
}
