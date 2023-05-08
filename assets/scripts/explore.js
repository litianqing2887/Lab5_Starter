// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const synth = window.speechSynthesis;
  const image = document.querySelector("img");
  const voiceSelect = document.querySelector("select");
  const input = document.querySelector("textarea");
  const button = document.querySelector("button");
  let voices = [];
  let text = "";

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  button.addEventListener("click", (event) => {
    image.src = "assets/images/smiling-open.png";
    const utterThis = new SpeechSynthesisUtterance(input.value);
    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.addEventListener("end", (event) => {
      image.src = "assets/images/smiling.png";
    });
    synth.speak(utterThis);
  });
}