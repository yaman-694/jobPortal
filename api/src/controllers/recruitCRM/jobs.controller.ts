import { Request, Response } from "express";
import axios from 'axios';

export const ListJobs = async (req: Request, res: Response) => {
    try {
        const { limit, page, sort_by, sort_order } = req.query;
        let url = `${process.env.API_URL}/v1/jobs?expand=company&expand=contact`;
        if (limit) {
            url += `limit=${limit}&`;
        }
        if (page) {
            url += `page=${page}&`;
        }
        if (sort_by) {
            url += `sort_by=${sort_by}&`;
        }
        if (sort_order) {
            url += `sort_order=${sort_order}&`;
        }
        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw "Internal Server Error";
        }
        res.status(201).json({
            success: true,
            data: data.data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
