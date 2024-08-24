"use client";

import Link from "next/link";
import { Button, Input } from "../ui";
import useAuthForm from "@/hooks/useAuthForm";

interface AuthFormProps {
    type: "Login" | "Register";
}

const AuthForm = ({ type }: AuthFormProps) => {
    const { formRef, error, handleSubmit } = useAuthForm(type);

    return (
        <form
            ref={formRef}
            className="flex flex-col items-center gap-4 
            bg-white shadow-lg rounded-lg px-10 py-8"
            onSubmit={handleSubmit}>
            <h1 className="w-full text-2xl font-bold">
                {type === "Login" ? "Sign In" : "Register"}
            </h1>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Input
                required
                name="username"
                type="text"
                placeholder="Username"
            />
            <Input
                required
                name="password"
                type="password"
                placeholder="Password"
            />
            {type === "Register" && (
                <Input
                    required
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                />
            )}
            <Button type="submit" className="w-full">
                {type === "Login" ? "Sign In" : "Sign Up"}
            </Button>
            <Link
                href={type === "Login" ? "/register" : "/login"}
                className="text-sm text-[#888] transition duration-150 ease hover:text-black text-left w-full">
                {type === "Login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
            </Link>
        </form>
    );
};

export default AuthForm;
