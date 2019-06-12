const url = require('url');
const Websocket = require('ws');
const fs = require('fs-extra');
const { resolveApp } = require('../utils');

const websocketMiddleware = (server) => {
  const wssPathMap = fs
    .readdirSync(resolveApp('websocket'))
    .reduce((acc, file) => {
      const modu = require(resolveApp('websocket', file));
      const { config, connection } = modu;
      const wss = new Websocket.Server({ noServer: true });
      wss.on('connection', connection);
      acc[config.location] = wss;
      return acc;
    }, {});

  server.on('upgrade', (request, socket, head) => {
    const { pathname } = url.parse(request.url);
    if (wssPathMap[pathname]) {
      const wss = wssPathMap[pathname];
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

};

module.exports = websocketMiddleware;