interface ExchangeIceCandidate {
  (candidate: RTCIceCandidate): Promise<void>;
}
/**
 * Register the behavior after the local peer collected an ice candidate.
 * Usually you might want to send the ice candidate to the remote peer using a callback,
 * which has been provided by the second argument.
 * @param pc1 local peer connection object
 * @param cb  a hook to send the local ice candidate to the remote peer
 */
export const registerIceHandler = (pc1: RTCPeerConnection, cb: ExchangeIceCandidate) => {
  pc1.addEventListener('icecandidate', async(event) => {
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

export async function answerSDP(remotePc: RTCPeerConnection, localSDP) {
  const configuration = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  } as RTCOfferOptions;
  await remotePc.setRemoteDescription(localSDP);
  const sdp = await remotePc.createAnswer(configuration);
  await remotePc.setLocalDescription(sdp);
  return sdp;
}
