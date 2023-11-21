import axios from "axios";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { UserModel } from "../../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { role, skills, contract, location, education } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("UserId does not exist");
        }

        const dataBody = {
            first_name: user.firstname,
            last_name: user.lastname,
            email: user.email,
            skill: skills,
            locality: location,
        };
        // // console
        // const file = req.file;

        // // Save the file to the server using createWriteStream
        // const filePath = path.join(__dirname, "uploads", file.originalname);
        // const writeStream = fs.createWriteStream(filePath);
        // writeStream.write(file.buffer);
        // writeStream.end();

        // // Create FormData manually and append file data
        // // const formData = new FormData();
        // const form = new FormData();

        // // form.append("resume", file.buffer, {
        // //     filename: file.originalname,
        // //     contentType: file.mimetype,
        // // });

        // form.append("first_name", user.firstname);
        // form.append("last_name", user.lastname);
        // form.append("email", user.email);
        // form.append("skill", skills);
        // form.append("locality", location);

        // Append the file to the FormData
        const response = await axios.post(
            `${process.env.API_URL}/v1/candidates`,
            dataBody,
            {
                headers: {
                    Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                    'Content-Type': `multipart/form-data`,
                    Accept: "application/json"
                },
            }
        );
        const data = await response.data;
        user.slug = data.slug;
        await user.save();
        if (!response.status) {
            throw "Internal Server Error";
        }
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
