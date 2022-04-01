import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => res.render('home'));

export default router;
