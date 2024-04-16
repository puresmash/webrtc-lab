import { answerSDP } from './webrtc.js';

export function createWebSocketConnection(username: string, localPc: RTCPeerConnection) {
  const conn = new WebSocket('ws://localhost:8080');
  const sendWsMessage = (message) => {
    conn.send(JSON.stringify(message));
  }
  conn.addEventListener('open', () => {
    console.log('WebSocket Connected');
    sendWsMessage({ type: 'login', name: username });
  });
  conn.addEventListener('message', async (message) => {
    const data = JSON.parse(message.data);
    console.log('Received websocket message', data);
    if (data.candidate) {
      console.log('get candidate', data.candidate);
      localPc.addIceCandidate(new RTCIceCandidate(data.candidate));
    } else if (data.answer) {
      console.log('get sdp answer', data.answer);
      localPc.setRemoteDescription(data.answer);
    } else if (data.offer) {
      console.log('get sdp offer', data.offer);
      await localPc.setRemoteDescription(data.offer);
      const remoteSDP = await answerSDP(localPc, data.offer);
      sendWsMessage({ type: 'answer', to: data.from, answer: remoteSDP });
    }
  });
  return sendWsMessage;
}
