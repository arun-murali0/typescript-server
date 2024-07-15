import { Request, Response, NextFunction } from 'express';
import { user } from '../../model/user';
import { hashedPassword } from '../../middleware/passwordHash';
import { tryCatch } from '../../utils/try-catch';

interface resBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const createNewUser = tryCatch(
  async (req: Request, res: Response<resBody>, next: NextFunction) => {
    let userData = req.body;
    userData.password = hashedPassword(userData.password);
    const newUser = await user.create(userData);
    res.status(200).send(newUser);
  }
);
