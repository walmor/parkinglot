import React from 'react';
import { Button } from './Button';
import { DropDown } from './DropDown';

export function ParkingSpotSearchBar(props) {
  const { buildings, selectedSpot, selectedBuilding, parkingLotFull, dispatch } = props;

  const handleBuildingSelection = e => {
    dispatch({ type: 'SELECT_BUILDING', building: e.target.value });
  };

  const handleSpotSearch = () => {
    dispatch({ type: 'SEARCH_SPOT' });
  };

  const handleParking = () => {
    dispatch({ type: 'PARK' });
  };

  const handleParkingCanceling = () => {
    dispatch({ type: 'CANCEL_PARKING' });
  };

  const renderParkFull = () => {
    return <span className="ParkingLotFull">The parking lot is full.</span>;
  };

  const renderSelectedSpot = () => {
    return (
      <>
        <span>
          The closest free spot to {selectedBuilding + ' '}
          is at ({selectedSpot.row}, {selectedSpot.col - 1}), pointed by the green circle.
        </span>
        <Button primary onClick={handleParking}>
          Park
        </Button>
        <Button onClick={handleParkingCanceling}>Cancel</Button>
      </>
    );
  };

  const renderSpotSelection = () => {
    return (
      <>
        <DropDown value={selectedBuilding} onChange={handleBuildingSelection}>
          {buildings.map(b => (
            <option key={b}>{b}</option>
          ))}
        </DropDown>
        <Button primary onClick={handleSpotSearch}>
          Search Spot
        </Button>
      </>
    );
  };

  let content;

  if (parkingLotFull) {
    content = renderParkFull();
  } else if (selectedSpot) {
    content = renderSelectedSpot();
  } else {
    content = renderSpotSelection();
  }

  return <div className="ParkingSpotSearchBar">{content}</div>;
}
