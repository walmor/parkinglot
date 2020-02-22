import React, { useEffect } from 'react';
import { reducer, initialState } from '../core/reducer';
import { useSnackbarError } from '../core/use-snack-bar-error';
import { asyncActionHandlers } from '../core/actions';
import { Title } from './Title';
import { SubTitle } from './SubTitle';
import { ParkingLot } from './ParkingLot';
import { ParkingSpotSearchBar } from './ParkingSpotSearchBar';
import { useReducerAsync } from 'use-reducer-async';

function App() {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);

  useSnackbarError(state.error);

  useEffect(() => {
    dispatch({ type: 'LOAD_PARKINGLOT' });
  }, [dispatch]);

  const handleSpotClick = (row, col) => {
    dispatch({ type: 'FREE_SPOT', row, col });
  };

  return (
    <div className="App">
      <Title>Parking Lot</Title>
      <SubTitle>Find the closest free spot to a building</SubTitle>
      <ParkingSpotSearchBar {...state} dispatch={dispatch} />
      <ParkingLot parkingLot={state.parkingLot} onSpotClicked={handleSpotClick} />
    </div>
  );
}

export default App;
