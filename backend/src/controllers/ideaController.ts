import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { OrchestratorService } from '../services/OrchestratorService';

export const submitIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, submissionData } = req.body;

        if (!userId || !submissionData) {
            res.status(400).json({ error: 'Missing userId or submissionData' });
            return;
        }

        // Create a new idea document
        const ideaRef = db.collection('ideas').doc();
        const ideaId = ideaRef.id;

        const newIdea = {
            id: ideaId,
            userId,
            ...submissionData,
            status: 'analyzing', // Initial status
            createdAt: new Date().toISOString(),
        };

        await ideaRef.set(newIdea);

        // Trigger Agentic Analysis (Fire and forget for MVP)
        const orchestrator = new OrchestratorService();
        orchestrator.validateIdea(ideaId, newIdea).catch(err => {
            console.error(`Background validation failed for idea ${ideaId}:`, err);
        });

        console.log(`Idea ${ideaId} submitted. Analysis triggered.`);

        res.status(201).json({
            success: true,
            message: 'Idea submitted successfully. Analysis in progress.',
            ideaId
        });
    } catch (error) {
        console.error('Error submitting idea:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteIdea = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // In a real app, get this from auth middleware

        if (!id) {
            res.status(400).json({ error: 'Missing idea ID' });
            return;
        }

        // Verify ownership (simplified for MVP)
        const ideaRef = db.collection('ideas').doc(id);
        const doc = await ideaRef.get();

        if (!doc.exists) {
            res.status(404).json({ error: 'Idea not found' });
            return;
        }

        // In a real app, check if doc.data().userId === userId

        await ideaRef.delete();

        // Also delete associated validation report if it exists
        const validationsQuery = db.collection('validations').where('ideaId', '==', id);
        const validationsSnapshot = await validationsQuery.get();

        const batch = db.batch();
        validationsSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        res.status(200).json({ success: true, message: 'Idea deleted successfully' });
    } catch (error) {
        console.error('Error deleting idea:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
