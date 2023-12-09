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
        // sort currentJobStatus by updated_on
        currentJobStatus.sort((a: any, b: any) => {
            const aDate = new Date(a.updated_on);
            const bDate = new Date(b.updated_on);

            return bDate.getTime() - aDate.getTime();
        });
        res.status(200).json({
            success: true,
            data: {
                all: currentJobStatus,
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
