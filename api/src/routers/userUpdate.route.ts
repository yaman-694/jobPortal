import { Router } from "express";
import multer from "multer";
import { passwordUpdateController, userUpdateController } from "../controllers/recruitCRM/userUpdate.controller";
import { isAuthenticate } from "../middlewares/isAuthenticate";

const router = Router();

const upload = multer();
router.post("/", isAuthenticate, upload.single("resume"), userUpdateController);

router.post('/password-update', isAuthenticate, passwordUpdateController);

export default router;
