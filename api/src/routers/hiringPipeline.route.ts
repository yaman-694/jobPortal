import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { hiringPipeLineController } from "../controllers/recruitCRM/hiringPipeLineController";

const router = Router();

router.get("/:id", isAuthenticate, hiringPipeLineController);
export default router;
