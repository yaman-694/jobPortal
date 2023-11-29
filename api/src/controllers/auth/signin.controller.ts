import { Request, Response } from "express";
import { getCandidate } from "../../helper/getCandidate";
import { User } from "../../models/userModel";

const signinController = async (req: Request, res: Response) => {
    let user = req.user as User;
    if (user.slug) {
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
};

const logoutUser = (req: Request, res: Response) => {
    req.logout(err => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            req.session.destroy(err => {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.redirect("/login");
                }
            });
        }
    });
};

export { logoutUser, signinController };
