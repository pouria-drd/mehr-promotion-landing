import { LnkButton } from "@/components/ui";
import Link from "next/link";

function NotAuthorizedPage() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">
                403 - Access Denied
            </h1>
            <p className="text-gray-700 mb-6">
                You do not have permission to view this page.
            </p>
            <LnkButton href="/">Go to Home</LnkButton>
        </div>
    );
}

export default NotAuthorizedPage;
