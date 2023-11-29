import { Request, Response, Router } from "express";
import { logoutUser, signinController } from "../controllers/auth/signin.controller";
import { passport } from "../passport/passport";
const router = Router();

router.post("/signin", passport.authenticate("local"), signinController);

// logout route
router.get("/logout", logoutUser);
export default router;
