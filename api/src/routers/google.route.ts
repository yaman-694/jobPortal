import { Router } from "express";
import { passport } from "../passport/passport";

const router = Router();
router.get(
    "/",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173/",
        failureRedirect: "http://localhost:5173/login",
    })
);

router.get("/success", (req, res) => {
    if (req.user) {
        res.status(201).json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies,
        });
    }
});


export default router;