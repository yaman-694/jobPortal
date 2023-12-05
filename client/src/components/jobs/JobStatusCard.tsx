import { useEffect, useState } from "react";
import Accordion from "../ui/Accordian"
import { IJobStatusCardProps, JobStatusCardCategory } from "./JobStatusCardCategory"



export const JobStatusCard: React.FC<IJobStatusCardProps> = ({ jobs }) => {
  const [applied, setApplied] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [offered, setOffered] = useState(0);

  useEffect(() => {
    // const GraphData = [
    //   {
    //     id: 1,
    //     label: 'Applied',
    //     value: jobs.filter(
    //       (job: any) =>
    //         job.candidate_status === 'Applied' ||
    //         job.candidate_status === 'Assigned'
    //     ).length
    //   },
    //   {
    //     id: 2,
    //     label: 'In Progress',
    //     value: jobs.filter(
    //       (job: any) =>
    //         job.candidate_status === 'Interview Scheduled' ||
    //         job.candidate_status === 'Interview Not Attended' ||
    //         job.candidate_status === 'Interview Rescheduled' ||
    //         job.candidate_status === 'On Hold'
    //     ).length
    //   },
    //   {
    //     id: 3,
    //     label: 'Offered',
    //     value: jobs.filter(
    //       (job: any) =>
    //         job.candidate_status === 'Offered' ||
    //         job.candidate_status === 'Selected' ||
    //         job.candidate_status === 'Placed'
    //     ).length
    //   },
    //   {
    //     id: 4,
    //     label: 'Rejected',
    //     value: jobs.filter(
    //       (job: any) =>
    //         job.candidate_status === 'Rejected' ||
    //         job.candidate_status === 'Did Not Join'
    //     ).length
    //   }
    // ]

    setOffered(
      jobs.filter(
        (job: any) =>
          job.candidate_status === 'Offered' ||
          job.candidate_status === 'Selected' ||
          job.candidate_status === 'Placed'
      ).length
    )
    setApplied(
      jobs.filter(
        (job: any) =>
          job.candidate_status === 'Applied' ||
          job.candidate_status === 'Assigned'
      ).length
    )
    setInProgress(
      jobs.filter(
        (job: any) =>
          job.candidate_status === 'Interview Scheduled' ||
          job.candidate_status === 'Interview Not Attended' ||
          job.candidate_status === 'Interview Rescheduled' ||
          job.candidate_status === 'On Hold'
      ).length
    )
  }, [jobs])
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
            // state={applied}
            // setState={setApplied}
            jobs={jobs}
            category="Applied"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="In Progress">
          <JobStatusCardCategory
            // state={inProgress}
            // setState={setInProgress}
            jobs={jobs}
            category="In Progress"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="Offered">
          <JobStatusCardCategory
            // state={offered}
            // setState={setOffered}
            jobs={jobs}
            category="Offered"
          />
        </Accordion>
        <Accordion className="job__status--categories" title="Rejected">
          <JobStatusCardCategory jobs={jobs} category="Rejected" />
        </Accordion>
      </div>
    </div>
  )
}
