import { BadRequest } from 'http-errors';

const BUILDING_REQUIRED = new BadRequest('The building parameter is required.');
const BUILDING_NOT_FOUND = new BadRequest('Building not found.');

const NOT_AN_INTEGER = param => new BadRequest(`The ${param} parameter must be an integer number.`);
const INVALID_ROW_NUMBER = new BadRequest('Invalid row number.');
const INVALID_COL_NUMBER = new BadRequest('Invalid column number.');
const INVALID_SPOT_STATUS = expectedState =>
  new BadRequest(`The spot is not ${expectedState} anymore.`);

export {
  BUILDING_NOT_FOUND,
  BUILDING_REQUIRED,
  INVALID_ROW_NUMBER,
  INVALID_COL_NUMBER,
  INVALID_SPOT_STATUS,
  NOT_AN_INTEGER,
};
