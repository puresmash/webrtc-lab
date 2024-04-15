import type { WebSocket, WebSocketServer } from 'ws';
import type { WsRespondMessage } from './interface';

export function sendTo(ws: WebSocket, message: WsRespondMessage) {
  ws.send(JSON.stringify(message));
}

export function broadcast(wss: WebSocketServer, message: WsRespondMessage) {
  wss.clients.forEach((ws) => {
    sendTo(ws, message);
  });
}
