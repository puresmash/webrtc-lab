import { remoteVideoStream } from './lab/remoteVideoStream.js';

(async () => {
  await remoteVideoStream();
})().catch((err) => console.error(err));
