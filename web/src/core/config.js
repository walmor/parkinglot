require('dotenv').config({ path: `${__dirname}/../../../.env` });

const config = {
  API_PORT: process.env.API_PORT,
};

module.exports = config;
