import { Request, Response } from "express";
import { userHistoryHandler } from "../../handlers/userHistory.handler";

export const userHistoryController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is missing",
            });
        }
        const data = await userHistoryHandler({
            userId,
        });
        let jobStates = new Map();
        
        data.forEach((job: any) => {
            const key = `${job.job_name}-${job.company_name}`;

            if (jobStates.has(key)) {
                // replace job state with the latest date
                const jobState = jobStates.get(key);
                const mapDate = new Date(jobState.updated_on);
                const jobDate = new Date(job.updated_on);

                if (jobDate > mapDate) {
                    jobStates.set(key, job);
                }
            } else {
                jobStates.set(key, job);
            }
        });

        const currentJobStatus = Array.from(jobStates.values());
        const assignedJobs = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Assigned"
        );
        const shortlistedJobs = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Shortlisted"
        );
        const interviewScheduled = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Interview Scheduled"
        );
        const interviewNotAttended = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Interview Not Attended"
        );
        const interviewRescheduled = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Interview Rescheduled"
        );
        const onHold = currentJobStatus.filter(
            (job: any) => job.candidate_status === "On Hold"
        );
        const offered = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Offered"
        );
        const rejected = currentJobStatus.filter(
            (job: any) => job.candidate_status === "Rejected"
        );
        res.status(200).json({
            success: true,
            data: {
                applied: currentJobStatus,
                assigned_Jobs: assignedJobs,
                shortlisted_Jobs: shortlistedJobs,
                interview_Scheduled: interviewScheduled,
                interview_Not_Attended: interviewNotAttended,
                interview_Rescheduled: interviewRescheduled,
                on_Hold: onHold,
                offered: offered,
                rejected: rejected,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
