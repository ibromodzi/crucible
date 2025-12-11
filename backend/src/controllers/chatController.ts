import { Request, Response } from 'express';
import { model } from '../config/gemini';
import { db } from '../config/firebase';

export const chatWithAdvisor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ideaId, message, context } = req.body;

        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        // If context is not provided, fetch it from Firestore
        let ideaContext = context;
        if (!ideaContext && ideaId) {
            const ideaDoc = await db.collection('ideas').doc(ideaId).get();
            if (ideaDoc.exists) {
                // Also try to get the validation report
                const validationsSnapshot = await db.collection('validations')
                    .where('ideaId', '==', ideaId)
                    .limit(1)
                    .get();

                const validationData = !validationsSnapshot.empty ? validationsSnapshot.docs[0].data() : null;

                ideaContext = {
                    idea: ideaDoc.data(),
                    validation: validationData
                };
            }
        }

        const systemPrompt = `
You are an expert startup advisor assisting a founder with their idea.
You have access to the following context about their idea and its validation report:

CONTEXT:
${JSON.stringify(ideaContext, null, 2)}

Your goal is to answer the user's questions based on this context.
- Be helpful, encouraging, but realistic.
- Cite specific parts of the analysis (e.g., "As mentioned in the market analysis...").
- If the user asks about something not in the report, use your general startup knowledge but mention it's outside the specific analysis scope.
- Keep answers concise and actionable.
`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand. I am ready to answer questions about the startup idea and its validation report." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
