const constraints = {
  // audio: true,
  video: true,
};

export async function handleLocalVideoStream(videoElement: HTMLVideoElement) {
  const localStream = await navigator.mediaDevices.getUserMedia(constraints);
  videoElement.srcObject = localStream;
  return function addTrack(localPc: RTCPeerConnection) {
    localStream.getTracks().forEach((track) => {
      console.log(`${track.label}[${track.kind} track]`);
      localPc.addTrack(track, localStream);
    });
  };
}

export function addRemoteStreamHandler(
  remoteVideoElement: HTMLVideoElement,
  localPc: RTCPeerConnection
) {
  localPc.addEventListener('track', (event) => {
    console.log('remotePc ontrack');
    // if have multiple devices, use the first one instead
    remoteVideoElement.srcObject = event.streams[0];
  });
}
