import { OCCUPIED, FREE, VOID } from './spot-statuses';

export const initialState = {
  parkingLot: [],
  buildings: [],
  selectedBuilding: '',
  selectedSpot: null,
  parkingLotFull: false,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'PARKINGLOT_LOADED': {
      const parkingLot = convertParkingLot(action.parkingLot);
      const buildings = getBuildings(action.parkingLot);
      const parkingLotFull = isParkingLotFull(parkingLot);

      return {
        ...state,
        parkingLot,
        buildings,
        parkingLotFull,
        selectedBuilding: buildings[0],
      };
    }

    case 'SELECT_BUILDING': {
      return { ...state, selectedBuilding: action.building };
    }

    case 'FREE_SPOT_FOUND': {
      const { row, col } = action;

      const parkingLot = [...state.parkingLot];
      parkingLot.forEach(r => r.forEach(s => (s.selected = false)));
      parkingLot[row][col].selected = true;

      return { ...state, selectedSpot: { row, col }, parkingLot };
    }

    case 'VEHICLE_PARKED': {
      const { row, col } = state.selectedSpot;

      const parkingLot = [...state.parkingLot];
      const spot = parkingLot[row][col];
      spot.selected = false;
      spot.value = OCCUPIED;

      const parkingLotFull = isParkingLotFull(parkingLot);

      return { ...state, selectedSpot: null, parkingLot, parkingLotFull };
    }

    case 'CANCEL_PARKING': {
      const { row, col } = state.selectedSpot;

      const parkingLot = [...state.parkingLot];
      parkingLot[row][col].selected = false;

      return { ...state, selectedSpot: null, parkingLot };
    }

    case 'SPOT_FREED_UP': {
      const { row, col } = action;

      const parkingLot = [...state.parkingLot];
      parkingLot[row][col].value = FREE;

      return { ...state, parkingLot, parkingLotFull: false };
    }

    case 'PARKINGLOT_FULL': {
      const parkingLot = [...state.parkingLot];
      parkingLot.forEach(r =>
        r.forEach(s => {
          if (s.value === FREE) {
            s.value = OCCUPIED;
          }
        }),
      );

      return { ...state, parkingLotFull: true, parkingLot };
    }

    case 'SHOW_ERROR': {
      return { ...state, error: action.error };
    }

    case 'CLEAR_ERROR': {
      return { ...state, error: null };
    }

    default:
      throw new Error('no such action type');
  }
};

function convertParkingLot(parkingLotArray) {
  const parkingLot = parkingLotArray.map((row, ridx) =>
    row.map((s, sidx) => ({ value: s, row: ridx, col: sidx })),
  );

  return parkingLot;
}

function getBuildings(parkingLotArray) {
  const buildings = [];

  for (const row of parkingLotArray) {
    if (row[0] !== VOID) {
      buildings.push(row[0]);
    }

    if (row[row.length - 1] !== VOID) {
      buildings.push(row[row.length - 1]);
    }
  }

  return buildings;
}

function isParkingLotFull(parkingLot) {
  return !parkingLot.some(r => r.some(s => s.value === FREE));
}
