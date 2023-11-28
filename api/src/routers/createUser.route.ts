import { Router } from "express";
import multer from "multer";
import {createUser} from "../controllers/recruitCRM/createUser.controller";
// import {uploadFile} from "../middlewares/multer";
import { isAuthenticate } from "../middlewares/isAuthenticate";
const router = Router();

const upload = multer();
router.post("/:userId", isAuthenticate, upload.single('resume'), createUser);

export default router;
