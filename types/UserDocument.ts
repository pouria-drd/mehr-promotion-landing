import { DefaultUser } from "next-auth";

interface UserData extends DefaultUser {
    role: string;
    username: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export default UserData;

export interface UserCreationDocument extends DefaultUser {
    role: string;
    username: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
