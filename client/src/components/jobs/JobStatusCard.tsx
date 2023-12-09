import { useJobStatus } from '../../contexts/JobStatusContext'
import Accordion from '../ui/Accordian'
import {
  JobStatusCardCategory
} from './JobStatusCardCategory'


export const JobStatusCard: React.FC = () => {
  const { applied, inProgress, offered } = useJobStatus()
  return (
    <div className="job__stats">
      <div className="total__application">
        <div className="application__status">
          <span>Applied</span>
          <span>{applied}</span>
        </div>
        <div className="application__status">
          <span>In Progess</span>
          <span>{inProgress}</span>
        </div>
        <div className="application__status">
          <span>Offered</span>
          <span>{offered}</span>
        </div>
      </div>
      <div className="job__status">
        <Accordion className="job__status--categories" title="Applied">
          <JobStatusCardCategory
            category="Applied"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="In Progress">
          <JobStatusCardCategory
            category="In Progress"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="Offered">
          <JobStatusCardCategory
            category="Offered"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="Rejected">
          <JobStatusCardCategory category="Rejected" />
        </Accordion>
      </div>
    </div>
  )
}
