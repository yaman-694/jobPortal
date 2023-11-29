import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import http from "http";
import mongoose from "mongoose";
import errorHandler from "./src/middlewares/error";
import { isAuthenticate } from "./src/middlewares/isAuthenticate";
import { trackRequest } from "./src/middlewares/trackRequest";
import { passport } from "./src/passport/passport";
import { ROUTER } from "./src/routes";
import { User } from "./src/models/userModel";

declare module "express-session" {
    interface SessionData {
        passport: {user: string};
    }
}

dotenv.config();

const app = express();

const MONGO_URL =
    "mongodb+srv://admin:ogYGizfwCG7c9gw5@cluster0.lvikbnl.mongodb.net/clientPortal?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, { retryWrites: true, w: "majority" }).then(() => {
    console.log("Connected to the database");
});

// to caught uncaught exception
process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err);
    process.exit(1);
});
// unhandled promise rejection
process.on("unhandledRejection", err => {
    throw err;
});

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Replace with your React app's origin
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Credentials", "true");

//     next();
// });

const serverConfig = () => {
    app.use(
        session({
            secret: "test is tought ug sdfsdf",
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl:
                    "mongodb+srv://admin:ogYGizfwCG7c9gw5@cluster0.lvikbnl.mongodb.net/sessionstore?retryWrites=true&w=majority",
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7,  // One week
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            },
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
        cors({
            origin: "http://localhost:5173",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        })
    );
    app.use(flash());
    app.use(trackRequest);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(errorHandler as any);
    // Routes
    ROUTER.forEach(route => {
        app.use(route.path, route.router);
    });
    app.get("/hello", isAuthenticate, (req, res) => {
        res.send("Hello World");
    });

    // app.get(
    //     "/google",
    //     passport.authenticate("google", { scope: ["profile","email"] })
    // );

    // app.get(
    //     "/auth/google/callback",
    //     passport.authenticate("google", {
    //         successRedirect: "http://localhost:5173/",
    //         failureRedirect: "http://localhost:5173/login",
    //     })
    // );

    // app.get("/logout", (req, res) => {
    //     req.logout(err=>{
    //         if(err){
    //             res.status(500).json({message: err})
    //         }else{
    //             req.session.destroy(err=>{
    //                 if(err){
    //                     res.status(500).json({message: err})
    //                 }else{
    //                     res.redirect("/login")
    //                 }
    //             })
    //         }
    //     })
    // });

    // app.get("/success", (req, res) => {
    //     if (req.user) {
    //         res.status(201).json({
    //             success: true,
    //             message: "user has successfully authenticated",
    //             user: req.user,
    //             cookies: req.cookies,
    //         });
    //     }
    // });

    const PORT = process.env.PORT || 3000;
    http.createServer(app).listen(PORT, () =>
        console.log(`Express is listening at http://localhost:${PORT}`)
    );
};
serverConfig();
