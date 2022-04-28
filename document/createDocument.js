import { Document } from "../models/document.js";

export async function createDocument(req,res,next){
    try{
        console.log(req.user);
        const doc = await Document.create({name:req.body.name, owner:req.user.id, passwordShaB62:req.body.passwordShaB62});
        res.send({status:"SUCCESS"});
    }catch(e){
        next(e);
    }
}