"use client";

import { useAuth } from "@/context/AuthContext";
import { app } from "@/lib/firebase";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Loader2, FileText, CheckCircle, AlertCircle, Clock, ArrowRight, Search, Filter, Trash2, TrendingUp, Activity } from "lucide-react";
import clsx from "clsx";

const db = getFirestore(app);

interface Idea {
    id: string;
    title: string;
    description: string;
    status: "analyzing" | "completed" | "error";
    createdAt: string;
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "analyzing" | "error">("all");
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        const fetchIdeas = async () => {
            if (!user) return;

            try {
                const q = query(
                    collection(db, "ideas"),
                    where("userId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );

                const querySnapshot = await getDocs(q);
                const fetchedIdeas: Idea[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedIdeas.push({ id: doc.id, ...doc.data() } as Idea);
                });

                setIdeas(fetchedIdeas);
            } catch (error) {
                console.error("Error fetching ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            if (user) {
                fetchIdeas();
            } else {
                setLoading(false);
            }
        }
    }, [user, authLoading]);

    const handleDelete = async (e: React.MouseEvent, ideaId: string) => {
        e.preventDefault(); // Prevent navigation
        if (!confirm("Are you sure you want to delete this idea? This action cannot be undone.")) return;

        setIsDeleting(ideaId);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ideas/${ideaId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user?.uid }),
            });

            if (response.ok) {
                setIdeas((prev) => prev.filter((idea) => idea.id !== ideaId));
            } else {
                alert("Failed to delete idea");
            }
        } catch (error) {
            console.error("Error deleting idea:", error);
            alert("Error deleting idea");
        } finally {
            setIsDeleting(null);
        }
    };

    const filteredIdeas = useMemo(() => {
        return ideas.filter((idea) => {
            const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                idea.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === "all" || idea.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [ideas, searchTerm, filterStatus]);

    const stats = useMemo(() => {
        return {
            total: ideas.length,
            completed: ideas.filter(i => i.status === 'completed').length,
            analyzing: ideas.filter(i => i.status === 'analyzing').length
        };
    }, [ideas]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-slate-50">
                <p className="text-slate-600">Please log in to view your dashboard.</p>
                <Link href="/login" className="btn-primary">
                    Log In
                </Link>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "error": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <CheckCircle className="w-4 h-4 mr-1.5" />;
            case "error": return <AlertCircle className="w-4 h-4 mr-1.5" />;
            default: return <Clock className="w-4 h-4 mr-1.5" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Top Navigation Bar */}
            <nav className="fixed w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center group">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-all">Crucible</span>
                            </Link>
                            <span className="ml-4 px-2 py-0.5 rounded-full bg-white/5 text-xs font-medium text-slate-400 border border-white/10">Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileText className="w-16 h-16 text-blue-400" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Total Ideas</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <CheckCircle className="w-16 h-16 text-emerald-400" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">Completed Validations</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.completed}</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity className="w-16 h-16 text-amber-400" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">In Progress</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.analyzing}</p>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Your Ideas</h1>
                        <p className="text-slate-400 mt-1">Track and manage your validation reports.</p>
                    </div>
                    <Link href="/submit-idea" className="btn-primary group">
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                        New Validation
                    </Link>
                </div>

                {/* Filters/Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search ideas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-sm"
                            />
                        </div>
                    </div>
                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-slate-900/50 text-white appearance-none focus:outline-none focus:border-blue-500/50 transition-all backdrop-blur-sm cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="analyzing">Analyzing</option>
                            <option value="error">Failed</option>
                        </select>
                    </div>
                </div>

                {filteredIdeas.length === 0 ? (
                    <div className="glass-panel rounded-3xl border border-dashed border-white/10 p-16 text-center animate-in fade-in zoom-in duration-500 delay-300">
                        <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                            <FileText className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No ideas found</h3>
                        <p className="text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
                            {searchTerm || filterStatus !== 'all' ? "Try adjusting your search or filters." : "Submit your first startup concept to get a comprehensive AI analysis of its potential."}
                        </p>
                        {(searchTerm || filterStatus !== 'all') ? (
                            <button
                                onClick={() => { setSearchTerm(""); setFilterStatus("all") }}
                                className="btn-secondary"
                            >
                                Clear Filters
                            </button>
                        ) : (
                            <Link href="/submit-idea" className="btn-primary">
                                <Plus className="w-5 h-5 mr-2" />
                                Start Validation
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIdeas.map((idea, index) => (
                            <Link
                                key={idea.id}
                                href={`/validations/${idea.id}`}
                                className="group relative glass-panel rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                                style={{ animationDelay: `${index * 100 + 300}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={clsx(
                                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md",
                                            getStatusColor(idea.status)
                                        )}>
                                            {getStatusIcon(idea.status)}
                                            {idea.status === 'completed' ? 'Completed' : idea.status === 'error' ? 'Failed' : 'Analyzing'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                {new Date(idea.createdAt).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={(e) => handleDelete(e, idea.id)}
                                                disabled={isDeleting === idea.id}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors z-20"
                                                title="Delete Idea"
                                            >
                                                {isDeleting === idea.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-1">
                                        {idea.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                                        {idea.description}
                                    </p>

                                    <div className="flex items-center text-blue-400 text-sm font-bold mt-auto group-hover:translate-x-1 transition-transform">
                                        View Report
                                        <div className="ml-2 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
