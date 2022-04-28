import {Router} from 'express'
import { createDocument } from '../document/createDocument.js';
import { getAllDocuments, getDocument, getDocumentWithID } from '../document/getDocument.js';
import { updateDocument } from '../document/updateDocument.js';
import { verifyPassword } from '../document/verifyPassword.js';

export const documentRouter = Router();

documentRouter.get('/', getAllDocuments);
documentRouter.get('/:name', getDocumentWithID);
documentRouter.post('/create', createDocument);
documentRouter.post('/update', updateDocument);
documentRouter.post('/fetch', getDocument);
documentRouter.post('/verifyPassword', verifyPassword);


