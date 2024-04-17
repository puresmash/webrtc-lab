import { remoteVideoStream } from './lab/remoteVideoStream.js';
import { allowRecvChannel, createDataChannel } from './webrtc.js';

(async () => {
  // Demo: Video stream
  const pc = await remoteVideoStream();
  // Demo: Use data channel to send text
  const sendMessage = createDataChannel('foo-bar', pc);
  allowRecvChannel(pc);
  // The receiver will log the message in console(Demo this without a UI display)
  const greetingButton = document.querySelector('#send-text') as HTMLButtonElement;
  greetingButton.addEventListener('click', () => sendMessage('Nice to meet you'));
})().catch((err) => console.error(err));
