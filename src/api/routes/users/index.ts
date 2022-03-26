import { Router } from 'express';
import { UserTest } from './users.controller';

const router = Router();

router.get('/', UserTest);

export default router;
