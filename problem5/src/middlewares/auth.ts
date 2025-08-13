import { Request, Response } from 'express';
import { Context } from '@helpers';

export const Auth = {
  async verifyToken(req: Request, res: Response, next) {
    const context = new Context();
    try {
      // current set temp user
      context.setUser({
        id: 1,
        name: 'user user',
      });

      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
