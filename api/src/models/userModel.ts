import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    _id: string;
    slug?: string;
    googleId?: string;
    githubId?: string;
    information?: {
        role?: string;
        skills?: string;
        locality?: string;
        country?: string;
        city?: string;
        resume?: {
            file_link?: string;
        };
    };
}
export interface UserDocument extends Document {
    firstname: string;
    lastname: string;
    slug?: string;
    email: string;
    googleId?: string;
    githubId?: string;
    password: string;
}



const UserSchema = new Schema<UserDocument>(
    {
        slug: {
            type: String,
            trim: true
        },
        firstname: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
        },
        lastname: {
            type: String,
            required: [true, "Please provide a last name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            trim: true,
        },
        googleId: {
            type: String,
            trim: true,
        },
        githubId: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);


UserSchema.pre("save", async function (this: UserDocument, next: () => void) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

// Create and export the User model
export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
