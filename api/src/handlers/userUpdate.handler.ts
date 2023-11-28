import FormData from "form-data";
import fetch from "node-fetch";
import { UserModel } from "../models/userModel";

export const userUpdateHandler = async ({ user, data }) => {
    try {
        const {
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
        } = data;
        const newDetails = new FormData();
        newDetails.append(
            "first_name",
            firstname || candiateDetails.first_name
        );
        newDetails.append("last_name", lastname || candiateDetails.last_name);
        newDetails.append("position", role || candiateDetails.position);
        newDetails.append("email", email || candiateDetails.email);
        newDetails.append("skill", skills || candiateDetails.skill);
        newDetails.append("locality", locality || candiateDetails.locality);
        newDetails.append("country", country || candiateDetails.country);
        newDetails.append("city", city || candiateDetails.city);
        if (resume) {
            newDetails.append("resume", resume.buffer, {
                filename: resume.originalname,
                contentType: resume.mimetype, // Add the file's MIME typ
            });
        }

        const response = await fetch(
            `${process.env.API_URL}/v1/candidates/${user.slug}`,
            {
                method: "POST",
                body: newDetails,
                headers: {
                    Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        if (!response.status) {
            throw "Internal Server Error";
        }
        const updatedDetails = await response.json();
        const userDB = await UserModel.findByIdAndUpdate(
            user._id,
            {
                firstname: firstname || user.firstname,
                lastname: lastname || user.lastname,
                email: email || user.email,
            },
            { new: true }
        );

        return { userDB, updatedDetails };
    } catch (error) {
        throw error;
    }
};
