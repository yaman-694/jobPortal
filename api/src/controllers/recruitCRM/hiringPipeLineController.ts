import { Request, Response } from "express";
import fetch from "node-fetch";

const hiringPipeLineController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Id is required");
        const response = await fetch(
            `${process.env.API_URL}/v1/hiring-pipelines/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                },
            }
        );

        if (!response.ok) throw new Error("Error while fetching data");

        const data = await response.json();

        res.status(200).send({ success: true, data });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: error.message });
    }
};

export { hiringPipeLineController };
