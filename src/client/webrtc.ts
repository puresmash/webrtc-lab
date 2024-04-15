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
