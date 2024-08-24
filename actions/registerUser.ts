"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface registerProps {
    username: string;
    password: string;
}

export const registerUser = async (data: registerProps) => {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
        return {
            error: "Unauthorized",
        };
    }

    const { username, password } = data;

    try {
        await connectDB();

        const userFound = await UserModel.findOne({ username });

        if (userFound) {
            return {
                error: "User with this username already exists!",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        return {
            message: "User created",
        };
    } catch (e) {
        // console.log(e);
        return {
            error: "Error creating user",
        };
    }
};
