import express from 'express';
import { parkingLotService } from './parkinglot-service';

const router = express.Router();

router.get('/parkinglot', async (req, res) => {
  res.json(await parkingLotService.getParkingLot());
});

router.get('/closest-free-spot', async (req, res) => {
  const { building } = req.query;
  res.json(await parkingLotService.getClosestFreeSpot(building));
});

router.post('/set-occupied', async (req, res) => {
  const { row, col } = req.body;
  res.json(await parkingLotService.setSpotAsOccupied(row, col));
});

router.post('/set-free', async (req, res) => {
  const { row, col } = req.body;
  res.json(await parkingLotService.setSpotAsFree(row, col));
});

export { router as parkingLotController };
