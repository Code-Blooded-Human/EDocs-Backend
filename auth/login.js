import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';

export async function login(email,password){

    const user = await User.findOne({email:email});
    
    if(!user){
        throw "Invalid Email address"; 
    }

    if(user.password != password){
        throw "Invalid password";
        
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        email:user.email,
        id:user._id,
        name:user.name
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    return token;
}