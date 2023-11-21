import { Router } from "express";
import { ListJobs } from "../controllers/recruitCRM/jobs.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";
const router = Router();

router.get("/", isAuthenticate, ListJobs);

export default router;
