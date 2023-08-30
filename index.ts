import serverless = require('serverless-http');
import express, { Response, Request } from 'express';
import { userRouter } from './src/routes/user.routes';
import { db } from './src/instances/db.config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Hola from root!',
  });
});

app.use('/usuarios', userRouter);

app.listen(async function(err) {
  await db.authenticate();
  console.log('Database online------------------------');
  // eslint-disable-next-line no-console
  if (err) console.log('Error in server setup');
});

module.exports.handler = serverless(app);
