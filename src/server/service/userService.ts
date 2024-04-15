import type { WebSocket } from 'ws';
import { userList } from '../model/userModel';

export function loginUser(name: string, connection: WebSocket) {
  userList.set(name, connection);
}

export function logoutUser(name: string) {
  userList.delete(name);
}

export function getUserConn(name: string) {
  return userList.get(name);
}

export function getUserList() {
  return Array.from(userList.keys());
}
