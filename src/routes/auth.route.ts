import { Router } from 'express';

import { signUpValidator, logInValidator } from '../middlewares';

import { signUp, logIn } from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/api/v1/signup', signUpValidator, signUp);
authRoute.post('/api/v1/login', logInValidator, logIn);

export { authRoute };
