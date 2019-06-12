module.exports = {
  config: {
    name: 'zelda',
    location: '/zelda',
  },
  connection: async (ws, req) => {
    console.log(ws, req);
    ws.on('message', async (message) => {
      console.log('In zelda receive message: %s', message );
      ws.send('We[thunder] have you '.concat(message));
      ws.close();
    });
    ws.on('close', async () => {
      console.log('zelda close');

    });
  }

}