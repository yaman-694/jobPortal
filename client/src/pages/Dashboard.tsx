import { HomeHeader } from '../components/HomeHeader'
import ListDashBoard from '../components/ui/ListDashboard'
import Loader from '../components/ui/Loader'
import { useJobStatus } from '../contexts/JobStatusContext'
import { useAppSelector } from '../redux/hooks'

export default function Home() {
  const { currentUser } = useAppSelector(state => state.user)
  const { jobs, loading } = useJobStatus()

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
              (jobs.length > 0 ? (
                jobs.slice(0, 6).map((job: any, id) => {
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
