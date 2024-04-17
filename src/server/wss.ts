import { WebSocketServer } from 'ws';
import { handleIceCandidate, handleLeave, handleLogin, handlerAnswerSDP, handlerOfferSDP } from './websocket';
import type { WsInboundMessage } from './websocket';
import { logoutUser } from './service/userService';
import { COMMAND } from './websocket/constant';

// TODO, merge the express server with the signaling server?
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  let username;
  ws.on('message', function message(data) {
    console.log(`received: ${data}`);
    const message = JSON.parse(data.toString()) as WsInboundMessage;
    if (message.type === COMMAND.LOGIN) {
      handleLogin(message, ws);
      // Remember username (in order to kick user off when disconnected)
      username = message.name;
    } else if (message.type === COMMAND.OFFER) {
      handlerOfferSDP(message);
    } else if (message.type === COMMAND.ANSWER) {
      handlerAnswerSDP(message);
    } else if (message.type === COMMAND.CANDIDATE) {
      handleIceCandidate(message);
    } else if (message.type === COMMAND.LEAVE) {
      handleLeave(message);
    } else {
      console.warn(`Unrecognized message, message.type=${message.type}`);
    }
  });
  ws.on('close', () => {
    logoutUser(username);
  });
});
