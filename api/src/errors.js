import { BadRequest } from 'http-errors';

const BUILDING_NOT_FOUND = new BadRequest('Bulding not found.');
const INVALID_ROW_NUMBER = new BadRequest('Invalid row number.');
const INVALID_COL_NUMBER = new BadRequest('Invalid column number.');
const INVALID_SPOT_STATUS = (expectedStatus) => new BadRequest(`The spot is not ${expectedStatus}.`);

export {
  BUILDING_NOT_FOUND, INVALID_ROW_NUMBER, INVALID_COL_NUMBER, INVALID_SPOT_STATUS,
};
