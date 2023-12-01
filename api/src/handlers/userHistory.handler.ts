import fetch from 'node-fetch';
export const userHistoryHandler = async ({ userId }) => {
  try {
    const response = await fetch(
        `${process.env.API_URL}/v1/candidates/${userId}/history?expand=job`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                Accept: "application/json",
            },
        }
    );

    if(!response.status) {
      throw "Internal Server Error";
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}