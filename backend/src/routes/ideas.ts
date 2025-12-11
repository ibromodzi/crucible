import { Router } from 'express';
import { submitIdea, deleteIdea } from '../controllers/ideaController';

const router = Router();

router.post('/', submitIdea);
router.delete('/:id', deleteIdea);

export default router;
