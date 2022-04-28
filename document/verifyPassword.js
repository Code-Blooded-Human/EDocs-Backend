import { Document } from "../models/document.js";

export async function verifyPassword(req,res,next){
    try{
        
        const doc = await Document.findOne({name:req.body.name, passwordShaB62:req.body.passwordShaB62});
        if(doc){
            res.send({status:"SUCCESS"});
        }else{
            res.send({status:"FAIL", msg:'Password incorrect'});
        }
        
    }catch(e){
        next(e);
    }
}