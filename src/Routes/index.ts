import { Router } from 'express';
import authApi from './AuthRoute';

const app = Router();

app.use('/api/auth', authApi);

export default app;
