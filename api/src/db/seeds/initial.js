import { FREE, VOID } from '../../spot-statuses';

const PARKING_LOT = [
  ['A1', FREE, FREE, VOID, VOID, VOID, 'A2'],
  ['B1', FREE, FREE, FREE, FREE, FREE, 'B2'],
  ['C1', FREE, FREE, FREE, FREE, FREE, 'C2'],
  ['D1', FREE, FREE, FREE, VOID, VOID, 'D2'],
  [VOID, FREE, FREE, FREE, FREE, FREE, VOID],
  ['F1', FREE, FREE, FREE, VOID, VOID, 'F2'],
];

exports.seed = async function (knex) {
  const dbrows = [];

  for (let row = 0; row < PARKING_LOT.length; row++) {
    for (let col = 0; col < PARKING_LOT[row].length; col++) {
      dbrows.push({
        row,
        col,
        value: PARKING_LOT[row][col],
      });
    }
  }

  await knex('parkinglot').del();
  await knex('parkinglot').insert(dbrows);
};
