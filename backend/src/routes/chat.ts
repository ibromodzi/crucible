import { Router } from 'express';
import { chatWithAdvisor } from '../controllers/chatController';

const router = Router();

router.post('/', chatWithAdvisor);

export default router;
