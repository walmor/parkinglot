import { getDatabase } from './db';

const parkingLotRepository = {
  async getParkingLotRows() {
    const db = await getDatabase();

    const spots = await db
      .from('parkinglot')
      .select('row', 'col', 'value')
      .orderBy(['row', 'col']);
    return spots;
  },

  async updateSpot(row, col, value) {
    const db = await getDatabase();

    await db('parkinglot')
      .where({ row, col })
      .update({ value });
  },
};

export { parkingLotRepository };
