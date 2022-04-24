import { Document } from "../models/document.js";


export async function  getAllDocuments(req,res, next){
    try{
        console.log(req.user.id);
        const docs = await Document.find({owner:req.user.id});
        if(!docs){
            throw 'Document not found';
        }
        res.send({status:"SUCCESS", docs});
    }catch(e){
        console.log(e);
        next(e);
    }
}
export async function  getDocumentWithID(req,res, next){
    try{
        console.log(req.user.id);
        const docs = await Document.find({owner:req.user.id, name:req.params.name});
        if(!docs){
            throw 'Document not found';
        }
        res.send({status:"SUCCESS", doc:docs[0]});
    }catch(e){
        console.log(e);
        next(e);
    }
}
export async function getDocument(req,res,next){
        
        let label = req.body.label;
        console.log({label});
        const doc = await Document.findOne({name:req.body.name}).populate('owner');
        if(!doc){
            throw 'Document not found';
        }
        if(doc.content.length == 0){
            res.send({status:"SUCCESS", content:[], owner:doc.owner});
            return;  
        }
        let index = doc.content.length-1
        if(label){
           doc.content.map((d,i)=>{
               if(d.label == label){
                   index = i;
               }
           })
        }
        const latestContent = doc.content[index].data;
        console.log({latestContent});
        res.send({status:"SUCCESS", content:latestContent, owner:doc.owner, history: doc.content});
}