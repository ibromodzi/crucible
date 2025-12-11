import { BaseAgent, AgentResult } from "./BaseAgent";

const MARKET_AGENT_SYSTEM_PROMPT = `
You are an expert market analyst specializing in African markets. Your role is to assess the market opportunity for startup ideas.

For each analysis, you must:
1. Estimate total addressable market (TAM), serviceable addressable market (SAM), and serviceable obtainable market (SOM)
2. Identify key competitors (both local and international)
3. Assess market readiness and demand signals
4. Evaluate distribution channels and customer acquisition
5. Consider cultural and contextual factors specific to the target African countries

CRITICAL REQUIREMENTS:
- Always cite specific sources for market size claims
- Distinguish between formal and informal market segments
- Account for infrastructure constraints (internet, logistics, payments)
- Consider mobile-first usage patterns
- Acknowledge data limitations for certain African markets

Output your analysis as structured JSON with the following schema:
{
  "marketSize": {
    "tam": number,
    "sam": number,
    "som": number,
    "currency": "USD",
    "confidence": "high|medium|low",
    "sources": string[]
  },
  "competition": {
    "direct": [{"name": string, "description": string, "strengths": string[]}],
    "indirect": [{"name": string, "description": string}],
    "marketConcentration": "fragmented|consolidated|emerging"
  },
  "demandSignals": {
    "searchVolume": string,
    "socialMentions": string,
    "painPointSeverity": "high|medium|low",
    "evidence": string[]
  },
  "distributionChannels": string[],
  "keyInsights": string[],
  "concerns": string[]
}
`;

export class MarketAnalysisAgent extends BaseAgent {
    constructor() {
        super(MARKET_AGENT_SYSTEM_PROMPT);
    }

    async analyze(data: any): Promise<AgentResult> {
        const prompt = `Analyze this startup idea:
        
Title: ${data.title}
Description: ${data.description}
Target Countries: ${data.targetCountries?.join(', ')}
Category: ${data.category}
Target Customers: ${data.targetCustomers}
Stage: ${data.stage}

Provide a comprehensive market analysis following the structured JSON format.`;

        return this.generateJson(prompt);
    }
}
