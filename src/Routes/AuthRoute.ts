import { Router } from 'express';
import { createNewUser, userLogin } from '../controller/index';
import '../passport-Strategies/localStrategy';
import passport from 'passport';

const router = Router();

router.post('/create', createNewUser);
router.post('/login', passport.authenticate('local'), userLogin);

export default router;
