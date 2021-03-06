const $buttonContainer = document.getElementById('container');
const $button = document.getElementById('button');
const canvas = document.getElementById('bar');
const $cancelButton = document.getElementById('cancel-button');
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

  if(state.downloading == false){
    state.downloading = true;
  }

  //Starts download
  if(state.downloading && state.canceling == false){
    count = 0;
    $buttonContainer.classList.remove('idle', 'canceling', 'finished', 'canceled');
    $buttonContainer.classList.add('downloading');
    state.finished = false;
    percentage = 0;
    width = 0;
    stateUpdate = fillBar;
    animationFrameID = requestAnimationFrame(update);
  }

};

$cancelButton.onclick = function(){

  if(state.finished == false && state.canceling == false){
    //cancels download
    count = 0;
    $buttonContainer.classList.remove('downloading', 'idle', 'canceling', 'canceled');
    $buttonContainer.classList.add('canceling');
    state.canceling = true;
    stateUpdate = canceling;
  }

}

//Fills the progress bar
function fillBar(){

  percentage += random.bool(5, 40) ? random.real(0, 0.1) : 0;
  width += ( (canvas.width * percentage) - width) * 0.05;

  //when the download is done
  if(percentage >= 1){

    stateUpdate = finishfillBar;

  }

}

//when the download is done
function finishfillBar(){

  width += ((canvas.width * percentage) - width) * 0.9;

  //when the bar is completely filled
  if(width >= (canvas.width * percentage)){
    stateUpdate = finished;
    percentage = Math.min(percentage, 1);
    state.finished = true;
    $buttonContainer.classList.remove('downloading');
    $buttonContainer.classList.add('finished');
  }

}

//When Canceling
function canceling(){
  count++;

  //wait some time and set as canceled
  if(count >= 50){
    $buttonContainer.classList.remove('downloading', 'finished', 'canceling');
    $buttonContainer.classList.add('idle', 'canceled');
    state.canceling = false;
    stateUpdate = null;
    cancelAnimationFrame(animationFrameID);
  }

}

//when the bar is completely filled
function finished(){
  count++;

  //Wait some time to hide 'done' message
  if(count >= 60){
    count = 0;
    $buttonContainer.classList.remove('downloading', 'finished', 'canceling');
    $buttonContainer.classList.add('idle');
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
