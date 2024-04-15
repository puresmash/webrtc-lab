import type { WebSocket } from 'ws';
import type { WsLeaveHandler, WsLeaveMessage, WsLoginHandler, WsLoginMessage } from './interface';
import { loginUser, getUserList, logoutUser } from '../service/userService';
import { sendTo } from './util';


export const handleLogin: WsLoginHandler = (message: WsLoginMessage, ws: WebSocket) => {
  loginUser(message.name, ws);
  sendTo(ws, ({ userList: getUserList() }));
}

export const handleLeave: WsLeaveHandler = (message: WsLeaveMessage) => {
  logoutUser(message.name);
}
