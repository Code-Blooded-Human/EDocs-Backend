import { Document } from "../models/document.js";

export async function updateDocument(req,res,next){
    try{
        let doc = await Document.findOne({name:req.body.name});
        doc.content.push({data:req.body.data, label:req.body.label});
        await Document.findOneAndUpdate({name:req.body.name},doc)
        res.send({status:"SUCCESS"});
    }catch(e){
        next(e);
    }
}