const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5002/thunder?token=lmKam8IMg52dHbyCTk0A&uuid=hoO0TNpcIac0q7iXM139oQ123');

ws.on('open', function () {
  ws.send('open you');

});

ws.on('message', function (data) {
  console.log('client got data:\n%s\n', data);
});

ws.on('close', function () {
  process.exit(0);
});

ws.on('error', function (err) {
  console.log(err);
});