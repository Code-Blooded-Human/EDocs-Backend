import { verify, verifyToken } from "../auth/verify.js";



function getToken(req){
    if (req.headers.authorization){
        return req.headers.authorization.split(' ')[1];
    }else{
        throw 'No token';
    }
    
}

export async function verifyJWTToken(req, res, next){
    try{
        let token = getToken(req);
        let user = await verifyToken(token);

        req.user = user;

        next();
    }catch(e){
        next(e);
    }
}