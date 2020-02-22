import React from 'react';
import { ParkingLotRow } from './ParkingLotRow';

export function ParkingLot({ parkingLot, onSpotClicked }) {
  return (
    <div className="ParkingLot">
      {parkingLot.map((spotsRow, i) => (
        <ParkingLotRow key={i} spotsRow={spotsRow} onSpotClicked={onSpotClicked} />
      ))}
    </div>
  );
}
