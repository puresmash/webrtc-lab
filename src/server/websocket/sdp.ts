import { getUserConn, getUserList } from '../service/userService';
import type { WsAnswerSDPHandler, WsAnswerSDPMessage, WsIceCandidateHandler, WsIceCandidateMessage, WsOfferSDPHandler, WsOfferSDPMessage } from './interface';
import { sendTo } from './util';

export const handlerOfferSDP: WsOfferSDPHandler = (message: WsOfferSDPMessage) => {
  const conn = getUserConn(message.to);
  sendTo(conn, { from: message.from, offer: message.offer });
};

export const handlerAnswerSDP: WsAnswerSDPHandler = (message: WsAnswerSDPMessage) => {
  const conn = getUserConn(message.to);
  console.log(conn, message.to, getUserList())
  sendTo(conn, { answer: message.answer });
};

export const handleIceCandidate: WsIceCandidateHandler = (message: WsIceCandidateMessage) => {
  const conn = getUserConn(message.to);
  sendTo(conn, { candidate: message.candidate });
};
