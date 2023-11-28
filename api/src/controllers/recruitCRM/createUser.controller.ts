import { Request, Response } from "express";
import { User, UserModel } from "../../models/userModel";
import { createUserHandler } from "../../handlers/createUser.handler";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        if(userId !== (req.user as User)?._id.toString()) {
            throw new Error("You are not authorized to create a candidate");
        }
        const { role, skills, locality, education, city, country } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("UserId does not exist");
        }
        const resume = req.file;
        const data = await createUserHandler(user, {
            ...req.body,
            resume
        })
        console.log(data);
        res.status(201).json({
            success: true,
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                slug: user.slug,
                information: {
                    role,
                    skills,
                    city,
                    country,
                    locality,
                    education,
                    resume: data?.resume?.file_link,
                },
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
