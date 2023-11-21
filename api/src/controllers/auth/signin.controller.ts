import { Request, Response } from "express";
import signinHandler from "../../handlers/signin.handler";

const createSession = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = await signinHandler({
            email,
            password,
        });

        return res.status(200).json({ message: "Logged In", data });
    } catch (error) {
        console.log(error);
    }
};

export default createSession;
