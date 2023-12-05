import StatusTag from "../ui/StatusTag"

const appliedCategories = ['Applied', 'Assigned']
const offeredCategories = ['Offered', 'Selected', 'Placed']
const rejectedCategories = [
  'Rejected',
  'Did Not Join',
  'Interview Not Attended'
]

export interface IJobStatusCardProps {
  jobs: any[]
  category?: string
  state?: number
  setState?: any
  applied?: number
  inProgress?: number
  offered?: number
  setApplied?: any
  setInProgress?: any
  setOffered?: any
}

export const JobStatusCardCategory: React.FC<IJobStatusCardProps> = ({
  jobs,
  category
}) => {
  return (
    <div className="job__status--categories">
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
            </div>
          </div>
        )
      })}
    </div>
  )
}
