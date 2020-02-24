import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'express-error-handler';
import 'express-async-errors';
import cors from 'cors';
import { parkingLotController } from './parkinglot-controller';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('webapp'));
app.use('/api', parkingLotController);

app.use(
  errorHandler({
    serializer(err) {
      const body = {
        status: err.status,
        message: err.message,
      };

      return body;
    },
  }),
);

export default app;
