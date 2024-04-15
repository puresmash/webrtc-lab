import { registerIceHandler, sendSDP } from '../webrtc.js';
import { createVideoStream } from '../stream.js';
import { createWebSocketConnection } from '../websocket.js';

const findCounterPart = (username: string) => {
  return username === 'pc1' ? 'pc2' : 'pc1';
}

export async function remoteVideoStream() {
  // Define username (used to recognize websocket user)
  const url = new URL(window.location.href);
  const username = url.searchParams.get('name');
  // Init peer connection
  const configuration = {};
  const localPc = new RTCPeerConnection(configuration);
  // Init web socket connection
  const sendWsMessage = createWebSocketConnection(username, localPc);
  // Deal with the local video stream
  const localVideoElement = document.querySelector('#local-video') as HTMLVideoElement;
  const localStream = await createVideoStream(localVideoElement);
  localStream.getTracks().forEach((track) => {
    console.log(`${track.label}[${track.kind} track]`);
    localPc.addTrack(track, localStream);
  });
  // Find the ice candidate path
  registerIceHandler(localPc, async (candidate) => sendWsMessage({ type: 'candidate', to: findCounterPart(username), candidate }));
  const remoteVideoElement = document.querySelector('#remote-video') as HTMLVideoElement;
  localPc.ontrack = (event) => {
    console.log('remotePc ontrack');
    // if have multiple devices, use the first one instead
    remoteVideoElement.srcObject = event.streams[0];
  }
  // Define actions
  const callButton = document.querySelector('button#call') as HTMLButtonElement;
  callButton.addEventListener('click', async () => {
    // Exchange SDP information
    const localSDP = await sendSDP(localPc);
    console.log('localSDP', localSDP);
    sendWsMessage({ type: 'offer', from: username, to: findCounterPart(username), offer: localSDP });
  });
}
