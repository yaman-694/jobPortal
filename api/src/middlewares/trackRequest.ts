import { Request, Response, NextFunction } from "express";

export const trackRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
    );
    res.on("finish", () => {
        console.log(
            `Outgoing -> Status: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Method: [${req.method}]`
        );
    });
    next();
};