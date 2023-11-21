import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    isAuthenticated(): boolean;
}
export const isAuthenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};