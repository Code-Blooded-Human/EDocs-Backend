import {Router} from 'express'
import { loginController, registerController } from '../auth/controllers.js';


export const authRouter = Router();

authRouter.get('/', async (req, res, next) => {
    res.send({ message: 'Auth Route is working 🚀' });
  });


authRouter.post('/login', loginController);
authRouter.post('/register',registerController);

