import jwt from 'jsonwebtoken'

import { User } from "../models/user.js";

export async function verify(token){
    try{
            

        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return tokenData;
    }catch(err){
        throw "Invalid token";
    }
}

export async function verifyToken(token){
    if(!token) return {};
    return new Promise((resolve,reject) =>
       jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded) => err ? reject({}) : 
                                                   resolve(decoded))
    );
 }