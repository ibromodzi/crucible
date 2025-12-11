"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

const db = getFirestore(app);

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("first-time");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                fullName,
                country,
                experienceLevel,
                onboardingCompleted: true,
                email: user.email,
                createdAt: new Date().toISOString(),
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error saving profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome! Tell us about yourself
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        We need a few details to personalize your experience.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="full-name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="full-name"
                                name="fullName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="country" className="sr-only">
                                Country
                            </label>
                            <input
                                id="country"
                                name="country"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Country (e.g., Nigeria, Kenya)"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="experience-level" className="sr-only">
                                Experience Level
                            </label>
                            <select
                                id="experience-level"
                                name="experienceLevel"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                            >
                                <option value="first-time">First-time Founder</option>
                                <option value="experienced">Experienced Founder</option>
                                <option value="serial">Serial Entrepreneur</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Complete Setup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
