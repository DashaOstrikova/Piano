const piano = document.querySelector('.piano');
const btnContainer = document.querySelector('.btn-container');
let isPressed = false;


function pianoMouseDownHandler(event) {
  if (!isPressed) {
   isPressed = true; 
  }
  addActive(event.target.dataset.note);
}

function pianoMouseOverHandler(event) {
  if (!isPressed) return;
  
  addActive(event.target.dataset.note);
}

function addActive(note) {
  const button = document.querySelector(`[data-note="${note}"]`);
  if (!note || button.classList.contains('piano-key-active')) return;

  button.classList.add('piano-key-active'); 
  playAudio(`assets/audio/${note}.mp3`);
}

function removeActive(note) {
  const button = document.querySelector(`[data-note="${note}"]`);
  if (button){
    button.classList.remove('piano-key-active');
  }
}

function findPianoKey(event) {
  if(event.code.startsWith("Key")){
    const cod = event.code.replace('Key','');
    const button = document.querySelector(`[data-letter="${cod}"]`);
    return button;
  }
}

function pianoLetterHandler(event) {
  const button = findPianoKey(event);
  if(button){
    addActive(button.dataset.note);
  }
}

function playAudio(audioSrc) {
  const audio = new Audio();
  audio.src = audioSrc;
  audio.currentTime = 0;
  audio.play();
}

function addButtonActive(event) {
  const btn = document.querySelector('.btn-active');
  btn.classList.remove('btn-active');
  event.target.classList.add('btn-active');
  if (event.target.classList.contains('btn-letters')) {
    piano.classList.add('piano-letters');
  }
  else{
    piano.classList.remove('piano-letters');
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

piano.addEventListener('mousedown', pianoMouseDownHandler);
window.addEventListener('mouseup', (event) => {
  isPressed = false;
  removeActive(event.target.dataset.note)
});

piano.querySelectorAll('.piano-key').forEach(element => {
  element.addEventListener('mouseover', pianoMouseOverHandler);
  element.addEventListener('mouseout', (event) => removeActive(event.target.dataset.note));
})

window.addEventListener('keydown', pianoLetterHandler);
window.addEventListener('keyup', (event) => {
  const button = findPianoKey(event);
  if(button){
    removeActive(button.dataset.note);
  }
});

btnContainer.addEventListener('click', addButtonActive);

document.querySelector('.fullscreen').addEventListener('click', toggleFullScreen);