import type { WebSocket } from 'ws';
import { COMMAND } from './constant';
// ---Message---
// inbound
interface BaseWsInboundMessage {
  type: typeof COMMAND[keyof typeof COMMAND];
}
export interface WsLoginMessage extends BaseWsInboundMessage {
  type: 'login';
  name: string;
}
export interface WsLeaveMessage extends BaseWsInboundMessage {
  type: 'leave';
  name: string;
}
export interface WsOfferSDPMessage extends BaseWsInboundMessage {
  type: 'offer';
  from: string;
  to: string;
  offer: RTCSessionDescriptionInit;
}
export interface WsAnswerSDPMessage extends BaseWsInboundMessage {
  type: 'answer';
  to: string;
  answer: RTCSessionDescriptionInit;
}
export interface WsIceCandidateMessage extends BaseWsInboundMessage {
  type: 'candidate';
  to: string;
  candidate: RTCIceCandidate;
}
export interface WsXxxMessage extends BaseWsInboundMessage {
  type: 'xxx';
}
export type WsInboundMessage =
  | WsLoginMessage
  | WsLeaveMessage
  | WsOfferSDPMessage
  | WsAnswerSDPMessage
  | WsIceCandidateMessage
  | WsXxxMessage;
// outbound
interface WsUserUpdateMessage {
  userList: string[];
}
interface WsOfferDispatchMessage {
  from: string;
  offer: RTCSessionDescriptionInit;
}
interface WsAnswerDispatchMessage {
  answer: RTCSessionDescriptionInit;
}
interface WsCandidateDispatchMessage {
  candidate: RTCIceCandidate;
}
export type WsRespondMessage =
  | WsUserUpdateMessage
  | WsOfferDispatchMessage
  | WsAnswerDispatchMessage
  | WsCandidateDispatchMessage;

// ---Inbound MessageHandler---
interface BaseWsInboundHandler<T extends BaseWsInboundMessage> {
  (message: T, conn?: WebSocket): void;
}
export interface WsLoginHandler extends BaseWsInboundHandler<WsLoginMessage> {
  (message: WsLoginMessage, conn: WebSocket): void;
}
export interface WsLeaveHandler extends BaseWsInboundHandler<WsLeaveMessage> { }
export interface WsOfferSDPHandler extends BaseWsInboundHandler<WsOfferSDPMessage> { }
export interface WsAnswerSDPHandler extends BaseWsInboundHandler<WsAnswerSDPMessage> { }
export interface WsIceCandidateHandler extends BaseWsInboundHandler<WsIceCandidateMessage> { }
