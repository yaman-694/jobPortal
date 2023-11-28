import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'
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
      }).catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <div className="container job__status">
        <h1 className="home__heading">Job Status</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="job__stats">
            <div className="total__application">
              <span>Applied on</span>
              <span>{jobs.length}</span>
            </div>
            <div className="job__status">
              <div className="job__status--applied">
                <span className="status__heading">Applied</span>
                {jobs.map((job: any) => {
                  if (job.candidate_status !== 'Applied') return null
                  return (
                    <div key={job.job_slug} className="job__status--item card">
                      <div className="job__status--item__title">
                        <span>{job.job_name}</span>
                        <span>{job.company_name}</span>
                      </div>
                      <div className="job__status--item__date">
                        {job.updated_on && (
                          <span>
                            {'applied on ' +
                              new Date(job.updated_on).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="job__status--progress">
                <span className="status__heading">In Progress</span>
                {jobs.map((job: any) => {
                  if (
                    job.candidate_status === 'Applied' ||
                    job.candidate_status === 'Offered'
                  )
                    return null
                  return (
                    <div key={job.job_slug} className="job__status--item">
                      <div className="job__status--item__title">
                        <span>{job.job_name}</span>
                        <span>{job.company_name}</span>
                      </div>
                      <div className="job__status--item__date">
                        {job.updated_on && (
                          <span>
                            {'applied on ' +
                              new Date(job.updated_on).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="job__status--offered">
                <span className="status__heading">Offered</span>
                {jobs.map((job: any) => {
                  if (job.candidate_status !== 'Offered') return null
                  return (
                    <div key={job.job_slug} className="job__status--item">
                      <div className="job__status--item__title">
                        <span>{job.job_name}</span>
                        <span>{job.company_name}</span>
                      </div>
                      <div className="job__status--item__date">
                        {job.updated_on && (
                          <span>
                            {'applied on ' +
                              new Date(job.updated_on).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
