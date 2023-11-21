import { Router } from "express";
import {createUser} from "../controllers/recruitCRM/createUser.controller";
import {uploadFile} from "../middlewares/multer";
import { isAuthenticate } from "../middlewares/isAuthenticate";
const router = Router();
router.post("/:userId", isAuthenticate, uploadFile, createUser);

export default router;
