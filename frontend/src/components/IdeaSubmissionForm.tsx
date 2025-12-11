"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ideaSubmissionSchema, IdeaSubmissionData } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import clsx from "clsx";
import { Check, ChevronRight, ChevronLeft, Lightbulb, Target, Globe, Wallet, Send } from "lucide-react";

const STEPS = [
    { id: 1, title: "The Idea", icon: Lightbulb, description: "What are you building?" },
    { id: 2, title: "Problem", icon: Target, description: "Why is it needed?" },
    { id: 3, title: "Market", icon: Globe, description: "Who is it for?" },
    { id: 4, title: "Resources", icon: Wallet, description: "What do you need?" },
    { id: 5, title: "Review", icon: Send, description: "Ready to launch?" },
];

export default function IdeaSubmissionForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors },
    } = useForm<IdeaSubmissionData>({
        resolver: zodResolver(ideaSubmissionSchema),
        mode: "onChange",
    });

    const formData = watch();

    const nextStep = async () => {
        let fieldsToValidate: (keyof IdeaSubmissionData)[] = [];

        switch (currentStep) {
            case 1:
                fieldsToValidate = ["title", "description", "category"];
                break;
            case 2:
                fieldsToValidate = ["problemStatement", "proposedSolution", "targetCustomers"];
                break;
            case 3:
                fieldsToValidate = ["targetCountries", "stage"];
                break;
            case 4:
                fieldsToValidate = ["budget", "teamSize", "timeline"];
                break;
        }

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onSubmit: SubmitHandler<IdeaSubmissionData> = async (data) => {
        if (!user) {
            alert("You must be logged in to submit an idea.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ideas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ submissionData: data, userId: user.uid }),
            });

            if (!response.ok) throw new Error("Failed to submit idea");

            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting idea:", error);
            alert("Failed to submit idea. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const CurrentIcon = STEPS[currentStep - 1].icon;

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-white">Validate Your Startup</h1>
                    <p className="mt-2 text-slate-400">Let AI analyze your business potential in minutes.</p>
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
                        {/* Sidebar / Progress */}
                        <div className="bg-slate-900/50 p-6 md:col-span-4 border-r border-white/10">
                            <div className="space-y-8">
                                {STEPS.map((step) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === step.id;
                                    const isCompleted = currentStep > step.id;

                                    return (
                                        <div key={step.id} className="flex items-start group">
                                            <div className={clsx(
                                                "flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full border-2 transition-colors duration-200",
                                                isActive ? "border-blue-500 bg-blue-500/20 text-blue-400" :
                                                    isCompleted ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" :
                                                        "border-white/10 text-slate-600"
                                            )}>
                                                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                            </div>
                                            <div className="ml-4">
                                                <p className={clsx(
                                                    "text-sm font-semibold tracking-wide uppercase",
                                                    isActive ? "text-blue-400" : "text-slate-500"
                                                )}>
                                                    {step.title}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="p-8 md:col-span-8 bg-transparent flex flex-col">
                            <div className="flex-1">
                                <div className="flex items-center mb-8">
                                    <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mr-4 border border-blue-500/30">
                                        <CurrentIcon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{STEPS[currentStep - 1].title}</h2>
                                        <p className="text-slate-400">{STEPS[currentStep - 1].description}</p>
                                    </div>
                                </div>

                                <form id="idea-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {currentStep === 1 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
                                                <input {...register("title")} className="input-field" placeholder="e.g. AgriFlow" />
                                                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">One-liner</label>
                                                <input {...register("description")} className="input-field" placeholder="Uber for tractors in Kenya" />
                                                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Sector</label>
                                                <select {...register("category")} className="input-field">
                                                    <option value="" className="bg-slate-900">Select a sector</option>
                                                    <option value="Fintech" className="bg-slate-900">Fintech</option>
                                                    <option value="Agritech" className="bg-slate-900">Agritech</option>
                                                    <option value="Healthtech" className="bg-slate-900">Healthtech</option>
                                                    <option value="E-commerce" className="bg-slate-900">E-commerce</option>
                                                    <option value="EdTech" className="bg-slate-900">EdTech</option>
                                                    <option value="Logistics" className="bg-slate-900">Logistics</option>
                                                    <option value="SaaS" className="bg-slate-900">SaaS</option>
                                                    <option value="Other" className="bg-slate-900">Other</option>
                                                </select>
                                                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">The Problem</label>
                                                <textarea {...register("problemStatement")} rows={4} className="input-field resize-none" placeholder="Describe the pain point..." />
                                                {errors.problemStatement && <p className="text-red-400 text-xs mt-1">{errors.problemStatement.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Your Solution</label>
                                                <textarea {...register("proposedSolution")} rows={4} className="input-field resize-none" placeholder="How do you solve it?" />
                                                {errors.proposedSolution && <p className="text-red-400 text-xs mt-1">{errors.proposedSolution.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Target Customer</label>
                                                <input {...register("targetCustomers")} className="input-field" placeholder="e.g. Smallholder farmers" />
                                                {errors.targetCustomers && <p className="text-red-400 text-xs mt-1">{errors.targetCustomers.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Target Markets</label>
                                                <select multiple {...register("targetCountries")} className="input-field h-32">
                                                    <option value="Nigeria" className="bg-slate-900">Nigeria</option>
                                                    <option value="Kenya" className="bg-slate-900">Kenya</option>
                                                    <option value="South Africa" className="bg-slate-900">South Africa</option>
                                                    <option value="Ghana" className="bg-slate-900">Ghana</option>
                                                    <option value="Egypt" className="bg-slate-900">Egypt</option>
                                                    <option value="Rwanda" className="bg-slate-900">Rwanda</option>
                                                </select>
                                                <p className="text-xs text-slate-500 mt-1">Hold Cmd/Ctrl to select multiple</p>
                                                {errors.targetCountries && <p className="text-red-400 text-xs mt-1">{errors.targetCountries.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Current Stage</label>
                                                <select {...register("stage")} className="input-field">
                                                    <option value="" className="bg-slate-900">Select stage</option>
                                                    <option value="Idea only" className="bg-slate-900">Idea only</option>
                                                    <option value="Prototype/MVP" className="bg-slate-900">Prototype/MVP</option>
                                                    <option value="Live/revenue" className="bg-slate-900">Live/revenue</option>
                                                </select>
                                                {errors.stage && <p className="text-red-400 text-xs mt-1">{errors.stage.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Budget</label>
                                                <select {...register("budget")} className="input-field">
                                                    <option value="" className="bg-slate-900">Select budget</option>
                                                    <option value="<$5K" className="bg-slate-900">&lt;$5K</option>
                                                    <option value="$5K-$25K" className="bg-slate-900">$5K-$25K</option>
                                                    <option value="$25K-$100K" className="bg-slate-900">$25K-$100K</option>
                                                    <option value="$100K+" className="bg-slate-900">$100K+</option>
                                                </select>
                                                {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Team Size</label>
                                                <select {...register("teamSize")} className="input-field">
                                                    <option value="" className="bg-slate-900">Select team size</option>
                                                    <option value="Solo" className="bg-slate-900">Solo</option>
                                                    <option value="2-3" className="bg-slate-900">2-3</option>
                                                    <option value="4-5" className="bg-slate-900">4-5</option>
                                                    <option value="6+" className="bg-slate-900">6+</option>
                                                </select>
                                                {errors.teamSize && <p className="text-red-400 text-xs mt-1">{errors.teamSize.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-1">Launch Timeline</label>
                                                <select {...register("timeline")} className="input-field">
                                                    <option value="" className="bg-slate-900">Select timeline</option>
                                                    <option value="<3 months" className="bg-slate-900">&lt;3 months</option>
                                                    <option value="3-6 months" className="bg-slate-900">3-6 months</option>
                                                    <option value="6-12 months" className="bg-slate-900">6-12 months</option>
                                                    <option value="12+ months" className="bg-slate-900">12+ months</option>
                                                </select>
                                                {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 5 && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                            <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
                                                <h3 className="text-lg font-semibold text-white mb-4">Review Details</h3>
                                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                                    <div>
                                                        <dt className="text-sm font-medium text-slate-400">Project</dt>
                                                        <dd className="mt-1 text-sm text-white">{formData.title}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-slate-400">Sector</dt>
                                                        <dd className="mt-1 text-sm text-white">{formData.category}</dd>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <dt className="text-sm font-medium text-slate-400">Problem</dt>
                                                        <dd className="mt-1 text-sm text-white">{formData.problemStatement}</dd>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <dt className="text-sm font-medium text-slate-400">Solution</dt>
                                                        <dd className="mt-1 text-sm text-white">{formData.proposedSolution}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className="flex items-center p-4 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
                                                <Lightbulb className="h-5 w-5 mr-3 flex-shrink-0" />
                                                <p className="text-sm">Our AI agents are ready to analyze your submission. This usually takes about 30-60 seconds.</p>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Footer / Navigation */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={clsx(
                                        "btn-secondary",
                                        currentStep === 1 && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Back
                                </button>

                                {currentStep < 5 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn-primary"
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        form="idea-form"
                                        disabled={isSubmitting}
                                        className="btn-primary bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30 hover:shadow-emerald-500/40"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                Start Analysis
                                                <Send className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
