"use client";

import { CheckCircle, AlertTriangle, XCircle, TrendingUp, DollarSign, Code, Shield, Download, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface ValidationReportProps {
    data: any; // Type this properly in a real app
}

export default function ValidationReport({ data }: ValidationReportProps) {
    const { recommendation, confidenceScore, overallSummary, analysisData } = data;
    const reportRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const getRecommendationColor = (rec: string) => {
        switch (rec?.toLowerCase()) {
            case "go": return "text-green-600 bg-green-100";
            case "caution": return "text-yellow-600 bg-yellow-100";
            case "reconsider": return "text-red-600 bg-red-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    const marketData = [
        { name: "TAM", value: analysisData.market.marketSize.tam },
        { name: "SAM", value: analysisData.market.marketSize.sam },
        { name: "SOM", value: analysisData.market.marketSize.som },
    ];

    const downloadPDF = async () => {
        if (!reportRef.current) return;
        setIsDownloading(true);

        try {
            const dataUrl = await toPng(reportRef.current, { cacheBust: true, pixelRatio: 2 });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgWidth = 210;
            const pageHeight = 297;
            const imgProps = pdf.getImageProperties(dataUrl);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("validation-report.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <button
                    onClick={downloadPDF}
                    disabled={isDownloading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Download className="w-4 h-4 mr-2" />
                    {isDownloading ? "Generating PDF..." : "Download PDF"}
                </button>
            </div>

            <div ref={reportRef} className="space-y-8 bg-slate-950 p-4 rounded-xl">
                {/* Executive Summary */}
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Executive Summary</h2>
                            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRecommendationColor(recommendation)} bg-opacity-20`}>
                                {recommendation?.toUpperCase()}
                            </div>
                            <p className="mt-4 text-slate-300">{overallSummary}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-400">Confidence Score</div>
                            <div className="text-3xl font-bold text-blue-400">{confidenceScore}/10</div>
                        </div>
                    </div>
                </div>

                {/* Market Analysis */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                        <TrendingUp className="w-6 h-6 text-blue-400 mr-2" />
                        <h3 className="text-xl font-bold text-white">Market Analysis</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-slate-300 mb-2">Market Size (USD)</h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={marketData}>
                                        <XAxis dataKey="name" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                            itemStyle={{ color: '#f8fafc' }}
                                            cursor={{ fill: '#334155', opacity: 0.4 }}
                                        />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-300 mb-2">Key Insights</h4>
                            <ul className="list-disc pl-5 space-y-1 text-slate-400">
                                {analysisData.market.keyInsights?.map((insight: string, i: number) => (
                                    <li key={i}>{insight}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Competition Analysis */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Users className="w-6 h-6 text-orange-400 mr-2" />
                            <h3 className="text-xl font-bold text-white">Current Solutions & Competition</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-sm text-slate-300 border border-white/10 capitalize">
                            {analysisData.market.competition?.marketConcentration} Market
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-slate-300 mb-3 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                                Direct Competitors
                            </h4>
                            <div className="space-y-4">
                                {analysisData.market.competition?.direct?.map((comp: any, i: number) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="font-semibold text-white mb-1">{comp.name}</div>
                                        <p className="text-sm text-slate-400 mb-2">{comp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {comp.strengths?.map((strength: string, j: number) => (
                                                <span key={j} className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                                                    {strength}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-slate-300 mb-3 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                                Indirect Competitors
                            </h4>
                            <div className="space-y-4">
                                {analysisData.market.competition?.indirect?.map((comp: any, i: number) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="font-semibold text-white mb-1">{comp.name}</div>
                                        <p className="text-sm text-slate-400">{comp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Viability */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                        <DollarSign className="w-6 h-6 text-emerald-400 mr-2" />
                        <h3 className="text-xl font-bold text-white">Financial Viability</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-slate-300 mb-2">Startup Costs</h4>
                            <div className="text-3xl font-bold text-white">
                                ${analysisData.financial.startupCosts.total.toLocaleString()}
                            </div>
                            <p className="text-sm text-slate-500">Estimated initial capital required</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-300 mb-2">Break-even Timeline</h4>
                            <div className="text-3xl font-bold text-white">
                                {analysisData.financial.breakEvenTimeline.months} Months
                            </div>
                            <p className="text-sm text-slate-500">Confidence: {analysisData.financial.breakEvenTimeline.confidence}</p>
                        </div>
                    </div>
                </div>

                {/* Technical Feasibility */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                        <Code className="w-6 h-6 text-purple-400 mr-2" />
                        <h3 className="text-xl font-bold text-white">Technical Feasibility</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-slate-300">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {analysisData.technical.technologyStack.frontend.map((tech: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm border border-purple-500/30">{tech}</span>
                                ))}
                                {analysisData.technical.technologyStack.backend.map((tech: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm border border-purple-500/30">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-300">Complexity</h4>
                            <p className="text-slate-400 capitalize">{analysisData.technical.technologyStack.complexity}</p>
                        </div>
                    </div>
                </div>

                {/* Risk Assessment */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-red-400 mr-2" />
                        <h3 className="text-xl font-bold text-white">Risk Assessment</h3>
                    </div>
                    <div className="space-y-4">
                        {analysisData.risk.risks.map((risk: any, i: number) => (
                            <div key={i} className="border-l-4 border-red-500/50 pl-4 py-2 bg-red-500/10 rounded-r-lg">
                                <h4 className="font-semibold text-white">{risk.category.toUpperCase()} Risk</h4>
                                <p className="text-slate-300">{risk.description}</p>
                                <p className="text-sm text-slate-500 mt-1">Mitigation: {risk.mitigationStrategies[0]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
