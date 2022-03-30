import {Router} from 'express'
import { verifyJWTToken } from '../middlewares/verifyJWTToken.js';
import { authRouter } from './auth.route.js';
import { documentRouter } from './document.route.js';

export const router = Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.use('/auth', authRouter);
router.use('/document', verifyJWTToken ,documentRouter);

