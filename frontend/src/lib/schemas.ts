import { z } from "zod";

export const ideaSubmissionSchema = z.object({
    // Step 1: Basic Info
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(200),
    category: z.enum([
        "Fintech",
        "Agritech",
        "Healthtech",
        "E-commerce",
        "EdTech",
        "Logistics",
        "SaaS",
        "Other",
    ]),

    // Step 2: Problem & Solution
    problemStatement: z.string().min(50, "Please provide more detail about the problem").max(2000),
    proposedSolution: z.string().min(50, "Please provide more detail about the solution").max(2000),
    targetCustomers: z.string().min(20, "Describe your target customers").max(1000),
    distributionChannels: z.string().optional(),

    // Step 3: Market & Context
    targetCountries: z.array(z.string()).min(1, "Select at least one country"),
    targetCity: z.string().optional(),
    stage: z.enum(["Idea only", "Prototype/MVP", "Live/revenue"]),
    competitors: z.string().optional(),

    // Step 4: Resources & Timeline
    budget: z.string(), // Could be enum or range
    teamSize: z.enum(["Solo", "2-3", "4-5", "6+"]),
    timeline: z.enum(["<3 months", "3-6 months", "6-12 months", "12+ months"]),
});

export type IdeaSubmissionData = z.infer<typeof ideaSubmissionSchema>;
