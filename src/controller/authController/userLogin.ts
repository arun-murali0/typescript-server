import { tryCatch } from './../../utils/try-catch';
import { Request, Response, NextFunction } from 'express';
import { comparePassword } from '../../middleware/passwordHash';
import { user } from '../../model/user';
import 'express-session';
import { customError } from '../../middleware/errorHandler';

declare module 'express-session' {
  interface Session {
    passport: {
      user?: string;
    };
  }
}

export const userLogin = tryCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const findUser = await user.findOne({ email: email });
  const hashPassword = comparePassword(password, findUser.password);
  if (!hashPassword) throw new customError(400, 'please check the password');

  res.status(200).send('login successfull');
});
