import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'express-error-handler';
import 'express-async-errors';

import { parkingLotService } from './parkinglot-service';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/parkinglot', async (req, res) => {
  res.json(await parkingLotService.getParkingLot());
});

app.get('/closest-free-stop', async (req, res) => {
  const { building } = req.query;
  res.json(await parkingLotService.getClosestFreeSpot(building));
});

app.post('/set-occupied', async (req, res) => {
  const { row, col } = req.body;
  res.json(await parkingLotService.setSpotAsOccupied(row, col));
});

app.post('/set-free', async (req, res) => {
  const { row, col } = req.body;
  res.json(await parkingLotService.setStopAsFree(row, col));
});

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
