import http from 'http';
import app from './app';

import config from './config';

/* eslint-disable no-console */
(async () => {
  try {
    await http.createServer(app).listen(config.port);
    console.log(`Server listening on port ${config.port}.`);
  } catch (err) {
    console.error(`Error starting server: ${err}`);
  }
})();
