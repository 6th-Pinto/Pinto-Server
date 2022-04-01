import { any } from 'joi';
import { io } from 'socket.io-client';

// please note that the types are reversed
const socket = io();

const myFace: any = document.getElementById('myFace');
const muteBtn: any = document.getElementById('mute');
const cameraBtn: any = document.getElementById('camera');
const camerasSelect: any = document.getElementById('cameras');

// 스트림을 받아오기. stream = video + audio
// const divMystream = document.getElementsByTagName('div');
let myStream: any;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');

    // <- 어떤카메라가 선택된지 알려주는 함수->
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach(camera => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
      // 내가 선택한 카메라명을 옵션에 넣어줌
    });
  } catch (e) {
    console.log(e);
  }
}

//  비디오를 시작하는 함수
async function getMedia(deviceId: any) {
  // deviceId가 없을때 실행되는 함수
  const initialConstrains = {
    // 단어에 t가없음 여긴
    audio: true,
    video: { facingMode: 'user' },
  };
  // cameraId가 있을때 실행되는 함수
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains, //  <--여기서 오타나서 카메라 안됬던거였음.
      // deviceId가 있다면 cameraconstraints를 이용ㅎ아고 deviceID가 없다면 initialConstrains를 이용
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

// getMedia();

export function handleMuteClick() {
  // <-여기는 track.enabled에 새로운 값을 지정해주는거임
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
