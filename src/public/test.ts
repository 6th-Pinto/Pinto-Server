import e from 'express';
import { any } from 'joi';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';

const socket = io();

const myFace: any = document.getElementById('myFace');
const muteBtn: any = document.getElementById('mute');
const cameraBtn: any = document.getElementById('camera');
const camerasSelect: any = document.getElementById('cameras');
const call: any = document.getElementById('call');

call.hidden = true;

let myStream: any;
let muted = false;
let cameraOff = false;
let roomName: any;
let myPeerConnection: any;
let myDataChannel: any;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach(camera => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId: any) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains,
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

export function handleMuteClick() {
  myStream.getAudioTracks().forEach((track: any) => {
    const tracks = track;
    tracks.enabled = !tracks.enabled;
  });
  if (!muted) {
    muteBtn.innerText = 'Unmute MIC';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute MIC';
    muted = false;
  }
}
function handleCameraClick() {
  myStream.getVideoTracks().forEach((track: any) => {
    const tracks = track;
    tracks.enabled = !tracks.enabled;
  });
  if (cameraOff) {
    cameraBtn.innerText = 'Turn Camera Off';
    cameraOff = false;
  } else {
    cameraBtn.innerText = 'Turn Camera On';
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection.getSenders().find((sender: any) => sender.track.kind === 'video');
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);

// Welcome Form (join a room)

const welcome: any = document.getElementById('welcome');
const welcomeForm: any = welcome.querySelector('form');

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia(any);
  makeConnection();
}

async function handleWelcomeSubmit(event:any) {
  event.preventDefault();
  const input = welcomeForm.querySelector('input');
  await initCall();
  socket.emit('join_room', input.value);
  roomName = input.value;
  input.value = '';
}

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

// Socket Code

socket.on('welcome', async () => {
  myDataChannel = myPeerConnection.createDataChannel('chat');
  myDataChannel.addEventListener('message', (event: any) => console.log(event.data));
  console.log('made data channel');
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log('sent the offer');
  socket.emit('offer', offer, roomName);
});

socket.on('offer', async offer => {
  myPeerConnection.addEventListener('datachannel', (event: any) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener('message', (event: any) => console.log(event.data));
  });
  console.log('received the offer');
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
  console.log('sent the answer');
});

socket.on('answer', answer => {
  console.log('received the answer');
  myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', ice => {
  console.log('received candidate');
  myPeerConnection.addIceCandidate(ice);
});

// RTC Code

function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  });
  myPeerConnection.addEventListener('icecandidate', handleIce);
  myPeerConnection.addEventListener('addstream', handleAddStream);
  myStream.getTracks().forEach((track: any) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data: any) {
  console.log('sent candidate');
  socket.emit('ice', data.candidate, roomName);
}

function handleAddStream(data: any) {
  const peerFace: any = document.getElementById('peerFace');
  peerFace.srcObject = data.stream;
}
