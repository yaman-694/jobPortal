interface Candidate {
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    skill: string;
    locality: string;
    country: string;
    city: string;
    resume: {
        file_link: string;
    };
}

// this function will retrun the candidate details
export const getCandidate = async (userSlug: string): Promise<Candidate> => {
    try {
        const response = await fetch(
            `${process.env.API_URL}/v1/candidates/${userSlug}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${process.env.RECRUITCRM_API_KEY}`,
                    Accept: "application/json",
                },
            }
        );

        const data = await response.json();
        const user = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            position: data.position,
            skill: data.skill,
            locality: data.locality,
            country: data.country,
            city: data.city,
            resume: {
                file_link: data.resume?.file_link,
            },
        }
        return user;
    } catch (error) {
        throw error;
    }
};
