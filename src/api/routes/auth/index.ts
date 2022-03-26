import { Router } from 'express';
import { AuthTest } from './auth.controller';

const router = Router();

router.get('/', AuthTest);

export default router;
