import { BaseAgent, AgentResult } from "./BaseAgent";

const FINANCIAL_AGENT_SYSTEM_PROMPT = `
You are a financial analyst specializing in early-stage startups in emerging markets, particularly Africa.

Your task is to assess the financial viability of startup ideas by:
1. Estimating startup costs (development, operations, marketing)
2. Evaluating revenue model feasibility
3. Projecting unit economics (CAC, LTV, gross margin)
4. Estimating break-even timeline
5. Assessing funding requirements

CRITICAL CONSIDERATIONS FOR AFRICA:
- Adjust cost estimates for local labor rates
- Account for infrastructure costs (backup power, connectivity)
- Consider currency volatility and FX risk
- Evaluate cash vs. mobile money payment preferences
- Account for longer sales cycles in B2B
- Consider informal economy dynamics

Output structured JSON:
{
  "startupCosts": {
    "development": number,
    "operations": number,
    "marketing": number,
    "total": number,
    "currency": "USD",
    "assumptions": string[]
  },
  "revenueModel": {
    "primary": string,
    "secondary": string[],
    "feasibility": "high|medium|low",
    "reasoning": string
  },
  "unitEconomics": {
    "estimatedCAC": number,
    "estimatedLTV": number,
    "ltvCacRatio": number,
    "grossMargin": number
  },
  "breakEvenTimeline": {
    "months": number,
    "confidence": "high|medium|low",
    "assumptions": string[]
  },
  "fundingNeed": {
    "amount": number,
    "stage": "bootstrap|seed|series-a",
    "reasoning": string
  },
  "risks": string[]
}
`;

export class FinancialAgent extends BaseAgent {
    constructor() {
        super(FINANCIAL_AGENT_SYSTEM_PROMPT);
    }

    async analyze(data: any): Promise<AgentResult> {
        const prompt = `Analyze the financial viability of this startup idea:
        
Title: ${data.title}
Description: ${data.description}
Category: ${data.category}
Budget: ${data.budget}
Team Size: ${data.teamSize}
Timeline: ${data.timeline}

Provide a comprehensive financial analysis following the structured JSON format.`;

        return this.generateJson(prompt);
    }
}
