import React from 'react';

export function ParkingSpot({ spot, onSpotClicked }) {
  const { value, selected, row, col } = spot;
  const className = `ParkingSpot ParkingSpot--${value}`;
  const label = value.match(/[A-Z]\d{1}/) ? value : '';

  return (
    <div className={className} onClick={() => onSpotClicked(row, col)}>
      {label}
      {selected && <div className="indicator" />}
    </div>
  );
}
