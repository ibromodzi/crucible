"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";
import ValidationReport from "@/components/ValidationReport";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const db = getFirestore(app);

export default function ValidationPage() {
    const params = useParams();
    const id = params.id as string;
    const [validation, setValidation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchValidation = async () => {
            try {
                // Try to find validation by ideaId first (since dashboard links with ideaId)
                const q = query(collection(db, "validations"), where("ideaId", "==", id));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setValidation(querySnapshot.docs[0].data());
                } else {
                    // Fallback: Try to fetch as validation ID directly
                    const docRef = doc(db, "validations", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setValidation(docSnap.data());
                    } else {
                        setError("Validation report not found");
                    }
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchValidation();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-400 bg-slate-950">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">Validation Report</h1>
                    <p className="text-slate-400">Generated on {new Date(validation.createdAt).toLocaleDateString()}</p>
                </div>

                <ValidationReport data={validation} />
            </div>
        </div>
    );
}
