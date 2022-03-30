import { User } from "../models/user.js";


export async function register(name, email, password){
    await User.create({name:name, password:password, email:email});
    return;
}