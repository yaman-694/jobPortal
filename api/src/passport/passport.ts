import dotenv from "dotenv";
import fetch from "node-fetch";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import signinHandler from "../handlers/signin.handler";
import { User, UserDocument, UserModel } from "../models/userModel";
import { getCandidate } from "../helper/getCandidate";

dotenv.config();
passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const userDb: UserDocument = await signinHandler({
                    email,
                    password,
                });
                const user: User = {
                    _id: userDb._id,
                    firstname: userDb.firstname,
                    lastname: userDb.lastname,
                    email: userDb.email,
                    googleId: userDb.googleId,
                    githubId: userDb.githubId,
                    slug: userDb.slug,
                };
                return done(null, user);
            } catch (error) {
                return done(null, false, {
                    message: error.message || "Incorrect username or password.",
                });
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await UserModel.findOne({
                email: profile.emails?.[0].value,
            });
            if (!user) {
                const userObj = {
                    firstname: profile.displayName.split(" ")[0],
                    lastname: profile.displayName.split(" ")[1],
                    email: profile.emails?.[0].value,
                    googleId: profile.id,
                    password: Math.random().toString(36).slice(-8),
                };
                user = await UserModel.create(userObj);
            }
            return done(null, user);
        }
    )
);
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
            scope: ["user:email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await UserModel.findOne({
                email: profile.emails?.[0].value,
            });
            if (!user) {
                const userObj = {
                    firstname: profile.displayName.split(" ")[0],
                    lastname: profile.displayName.split(" ")[1],
                    email: profile.emails?.[0].value,
                    githubId: profile.id,
                    password: Math.random().toString(36).slice(-8),
                };
                user = await UserModel.create(userObj);
            }
            return done(null, user);
        }
    )
);
passport.serializeUser((user: UserDocument, done) => {
    done(null, user._id.toString());
});
passport.deserializeUser(async (id, done) => {
    const userDb = await UserModel.findById(id);
    let user = {
        _id: userDb?._id,
        firstname: userDb?.firstname,
        lastname: userDb?.lastname,
        email: userDb?.email,
        googleId: userDb?.googleId,
        githubId: userDb?.githubId,
        slug: userDb?.slug,
    };

    if(userDb?.slug) {
        const candidate = await getCandidate(user.slug);
        (user as User).information = {
            role: candidate.position,
            skills: candidate.skill,
            city: candidate.city,
            country: candidate.country,
            locality: candidate.locality,
            resume: {
                file_link: candidate.resume?.file_link,
            },
        };
    }
    done(null, user);
});

export { passport };
