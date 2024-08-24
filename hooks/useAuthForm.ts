import { signIn } from "next-auth/react";
import { useState, useRef, FormEvent } from "react";
import { registerUser } from "@/actions/registerUser";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A custom hook for managing authentication forms, including both login and registration functionalities.
 *
 * @param type - Specifies whether the form is for "Login" or "Register".
 * @returns An object containing the form reference, error state, and submission handler.
 */
const useAuthForm = (type: "Login" | "Register") => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    /**
     * Handles the registration process by validating input fields and making an API call to register the user.
     *
     * @param formData - The form data submitted by the user, containing username, password, and confirmPassword fields.
     *
     * @advanced
     * This function is used when the user is trying to register a new account. It ensures that all fields are filled,
     * passwords match, and then calls the registerUser API. If registration is successful, the user is redirected to the login page.
     */
    const handleRegistration = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!username || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const res = await registerUser({ username, password });

        if (res?.error) {
            setError(res.error);
            return;
        }

        formRef.current?.reset();
        router.push("/login");
    };

    /**
     * Handles the login process by validating input fields and making an API call to authenticate the user.
     *
     * @param formData - The form data submitted by the user, containing username and password fields.
     *
     * @advanced
     * This function is used when the user is trying to log in. It ensures that all fields are filled
     * and then calls the signIn function with the credentials. If authentication is successful, the user is redirected
     * to the specified callback URL or the default URL.
     */
    const handleLogin = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            setError("All fields are required.");
            return;
        }

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
            callbackUrl,
        });

        if (res?.error) {
            setError(res.error as string);
            return;
        }

        if (res?.ok && res.url) {
            window.location.href = res.url;
        }
    };

    /**
     * Handles the form submission event, directing the flow based on the form type (Login or Register).
     *
     * @param event - The form submission event.
     *
     * @advanced
     * This function determines whether the user is attempting to log in or register based on the `type` parameter.
     * It then calls the appropriate handler function (`handleLogin` or `handleRegistration`) to process the form data.
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setError(null);
        if (type === "Login") {
            await handleLogin(formData);
        } else {
            await handleRegistration(formData);
        }
    };

    return {
        formRef,
        error,
        handleSubmit,
    };
};

export default useAuthForm;
