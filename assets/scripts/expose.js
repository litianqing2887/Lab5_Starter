// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const selectHorn = document.getElementById("horn-select");
  const image = document.querySelector('img');
  const sound = document.querySelector(".hidden");
  const range = document.getElementById("volume");
  const volumeIcon = document.querySelector('#volume-controls img');
  const button = document.querySelector("button");
  const canvas = document.getElementById('your_custom_canvas_id');
  const jsConfetti = new JSConfetti({ canvas });

  selectHorn.addEventListener("change", (event) => {
    image.src = `assets/images/${event.target.value}.svg`;
    sound.src = `assets/audio/${event.target.value}.mp3`;
  });

  range.addEventListener("change", (event) => {
    if(range.value == 0){
      volumeIcon.src = "assets/icons/volume-level-0.svg";
    }
    else if(range.value < 33){
      volumeIcon.src = "assets/icons/volume-level-1.svg";
    }
    else if(range.value < 67){
      volumeIcon.src = "assets/icons/volume-level-2.svg";
    }
    else{
      volumeIcon.src = "assets/icons/volume-level-3.svg";
    }
    sound.volume = range.value/100;
  });

  button.addEventListener("click", (event) => {
    sound.play();
    if(selectHorn.value == "party-horn"){
      jsConfetti.addConfetti({
        confettiRadius: 3,
        confettiNumber: 5000,
      });
    }
  });
}