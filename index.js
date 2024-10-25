const WebSocket = require('ws');
const WsServerPort = 8080;

const wss = new WebSocket.Server({ port: WsServerPort });
console.log(`Signaling server started on ws://HostIP:${WsServerPort}`);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send('Connected to signaling server');
});