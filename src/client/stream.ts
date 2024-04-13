const constraints = {
  // audio: true,
  video: true
};

export async function createVideoStream(videoElement: HTMLVideoElement) {
  const localStream = await navigator.mediaDevices.getUserMedia(constraints);
  videoElement.srcObject = localStream;
  return localStream;
}
