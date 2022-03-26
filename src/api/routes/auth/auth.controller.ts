import { Request, Response, NextFunction } from 'express';

export const AuthTest = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json('auth router test');
  } catch (e) {
    next(e);
  }
};
