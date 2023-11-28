import authRoute from "./routers/signin.route";
import signupRoute from "./routers/signup.route";
import createUserR from './routers/createUser.route'
import jobsRouteR from './routers/jobs.route'
import userUpdateR from './routers/userUpdate.route'
import googleRoute from './routers/google.route'
import githubRoute from './routers/github.route'


const apiversion = "/api/v1/";
export const ROUTER = [
    {
        path: `${apiversion}`,
        router: authRoute,
    },
    {
        path: `${apiversion}signup`,
        router: signupRoute,
    },
    {
        path: `${apiversion}crm/create`,
        router: createUserR,
    },
    {
        path: `${apiversion}crm/jobs`,
        router: jobsRouteR,
    },
    {
        path: `${apiversion}crm/update-profile`,
        router: userUpdateR,
    },
    {
        path: "/auth/google",
        router: googleRoute,
    },
    {
        path: "/auth/github",
        router: githubRoute,
    },
];
