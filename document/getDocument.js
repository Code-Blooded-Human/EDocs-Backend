import { Document } from "../models/document.js";
import { User } from "../models/user.js";

export async function getAllDocuments(req, res, next) {
  try {
    console.log(req.user.id);
    // Find user
    const user = await User.findById(req.user.id);
    const docs = await Document.find({ owner: req.user.id });
    if (!docs) {
      throw "Document not found";
    }
    res.send({
      status: "SUCCESS",
      docs: docs,
      recentlyVisitedDocs: user.recentlyVisitedDocs,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
}
export async function getDocumentWithID(req, res, next) {
  try {
    const docs = await Document.find({
      owner: req.user.id,
      name: req.params.name,
    });
    if (!docs) {
      throw "Document not found";
    }
    res.send({ status: "SUCCESS", doc: docs[0] });
  } catch (e) {
    console.log(e);
    next(e);
  }
}
export async function getDocument(req, res, next) {
  let label = req.body.label;
  const userId = req.user.id;
  console.log({ label });
  const doc = await Document.findOne({ name: req.body.name }).populate("owner");
  if (!doc) {
    throw "Document not found";
  }
  if (doc.content.length == 0) {
    
  res.send({
    status: "SUCCESS",
    content: '',
    owner: doc.owner,
    history: doc.content,
  });

  return;
  }
  let index = doc.content.length - 1;
  if (label) {
    doc.content.map((d, i) => {
      if (d.label == label) {
        index = i;
      }
    });
  }
  const latestContent = doc.content[index].data;
  console.log({ latestContent });

  // Find User and Update recentlyVisitedDocs for user
  const user = await User.findById(userId);
  if (!user) {
    throw "User not found";
  }
  console.log("DOCUMENT", { doc });
  console.log("USER", user.recentlyVisitedDocs);
  const docIndex = user.recentlyVisitedDocs.indexOf(doc.name);
  console.log({ docIndex });
  if (docIndex == -1) {
    // doc not found in the array

    if (user.recentlyVisitedDocs === undefined) {
      console.log("undefined");
      user.recentlyVisitedDocs = [];
    }
    if (user.recentlyVisitedDocs.length == 5) {
      console.log("length 5");
      user.recentlyVisitedDocs.shift();
    }
    user.recentlyVisitedDocs.push(doc.name);
    console.log("USER AGAIN", user.recentlyVisitedDocs);
  }
  await User.findByIdAndUpdate(userId, user);

  console.log("user final", user.recentlyVisitedDocs);

  res.send({
    status: "SUCCESS",
    content: latestContent,
    owner: doc.owner,
    history: doc.content,
  });
}
