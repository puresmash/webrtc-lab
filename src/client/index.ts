import { registerIceHandler, sendSDP, answerSDP } from './connect.js';
import { createVideoStream } from './stream.js';

(async () => {
  // Init peer connection
  const configuration = {};
  const localPc = new RTCPeerConnection(configuration);
  const remotePc = new RTCPeerConnection(configuration);
  // Deal with the local stream
  const localVideoElement = document.querySelector('#local-video') as HTMLVideoElement;
  const localStream = await createVideoStream(localVideoElement);
  // Define this before exchange sdp info
  localStream.getTracks().forEach((track) => {
    console.log(`${track.label}[${track.kind} track]`);
    localPc.addTrack(track, localStream);
  });
  // Find the ice candidate path
  registerIceHandler(localPc, async (candidate) => remotePc.addIceCandidate(candidate));
  registerIceHandler(remotePc, async (candidate) => localPc.addIceCandidate(candidate));
  // Define this before exchange sdp info
  const remoteVideoElement = document.querySelector('#remote-video') as HTMLVideoElement;
  remotePc.ontrack = (event) => {
    console.log('remotePc ontrack');
    // if have multiple devices, use the first one instead
    remoteVideoElement.srcObject = event.streams[0];
  }
  // Exchange SDP information
  const localSDP = await sendSDP(localPc);
  console.log('localSDP', localSDP);
  const remoteSDP = await answerSDP(remotePc, localSDP);
  console.log('remoteSDP', remoteSDP);
  await localPc.setRemoteDescription(remoteSDP);
})().catch(err => console.error(err));
