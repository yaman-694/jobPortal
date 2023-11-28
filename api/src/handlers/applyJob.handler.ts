import fetch from "node-fetch";

export const applyJobHandler = async ({ jobId, userId }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/v1/candidates/${userId}/apply?job_slug=${jobId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
        Accept: "application/json"
      }
    });

    if(!response.status) {
      throw "Internal Server Error";
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}