import { Router } from "express";
import { listJobs, searchJobs } from "../controllers/recruitCRM/jobs.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { applyJobController } from "../controllers/recruitCRM/applyJob.controller";
import { userHistoryController } from "../controllers/recruitCRM/userHistory.controller";
const router = Router();

router.get("/", isAuthenticate, listJobs);
router.get("/search", isAuthenticate, searchJobs);
router.post("/apply/:jobId/:userId", isAuthenticate, applyJobController);
router.get("/history/:userId", isAuthenticate, userHistoryController);

export default router;
