import NextAuth, { DefaultUser } from "next-auth";

// Extend the default NextAuth User type
declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        role: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    }

    interface Session {
        user: User & DefaultUser;
    }
}
