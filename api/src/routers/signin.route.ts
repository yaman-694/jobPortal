import { Router, Request, Response } from "express";
import { passport } from "../passport/passport";
const router = Router();

router.post("/signin", passport.authenticate("local"), (req, res) => {
    // If authentication is successful, send a success response to the frontend
    res.json({ success: true, user: req.user });
})

// logout route

// Add this route to your existing routes
router.get("/logout", (req, res) => {
    req.logout(err => {
        // Pass the done callback function
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
