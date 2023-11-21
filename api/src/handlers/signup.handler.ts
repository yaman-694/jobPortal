import { UserModel, UserDocument } from "../models/userModel";
const signupHandler = async (data: UserDocument) => {
    try {
        // create user
        const findUser = await UserModel.findOne({ email: data.email });
        if (findUser) {
            throw new Error("User already exists");
        }
        console.log(data);
        const user = await UserModel.create({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        });
        return user;
    } catch (error) {
        throw error;
    }
};

export default signupHandler;