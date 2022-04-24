import { Document } from "../models/document.js";
import { User } from "../models/user.js";

export async function getAllDocuments(req, res, next) {
  try {
    console.log(req.user.id);
    const docs = await Document.find({ owner: req.user.id });
    if (!docs) {
      throw "Document not found";
    }
    res.send({ status: "SUCCESS", docs });
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
    throw "Empty document";
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

  // Find User and Update recentlyVisistedDocs for user
  const user = await User.findById(userId);
  if (!user) {
    throw "User not found";
  }
  console.log("DOCUMENT", { doc });
  console.log("USER", user);
  const docIndex = user.recentlyVisistedDocs.indexOf(doc.id);
  console.log({ docIndex });
  if (docIndex == -1) {
    // doc not found in the array
    if (user.recentlyVisistedDocs.length == 5) {
      user.recentlyVisistedDocs.shift();
    }
    user.recentlyVisistedDocs.push(doc.id);
    console.log("USER AGAIN", { user });
  }
  await User.findByIdAndUpdate(userId, user);

  console.log("user final", user);

  res.send({
    status: "SUCCESS",
    content: latestContent,
    owner: doc.owner,
    history: doc.content,
  });
}
