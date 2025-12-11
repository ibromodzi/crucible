import { GenerativeModel } from "@google/generative-ai";
import { model } from "../config/gemini";

export interface AgentResult {
    [key: string]: any;
}

export abstract class BaseAgent {
    protected model: GenerativeModel;
    protected systemInstruction: string;

    constructor(systemInstruction: string) {
        this.model = model;
        this.systemInstruction = systemInstruction;
    }

    abstract analyze(data: any): Promise<AgentResult>;

    protected async generateJson(prompt: string): Promise<any> {
        try {
            const fullPrompt = `${this.systemInstruction}\n\n${prompt}\n\nIMPORTANT: Output ONLY valid JSON.`;
            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            // Clean up markdown code blocks if present
            const jsonString = text.replace(/```json\n|\n```/g, "").replace(/```/g, "").trim();

            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Error generating content:", error);
            throw error;
        }
    }
}
