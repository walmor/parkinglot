import { parkingLotRepository } from './parkinglot-repository';
import { parkingLotService } from './parkinglot-service';
import { FREE, OCCUPIED, VOID } from './spot-statuses';
import * as errors from './errors';

describe('the parking lot service', () => {
  describe('when getting the parking slot layout', () => {
    it('should convert the db rows to a matrix', async () => {
      const dbrows = [
        { row: 0, col: 0, value: 'A1' },
        { row: 0, col: 1, value: FREE },
        { row: 0, col: 2, value: 'A2' },
        { row: 1, col: 0, value: 'B1' },
        { row: 1, col: 1, value: OCCUPIED },
        { row: 1, col: 2, value: 'B2' },
        { row: 2, col: 0, value: 'C1' },
        { row: 2, col: 1, value: VOID },
        { row: 2, col: 2, value: 'C2' },
      ];

      parkingLotRepository.getParkingLotRows = jest.fn(() => Promise.resolve(dbrows));

      const parkingLot = await parkingLotService.getParkingLot();

      const expectedParkingLot = [
        ['A1', FREE, 'A2'],
        ['B1', OCCUPIED, 'B2'],
        ['C1', VOID, 'C2'],
      ];

      expect(parkingLot).toMatchObject(expectedParkingLot);
    });
  });

  describe('when updating a spot', () => {
    const parkingLot = [
      ['A1', FREE, 'A2'],
      ['B1', OCCUPIED, 'B2'],
      ['C1', VOID, 'C2'],
    ];

    beforeEach(() => {
      parkingLotRepository.updateSpot = jest.fn(() => Promise.resolve());
      parkingLotService.getParkingLot = jest.fn(() => Promise.resolve(parkingLot));
    });

    afterEach(() => {
      parkingLotRepository.updateSpot.mockRestore();
      parkingLotService.getParkingLot.mockRestore();
    });

    describe('when setting a spot as occupied', () => {
      it('should throw error if an invalid position is given', async () => {
        const setSpotAsOccupied = parkingLotService.setStopAsFree(1, 4);

        await expect(setSpotAsOccupied).rejects.toThrow(errors.INVALID_COL_NUMBER);
      });

      it('should throw error if the spot is already occupied', async () => {
        const setSpotAsOccupied = parkingLotService.setSpotAsOccupied(1, 1);

        await expect(setSpotAsOccupied).rejects.toMatchObject(errors.INVALID_SPOT_STATUS(FREE));
      });

      it('should update the spot correctly', async () => {
        await parkingLotService.setSpotAsOccupied(0, 1);

        expect(parkingLotRepository.updateSpot).toHaveBeenCalledWith(0, 1, OCCUPIED);
      });
    });

    describe('when setting a spot as free', () => {
      it('should throw error if an invalid position is given', async () => {
        const setSpotAsOccupied = parkingLotService.setStopAsFree(-1, 1);

        await expect(setSpotAsOccupied).rejects.toThrow(errors.INVALID_ROW_NUMBER);
      });

      it('should throw error if the spot is already free', async () => {
        const setSpotAsOccupied = parkingLotService.setStopAsFree(0, 1);

        await expect(setSpotAsOccupied).rejects.toMatchObject(errors.INVALID_SPOT_STATUS(OCCUPIED));
      });

      it('should update the spot correctly', async () => {
        parkingLotRepository.updateSpot = jest.fn();

        await parkingLotService.setStopAsFree(1, 1);

        expect(parkingLotRepository.updateSpot).toHaveBeenCalledWith(1, 1, FREE);
      });
    });
  });

  describe('when finding a building', () => {
    const parkingLot = [
      ['A1', FREE, 'A2'],
      ['B1', OCCUPIED, 'B2'],
      ['C1', VOID, 'C2'],
    ];

    const tests = [
      { building: 'A1', pos: { row: 0, col: 0 } },
      { building: 'B2', pos: { row: 1, col: 2 } },
      { building: 'C2', pos: { row: 2, col: 2 } },
    ];

    it.each(tests)('should find an existing building', ({ building, pos }) => {
      const result = parkingLotService.findBuildingPosition(parkingLot, building);

      expect(result).toMatchObject(pos);
    });

    it('should throw error if the building does not exist', async () => {
      const find = () => parkingLotService.findBuildingPosition(parkingLot, 'F1');

      expect(find).toThrow(errors.BUILDING_NOT_FOUND);
    });
  });

  describe('when finding the closest free spot', () => {
    const parkingLot = [
      ['A1', FREE, OCCUPIED, OCCUPIED, OCCUPIED, 'A2'],
      ['B1', OCCUPIED, FREE, OCCUPIED, OCCUPIED, 'B2'],
      ['C1', OCCUPIED, OCCUPIED, FREE, OCCUPIED, 'C2'],
      ['D1', FREE, FREE, FREE, OCCUPIED, 'D2'],
    ];

    const fullParkingLot = [
      ['A1', OCCUPIED, 'A2'],
      ['B1', OCCUPIED, 'B2'],
      ['C1', OCCUPIED, 'C2'],
    ];

    afterEach(() => {
      parkingLotService.getParkingLot.mockRestore();
    });

    const tests = [
      ['A1', { row: 0, col: 1 }],
      ['A2', { row: 2, col: 3 }],
      ['B1', { row: 0, col: 1 }],
      ['B2', { row: 2, col: 3 }],
      ['C1', { row: 3, col: 1 }],
      ['C2', { row: 2, col: 3 }],
      ['D1', { row: 3, col: 1 }],
    ];

    it.each(tests)('should find the correct spot if available (%s)', async (building, pos) => {
      parkingLotService.getParkingLot = jest.fn(() => Promise.resolve(parkingLot));

      const result = await parkingLotService.getClosestFreeSpot(building);

      expect(result).toMatchObject(pos);
    });

    it('should return null if the parking slot is full', async () => {
      parkingLotService.getParkingLot = jest.fn(() => Promise.resolve(fullParkingLot));

      const result = await parkingLotService.getClosestFreeSpot('A1');

      expect(result).toBeNull();
    });
  });
});
