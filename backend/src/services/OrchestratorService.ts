import { db } from "../config/firebase";
import { MarketAnalysisAgent } from "../agents/MarketAnalysisAgent";
import { FinancialAgent } from "../agents/FinancialAgent";
import { TechnicalAgent } from "../agents/TechnicalAgent";
import { RiskAgent } from "../agents/RiskAgent";
import { SynthesisAgent } from "../agents/SynthesisAgent";

export class OrchestratorService {
    private marketAgent: MarketAnalysisAgent;
    private financialAgent: FinancialAgent;
    private technicalAgent: TechnicalAgent;
    private riskAgent: RiskAgent;
    private synthesisAgent: SynthesisAgent;

    constructor() {
        this.marketAgent = new MarketAnalysisAgent();
        this.financialAgent = new FinancialAgent();
        this.technicalAgent = new TechnicalAgent();
        this.riskAgent = new RiskAgent();
        this.synthesisAgent = new SynthesisAgent();
    }

    async validateIdea(ideaId: string, ideaData: any) {
        console.log(`Starting validation for idea ${ideaId}`);

        try {
            // 1. Run specialized agents in parallel
            const [marketAnalysis, financialAnalysis, technicalAnalysis, riskAnalysis] = await Promise.all([
                this.marketAgent.analyze(ideaData),
                this.financialAgent.analyze(ideaData),
                this.technicalAgent.analyze(ideaData),
                this.riskAgent.analyze(ideaData),
            ]);

            console.log("Specialized agents completed");

            // 2. Run synthesis agent
            const synthesis = await this.synthesisAgent.analyze({
                idea: ideaData,
                marketAnalysis,
                financialAnalysis,
                technicalAnalysis,
                riskAnalysis,
            });

            console.log("Synthesis completed");

            // 3. Save results to Firestore
            const validationResult = {
                ideaId,
                recommendation: synthesis.recommendation,
                confidenceScore: synthesis.confidenceScore,
                overallSummary: synthesis.executiveSummary,
                analysisData: {
                    market: marketAnalysis,
                    financial: financialAnalysis,
                    technical: technicalAnalysis,
                    risk: riskAnalysis,
                    synthesis: synthesis,
                },
                createdAt: new Date().toISOString(),
                status: "completed",
            };

            // Save to validations collection
            await db.collection("validations").add(validationResult);

            // Update idea status
            await db.collection("ideas").doc(ideaId).update({
                status: "completed",
                completedAt: new Date().toISOString(),
            });

            console.log(`Validation completed for idea ${ideaId}`);
            return validationResult;

        } catch (error) {
            console.error(`Error validating idea ${ideaId}:`, error);

            // Update idea status to error
            await db.collection("ideas").doc(ideaId).update({
                status: "error",
                error: error instanceof Error ? error.message : "Unknown error",
            });

            throw error;
        }
    }
}
