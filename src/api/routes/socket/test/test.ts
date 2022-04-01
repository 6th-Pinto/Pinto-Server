import { any } from 'joi';
import { io } from 'socket.io-client';

const socket = io();

const myFace: any = document.getElementById('myFace');
const muteBtn: any = document.getElementById('mute');
const cameraBtn: any = document.getElementById('camera');
const camerasSelect: any = document.getElementById('cameras');

let myStream: any;
let muted = false;
let cameraOff = false;

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
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);
camerasSelect.addEventListener('input', handleCameraChange);
