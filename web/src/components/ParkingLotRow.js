import React from 'react';
import { ParkingSpot } from './ParkingSpot';

export function ParkingLotRow({ spotsRow, onSpotClicked }) {
  return (
    <div className="ParkingLotRow">
      {spotsRow.map(spot => (
        <ParkingSpot key={`${spot.row},${spot.col}`} spot={spot} onSpotClicked={onSpotClicked} />
      ))}
    </div>
  );
}
