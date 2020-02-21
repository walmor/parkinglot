import { parkingLotRepository } from './parkinglot-repository';
import { FREE, OCCUPIED } from './spot-statuses';
import * as errors from './errors';

const parkingLotService = {
  async getParkingLot() {
    const dbrows = await parkingLotRepository.getParkingLotRows();

    const parkingLot = [];

    for (const dbrow of dbrows) {
      if (dbrow.row >= parkingLot.length) {
        parkingLot.push([]);
      }

      parkingLot[parkingLot.length - 1].push(dbrow.value);
    }

    return parkingLot;
  },

  async getClosestFreeSpot(building) {
    const parkingLot = await this.getParkingLot();
    const buildingPosition = this.findBuildingPosition(parkingLot, building);

    const queue = [buildingPosition];
    const visited = new Set();

    while (queue.length) {
      const pos = queue.shift();
      const id = `${pos.row},${pos.col}`;
      const value = parkingLot[pos.row][pos.col];

      if (value === FREE) {
        return pos;
      }

      if (visited.has(id)) continue;

      visited.add(id);

      if (pos.row > 0) {
        // Enqueue the spot on the top
        queue.push({ row: pos.row - 1, col: pos.col });
      }

      if (pos.col + 1 < parkingLot[pos.row].length) {
        // Enqueue the spot on the right
        queue.push({ row: pos.row, col: pos.col + 1 });
      }

      if (pos.row + 1 < parkingLot.length) {
        // Enqueue the spot on the bottom
        queue.push({ row: pos.row + 1, col: pos.col });
      }

      if (pos.col > 0) {
        // Enqueue the spot on the left
        queue.push({ row: pos.row, col: pos.col - 1 });
      }
    }

    return null;
  },

  findBuildingPosition(parkingLot, building) {
    for (let row = 0; row < parkingLot.length; row++) {
      let col = 0;

      if (parkingLot[row][col] === building) {
        return { row, col };
      }

      col = parkingLot[row].length - 1;

      if (parkingLot[row][col] === building) {
        return { row, col };
      }
    }

    throw errors.BUILDING_NOT_FOUND;
  },

  async setSpotAsOccupied(row, col) {
    await this.ensureSpotCanBeUpdated(row, col, FREE);

    await parkingLotRepository.updateSpot(row, col, OCCUPIED);

    return { row, col, status: OCCUPIED };
  },

  async setStopAsFree(row, col) {
    await this.ensureSpotCanBeUpdated(row, col, OCCUPIED);

    await parkingLotRepository.updateSpot(row, col, FREE);

    return { row, col, status: FREE };
  },

  async ensureSpotCanBeUpdated(row, col, expectedStatus) {
    const parkingLot = await this.getParkingLot();

    if (row < 0 || row >= parkingLot.length) {
      throw errors.INVALID_ROW_NUMBER;
    }

    if (col < 0 || col >= parkingLot[row].length) {
      throw errors.INVALID_COL_NUMBER;
    }

    if (parkingLot[row][col] !== expectedStatus) {
      throw errors.INVALID_SPOT_STATUS(expectedStatus);
    }
  },
};

export { parkingLotService };
