import { login } from "./login.js";
import { register } from "./register.js";



export async function loginController(req, res, next){
    try{
        const {email,password} = req.body;
        const token = await login(email, password);
        res.send({status:"SUCCESS", token});
    }catch(err){
        console.log(err);
        next(err);
    }
}

export async function registerController(req,res,next){
    try{
        const {email,password,name} = req.body;
        await register(name,email,password);
        res.send({status:"SUCCESS"})
    }catch(err){
        next(err);
    }
}