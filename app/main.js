const $button = document.getElementById('button');
const canvas = document.getElementById('bar');
const ctx = canvas.getContext('2d');
let animationFrameID = 0;
let percentage = 0;
let width = 0;
let stateUpdate = null;
let count = 0;

const state = {
  downloading: false,
  idle: false,
  finished: true,
  canceling: false
};

let random = new Random(Random.engines.mt19937().autoSeed());

$button.onclick = function(){

  if(state.canceling == false){
    state.downloading = !state.downloading;
  }

  if(state.downloading && state.canceling == false){
    count = 0;
    $button.classList.remove('idle', 'canceling', 'finished', 'canceled');
    $button.classList.add('downloading');
    state.finished = false;
    percentage = 0;
    width = 0;
    stateUpdate = fillBar;
    animationFrameID = requestAnimationFrame(update);
  } else if(state.finished == false && state.canceling == false){
    count = 0;
    $button.classList.remove('downloading', 'idle', 'canceling', 'canceled');
    $button.classList.add('canceling');
    state.canceling = true;
    stateUpdate = canceling;
  }

};

function fillBar(){

  percentage += random.bool(5, 40) ? random.real(0, 0.1) : 0;
  width += ( (canvas.width * percentage) - width) * 0.05;

  if(percentage >= 1){

    stateUpdate = finishfillBar;

  }

}

function finishfillBar(){

  width += ((canvas.width * percentage) - width) * 0.9;

  if(width >= (canvas.width * percentage)){
    stateUpdate = finished;
    percentage = Math.min(percentage, 1);
    state.finished = true;
    $button.classList.remove('downloading');
    $button.classList.add('finished');
  }

}

function canceling(){
  count++;

  if(count >= 50){
    count = 0;
    $button.classList.remove('downloading', 'finished', 'canceling');
    $button.classList.add('idle', 'canceled');
    state.canceling = false;
    stateUpdate = null;
    cancelAnimationFrame(animationFrameID);
  }

}

function finished(){
  count++;

  if(count >= 60){
    count = 0;
    $button.classList.remove('downloading', 'finished', 'canceling');
    $button.classList.add('idle');
    state.downloading = false;
    cancelAnimationFrame(animationFrameID);
  }

}

function update(){
  animationFrameID = requestAnimationFrame(update);

  if(stateUpdate != null) stateUpdate();

  ctx.clearRect(0,0,canvas.width, canvas.height);

  ctx.fillStyle = '#3f3f3f';
  ctx.fillRect(0, 0, width, canvas.height);
  ctx.fillStyle = '#eee';
  ctx.fillRect(canvas.width * percentage, 0, 2, canvas.height);

}
