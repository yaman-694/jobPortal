import bcrypt from "bcrypt";

import { UserDocument, UserModel } from "../models/userModel";
interface UserCred {
    email: string;
    password: string;
}
const signinHandler = async (data: UserCred): Promise<UserDocument> => {
    try {
        // create user
        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            throw new Error("User doesn't exists");
        }
        // match password
        if (!(await bcrypt.compare(data.password, user.password))) {
            throw new Error("Incorrect password");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

export default signinHandler;
