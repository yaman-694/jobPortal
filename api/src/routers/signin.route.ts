import { Router, Request, Response } from "express";
import { passport } from "../passport/passport";
import { User, UserDocument } from "../models/userModel";
import { getCandidate } from "../helper/getCandidate";
const router = Router();

router.post("/signin", passport.authenticate("local"), async (req: Request, res: Response) => {
    let user = req.user as User;
    if(user.slug) {
        const candidate = await getCandidate(user.slug);
        (user as User).information = {
            role: candidate.position,
            skills: candidate.skill,
            city: candidate.city,
            country: candidate.country,
            locality: candidate.locality,
            resume: {
                file_link: candidate?.resume?.file_link,
            },
        };
    }
    res.json({ success: true, user: req.user });
})

// logout route
router.get("/logout", (req: Request, res: Response) => {
    req.logout(err => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            req.session.destroy(err => {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.redirect("/login"); // Redirect to the home page or any desired page after logout
                }
            });
        }
    });
});
export default router;
