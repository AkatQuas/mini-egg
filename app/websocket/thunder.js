const url = require('url');
module.exports = {
  config: {
    name: 'thunder',
    location: '/thunder',
  },
  connection: async (ws, req) => {
    ws.on('message', async (message) => {
      console.log('In thunder receive message: %s', message);
      console.log('[Thunder] got headers: %o ',req.headers);
      const { query } = url.parse(req.url, true);
      console.log('[Thunder] got token "%s", got uuid "%s" ', query.token, query.uuid);


      ws.send('We[thunder] have you '.concat(message));
      ws.close();
    });
    ws.on('close', async () => {
      console.log('thunder close');
    });
  }

}