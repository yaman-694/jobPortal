import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import signinHandler from "../handlers/signin.handler";
import dotenv from "dotenv";
import { UserDocument, UserModel } from "../models/userModel";

dotenv.config();
passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user: UserDocument = await signinHandler({
                    email,
                    password,
                });
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
            let user = await UserModel.findOne({ email: profile.emails?.[0].value });
            if(!user) {
                console.log(profile.emails);
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
            scope: ["profile", "email"]
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
            return done(null, profile);
        }
    )
);
passport.serializeUser((user: UserDocument, done) => {
    console.log(user)
    done(null, user._id.toString());
});
passport.deserializeUser(async (id, done) => {
    console.log(id);
    const user = await UserModel.findById(id);
    done(null, user);
});

export { passport };
