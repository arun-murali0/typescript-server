import passport, { DoneCallback } from 'passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { user, Iuser } from '../model/user';
import { customError } from '../middleware/errorHandler';

passport.serializeUser((user: Iuser, done: DoneCallback) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done: DoneCallback) => {
  try {
    const findUser = await user.findOne({ _id: id });
    if (!findUser) throw new customError(401, 'unAuthorized');
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req: Request, email: string, password: string, done: any) => {
      try {
        const findUser = await user.findOne({ email: email }).exec();
        if (!findUser) throw new customError(400, 'user Not Found');
        done(null, findUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
