import {Router} from 'express'
import { User } from '../models/user.js';


export const userRouter = Router();

userRouter.get('/getPasswords', async (req, res, next) => {
    let u = await User.findById(req.user.id)
    let passwords = u.docPasswords;
    console.log({passwords}); 
    res.send({ passwords});
});

userRouter.post('/updatePasswords', async (req, res, next) => {
    let x = await User.updateOne({_id:req.user.id},{$set:{docPasswords:req.body.passwords}} );
    console.log(x);
    console.log({updatePasswords:req.body.passwords });
        res.send({});
});


