import { Request, Response } from "express";
import { applyJobHandler } from "../../handlers/applyJob.handler";

export const applyJobController = async (req: Request, res: Response) => {
  try {
    const { jobId, userId } = req.params;
    if(!jobId || !userId) return res.status(400).json({ success: false, message: "JobId or UserId is missing" });
    const data = await applyJobHandler({
      jobId,
      userId,
    });
    console.log(data);
    return res.status(200).json({ success: true, message: "Applied Successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}