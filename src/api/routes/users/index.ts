import { Router } from 'express';

import { userCreateValidation, userTestValidation } from '../../validation/users';
import { handleCreateUser, handleUserTest } from './users.controller';

const router = Router();

// outer.get('/', userTestValidation, handleUserTest);
router.post('/', userCreateValidation, handleCreateUser);

export default router;
