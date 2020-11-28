// var five = require('johnny-five');

var currentWord = "";
var currentDirection = 0;
// var board = new five.Board();


function say(m) {
  var msg = new SpeechSynthesisUtterance(currentWord);
  var voices = window.speechSynthesis.getVoices();
  speechSynthesis.getVoices().forEach(function(voice) {
    console.log(voice.name, voice.default ? voice.default :'');
  });
  msg.voice = voices[16];
  msg.rate = 0.8;
  window.speechSynthesis.speak(msg);  
}

function registerInput(clicked_id) {
  console.log(clicked_id);
  currentWord = currentWord + clicked_id;
  console.log(currentWord);
  document.getElementById("speech").innerHTML = currentWord;
}

function speakCurrentWord() {
  console.log(currentWord);
  say(currentWord);
  currentWord="";
  document.getElementById("speech").innerHTML = currentWord;
}

function deleteCharacter() {
  currentWord = currentWord.slice(0, -1)
  document.getElementById("speech").innerHTML = currentWord;
  console.log(currentWord);
}

function directionalInput(clicked_id) {
  // console.log(clicked_id);
  currentDirection = parseInt(clicked_id);
  // document.getElementById("idcode").innerHTML = clicked_id + "\\";

  fetch('/direction/'+clicked_id)
  .then(response => response.json())
  .then(data => console.log(data));
}

