import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getCandidate } from "../../helper/getCandidate";
import { userUpdateHandler } from "../../handlers/userUpdate.handler";
import { User, UserModel } from "../../models/userModel";

export const userUpdateController = async (req: Request, res: Response) => {
    try {
        const user = req.user as any;
        const {
            firstname,
            lastname,
            email,
            role,
            skills,
            locality,
            city,
            country,
        } = req.body;
        const candiateDetails = await getCandidate(user.slug);
        const resume = req.file;
        const {userDB, updatedDetails} = await userUpdateHandler({
            user,
            data: {
                candiateDetails,
                resume,
                firstname,
                lastname,
                role,
                email,
                skills,
                locality,
                country,
                city,
            },
        });
        res.status(200).json({
            success: true,
            data: {
                firstname: userDB.firstname,
                lastname: userDB.lastname,
                email: userDB.email,
                slug: user.slug,
                information: {
                    role: role || updatedDetails.position,
                    skills: skills || updatedDetails.skill,
                    city: city || updatedDetails.city,
                    country: country || updatedDetails.country,
                    locality: locality || updatedDetails.locality,
                    resume: {
                        file_link: updatedDetails.resume?.file_link,
                    },
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



export const passwordUpdateController = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as User)?._id;
        const { password, newPassword } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Old password is incorrect");
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                password: hashedPassword,
            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            data: {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
                slug: updatedUser.slug,
            },
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}