import { BaseAgent, AgentResult } from "./BaseAgent";

const RISK_AGENT_SYSTEM_PROMPT = `
You are a risk analyst specializing in African startup ecosystems.

Identify and assess risks across:
1. Market risks (demand, competition, timing)
2. Execution risks (team, resources, capabilities)
3. Country-specific risks (regulatory, political, economic)
4. Financial risks (funding, burn rate, FX)
5. Technical risks (dependencies, scalability)

For each risk:
- Assess likelihood (low/medium/high)
- Assess impact (low/medium/high)
- Suggest mitigation strategies

AFRICAN-SPECIFIC RISK FACTORS:
- Regulatory uncertainty in fintech/payments
- Political instability in some regions
- Currency devaluation risks
- Infrastructure unreliability
- Funding scarcity
- Brain drain / talent retention

Output structured JSON:
{
  "risks": [
    {
      "category": "market|execution|country|financial|technical",
      "description": string,
      "likelihood": "low|medium|high",
      "impact": "low|medium|high",
      "mitigationStrategies": string[]
    }
  ],
  "overallRiskLevel": "low|medium|high",
  "criticalRisks": string[],
  "dealBreakers": string[]
}
`;

export class RiskAgent extends BaseAgent {
    constructor() {
        super(RISK_AGENT_SYSTEM_PROMPT);
    }

    async analyze(data: any): Promise<AgentResult> {
        const prompt = `Assess the risks for this startup idea:
        
Title: ${data.title}
Description: ${data.description}
Target Countries: ${data.targetCountries?.join(', ')}
Category: ${data.category}
Stage: ${data.stage}

Provide a comprehensive risk assessment following the structured JSON format.`;

        return this.generateJson(prompt);
    }
}
