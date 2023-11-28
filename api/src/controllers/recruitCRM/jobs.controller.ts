import { Request, Response } from "express";
import fetch from "node-fetch";

export const listJobs = async (req: Request, res: Response) => {
    try {
        const { limit, page, sort_by, sort_order } = req.query;
        let url = `${process.env.API_URL}/v1/jobs?expand=company`;
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
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
            },
        });
        if (!response.ok) {
            throw "Internal Server Error";
        }
        const data = await response.json();
        res.status(201).json({
            success: true,
            data: {
                jobs: data.data,
                current_page: data.current_page,
                from: data.from,
                last_page: data.last_page,
                per_page: data.per_page,
                to: data.to,
                path: data.path,
                total: data.total,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchJobs = async (req: Request, res: Response) => {
    try {
        const {
            job_category,
            job_skill,
            name,
            country,
            job_type,
            limit,
            page,
            sort_by,
            sort_order,
            search,
        } = req.query;
        const queryParams = Object.entries({
            job_category,
            job_skill,
            name,
            country,
            job_type: job_type === "fullTime" ? 2 : (job_type === "partTime" ? 1 : undefined),
            limit,
            page,
            sort_by,
            sort_order,
            search,
        })
            .filter(([_, value]) => value)
            .map(
                ([key, value]) =>
                    `${key}=${encodeURIComponent(value as string)}`
            )
            .join("&");

        const url = `${process.env.API_URL}/v1/jobs/search?${queryParams}&expand=company`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
            },
        });
        if (!response.ok) {
            throw "Internal Server Error";
        }
        const data = await response.json();
        res.status(201).json({
            success: true,
            data: {
                jobs: data.data,
                current_page: data.current_page,
                from: data.from,
                last_page: data.last_page,
                per_page: data.per_page,
                to: data.to,
                path: data.path,
                total: data.total,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
