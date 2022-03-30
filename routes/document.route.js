import {Router} from 'express'
import { createDocument } from '../document/createDocument.js';
import { getAllDocuments, getDocument } from '../document/getDocument.js';
import { updateDocument } from '../document/updateDocument.js';

export const documentRouter = Router();

documentRouter.get('/', getAllDocuments);
documentRouter.post('/create', createDocument);
documentRouter.post('/update', updateDocument);
documentRouter.post('/fetch', getDocument);


