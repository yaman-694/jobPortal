import { Request, Response } from "express";
import signupHandler from "../../handlers/signup.handler";
import { UserDocument } from "../../models/userModel";

const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password, cpassword } = req.body;
        if (password !== cpassword) {
            return res.status(400).json({ message: "Password does not match" });
        }

        const data = await signupHandler({
            firstname,
            lastname,
            email,
            password,
        } as UserDocument);

        return res
            .status(201)
            .json({ message: "User created successfully", data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default createUser;
