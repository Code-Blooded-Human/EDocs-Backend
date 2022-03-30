import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import { router as ApiRouter } from './routes/api.route.js';
import cors from 'cors'

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', ApiRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(200).send({
//     status: "FAILED",
//     message: err,
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
