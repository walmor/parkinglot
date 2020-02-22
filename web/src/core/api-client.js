import axios from 'axios';

const BASE_ENDPOINT = '/api';

export const apiClient = {
  async getParkingLot() {
    return this.get('parkinglot');
  },

  async getClosestFreeSpot(building) {
    return this.get(`closest-free-stop?building=${building}`);
  },

  async setSpotAsFree(row, col) {
    return this.post('set-free', { row, col });
  },

  async setSpotAsOccupied(row, col) {
    return this.post('set-occupied', { row, col });
  },

  async get(endpoint) {
    const { data } = await axios.get(`${BASE_ENDPOINT}/${endpoint}`);
    return data;
  },

  async post(endpoint, body) {
    const { data } = await axios.post(`${BASE_ENDPOINT}/${endpoint}`, body);
    return data;
  },
};
