import FormData from "form-data";
import fetch from "node-fetch";

export const createUserHandler = async (user, details) => {
    try {
        const { role, skills, locality, city, country, resume } = details;
        const form = new FormData();
        form.append("first_name", user.firstname);
        form.append("last_name", user.lastname);
        form.append("position", role || '');
        form.append("email", user.email);
        form.append("skill", skills || '');
        form.append("locality", locality|| '');
        form.append("country", country|| '');
        form.append("city", city|| '');
        if (resume) {
            form.append("resume", resume.buffer, {
                filename: resume.originalname,
                contentType: resume.mimetype, // Add the file's MIME typ
            });
        }

        const response = await fetch(`${process.env.API_URL}/v1/candidates`, {
            method: "POST",
            body: form,
            headers: {
                Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                Accept: "application/json",
            },
        });

        const data = await response.json();
        user.slug = data.slug;
        await user.save();
        if (!response.status) {
            throw "Internal Server Error";
        }
        return data;
    } catch (error) {
        throw error;
    }
};
