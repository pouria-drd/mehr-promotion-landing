import type { NextAuthOptions } from "next-auth";

import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import UserModel from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password are required!");
                }

                await connectDB();

                const user = await UserModel.findOne({
                    username: credentials.username,
                }).select("+password");

                if (!user) {
                    throw new Error("Wrong username or password!");
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Wrong username or password!");
                }

                // return user;
                return {
                    id: user._id.toString(),
                    username: user.username,
                    role: user.role,
                    isActive: user.isActive,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    username: token.username as string,
                    role: token.role as string,
                    isActive: token.isActive as boolean,
                    createdAt: token.createdAt as string,
                    updatedAt: token.updatedAt as string,
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.isActive = user.isActive;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
            }
            return token;
        },
    },
};
