import { apiClient } from '../core/api-client';
import { OCCUPIED } from './spot-statuses';

export const asyncActionHandlers = {
  LOAD_PARKINGLOT: (dispatch, getState) => async action => {
    await treatError(dispatch, async () => {
      const parkingLot = await apiClient.getParkingLot();

      dispatch({ type: 'PARKINGLOT_LOADED', parkingLot });
    });
  },

  SEARCH_SPOT: (dispatch, getState) => async action => {
    await treatError(dispatch, async () => {
      const { selectedBuilding } = getState();

      const result = await apiClient.getClosestFreeSpot(selectedBuilding);

      if (result) {
        const { row, col } = result;
        dispatch({ type: 'FREE_SPOT_FOUND', row, col });
      } else {
        dispatch({ type: 'PARKINGLOT_FULL' });
      }
    });
  },

  PARK: (dispatch, getState) => async action => {
    await treatError(dispatch, async () => {
      const { selectedSpot } = getState();
      const { row, col } = selectedSpot;

      await apiClient.setSpotAsOccupied(row, col);

      dispatch({ type: 'VEHICLE_PARKED' });
    });
  },

  FREE_SPOT: (dispatch, getState) => async action => {
    await treatError(dispatch, async () => {
      const { row, col } = action;
      const { parkingLot } = getState();

      if (parkingLot[row][col].value === OCCUPIED) {
        await apiClient.setSpotAsFree(row, col);

        dispatch({ type: 'SPOT_FREED_UP', row, col });
      }
    });
  },
};

async function treatError(dispatch, action) {
  try {
    dispatch({ type: 'CLEAR_ERROR' });
    await action();
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    dispatch({ type: 'SHOW_ERROR', error: msg });
  }
}
