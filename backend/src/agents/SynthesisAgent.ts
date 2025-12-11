import { BaseAgent, AgentResult } from "./BaseAgent";

const SYNTHESIS_AGENT_SYSTEM_PROMPT = `
You are a senior startup advisor synthesizing analysis from multiple specialized agents.

You will receive findings from:
- Market Analysis Agent
- Financial Viability Agent
- Technical Feasibility Agent
- Risk Assessment Agent

Your role is to:
1. Identify key patterns and insights across all analyses
2. Highlight conflicts or inconsistencies
3. Generate an overall GO/CAUTION/NO-GO recommendation
4. Create prioritized action items
5. Identify critical assumptions that need validation
6. Suggest potential pivots or adjustments

RECOMMENDATION CRITERIA:
- GO: Strong market opportunity, feasible execution, manageable risks
- PROCEED WITH CAUTION: Promising but significant concerns exist
- RECONSIDER: Major red flags or fundamental issues

Output structured JSON:
{
  "recommendation": "go|caution|reconsider",
  "confidenceScore": number (1-10),
  "executiveSummary": string,
  "strengths": string[],
  "concerns": string[],
  "criticalAssumptions": [
    {
      "assumption": string,
      "importance": "critical|important|nice-to-validate",
      "validationMethod": string
    }
  ],
  "nextSteps": [
    {
      "action": string,
      "priority": number,
      "timeline": string,
      "resources": string[]
    }
  ],
  "potentialPivots": string[],
  "comparableStartups": string[]
}
`;

export class SynthesisAgent extends BaseAgent {
    constructor() {
        super(SYNTHESIS_AGENT_SYSTEM_PROMPT);
    }

    async analyze(data: any): Promise<AgentResult> {
        const prompt = `Synthesize the following analysis results for the startup idea "${data.idea.title}":

MARKET ANALYSIS:
${JSON.stringify(data.marketAnalysis, null, 2)}

FINANCIAL ANALYSIS:
${JSON.stringify(data.financialAnalysis, null, 2)}

TECHNICAL ANALYSIS:
${JSON.stringify(data.technicalAnalysis, null, 2)}

RISK ASSESSMENT:
${JSON.stringify(data.riskAnalysis, null, 2)}

Provide a comprehensive synthesis and recommendation following the structured JSON format.`;

        return this.generateJson(prompt);
    }
}
