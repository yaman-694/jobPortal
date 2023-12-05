import StatusTag from './StatusTag'

const ListDashBoard = ({
  id,
  jobName,
  jobStatus,
  company
}: {
  id: number
  jobName: string
  jobStatus: string
  company: string
}) => {
  return (
    <li className="list__dashboard">
      <div>#{id+1}</div>
      <div className='job__name--list'>
        {jobName}
      </div>
      <div className='company__name--list'>
        {company}
      </div>
      <StatusTag status={jobStatus} />
    </li>
  )
}

export default ListDashBoard
