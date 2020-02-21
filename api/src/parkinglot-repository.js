import knex from 'knex';
import config from './config';

const db = knex(config.knex);

const parkingLotRepository = {
  async getParkingLotRows() {
    const spots = await db
      .from('parkinglot')
      .select('row', 'col', 'value')
      .orderBy(['row', 'col']);
    return spots;
  },

  async updateSpot(row, col, value) {
    await db('parkinglot')
      .where({ row, col })
      .update({ value });
  },
};

export { parkingLotRepository };
