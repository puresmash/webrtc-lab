interface ExchangeIceCandidate {
  (candidate: RTCIceCandidate): Promise<void>;
}
/**
 * Register the behavior after the local peer collected an ice candidate.
 * Usually you might want to send the ice candidate to the remote peer using a callback,
 * which has been provided by the second argument.
 * @param pc local peer connection object
 * @param cb  a hook to send the local ice candidate to the remote peer
 */
export const registerIceHandler = (pc: RTCPeerConnection, cb: ExchangeIceCandidate) => {
  pc.addEventListener('icecandidate', async(event) => {
    if (event.candidate) {
      console.log('onicecandidate', event.candidate);
      cb(event.candidate);
    }
  });
}

export async function sendSDP(localPc: RTCPeerConnection) {
  const configuration = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  } as RTCOfferOptions;
  const sdp = await localPc.createOffer(configuration);
  await localPc.setLocalDescription(sdp);
  return sdp;
}

export async function answerSDP(pc: RTCPeerConnection, remoteSDP) {
  const configuration = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  } as RTCOfferOptions;
  await pc.setRemoteDescription(remoteSDP);
  const localSDP = await pc.createAnswer(configuration);
  await pc.setLocalDescription(localSDP);
  return localSDP;
}

export function createDataChannel(label: string, peerConnection: RTCPeerConnection) {
  const options: RTCDataChannelInit = {
    ordered: true,
  };
  const dataChannel = peerConnection.createDataChannel(label, options);
  function handleChannelStatusChange() {
    if (dataChannel) {
      const state = dataChannel.readyState;
      if (state === 'open') {
        console.log('Data channel opened');
      } else {
        console.log('Data channel closed');
      }
    }
  }
  dataChannel.addEventListener('open', handleChannelStatusChange);
  dataChannel.addEventListener('close', handleChannelStatusChange);
  dataChannel.addEventListener('error', (error) => console.error(error));
  dataChannel.addEventListener('message', (event) => console.log(`Received: ${event.data}`));
  
  return function sendMessage(message: string) {
    if (dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send(message);
    } else {
      console.warn('Data channel has been closed or not established yet');
    }
  }
}

export function allowRecvChannel(peerConnection: RTCPeerConnection) {
  peerConnection.addEventListener('datachannel', (event) => {
    const recvChannel = event.channel;
    recvChannel.addEventListener('message', (event) => console.log('recv', event.data));
  });
}
