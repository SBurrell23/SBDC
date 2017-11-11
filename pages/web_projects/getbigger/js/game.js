var CANVAS_WIDTH = 1400;
var CANVAS_HEIGHT = 700;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' style=\"background-color:#232323;border: solid 1px white;\" '></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
$('#getBiggerCanvasContainer').append(canvasElement);

var audio = new Audio('pages/web_projects/getbigger/assets/citration3.ogg');
function loadAssets(){
  audio.pause();
  audio.currentTime = 0;
  audio.volume = 0.1;
  audio.loop = true;
  audio.play(); 
}

var FPS = 60;
function main() {
    setTimeout(function() {
        requestAnimationFrame(main);
        update();
        draw();
    }, 1000 / FPS);
}
main();

var GAME_STATE = 'START_GAME';
var HIGH_SCORE_LIMIT = 100;

var player = {
  color: "#52FF24",
  x: 50,
  y: 50,
  width: 20,
  height: 20,
  direction: 'RIGHT',
  applesEaten: 0,
  trys: 1,
  speed: 10,
  startTime: 0 ,
  growRate: 5,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
    canvas.font="25px Tahoma";
    canvas.fillText(this.applesEaten, 10, 30);
  }
};

var apple = {
  color: "#FF1111",
  x: 300,
  y: 200,
  width: 20,
  height: 20,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

function draw(){
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if(GAME_STATE == 'PLAYING'){
    player.draw();
    apple.draw();
  }
  else if (GAME_STATE == 'GAME_OVER'){
    drawGameOverScreen();
  }
  else if(GAME_STATE == 'START_GAME'){
    drawStartScreen();
  }
}

function update(){
  if(GAME_STATE == 'PLAYING'){
    handleKeyPresses();
    movePlayer();
    checkForCollision();
    checkIfOffScreen();
  }
  else if (GAME_STATE == 'GAME_OVER'){
    if(keydown['space']){
      startNewGame();
    }
  }
  else if(GAME_STATE == 'START_GAME'){
    if(keydown['space']){
      startNewGame();
    }
  }
}

function drawStartScreen(){
  canvas.fillStyle = player.color;

  canvas.font="bold 60px Tahoma";
  canvas.fillText("GET",(CANVAS_WIDTH/2) - 230, (CANVAS_HEIGHT/2) - 30);

  canvas.font="bold 90px Tahoma";
  canvas.fillText("BIGGER",(CANVAS_WIDTH/2) - 90, (CANVAS_HEIGHT/2) - 30);

  canvas.font="20px Courier New";
  canvas.fillText("Press SPACE To Start!",(CANVAS_WIDTH/2) - 90, (CANVAS_HEIGHT/2) + 40);
}

function drawGameOverScreen(){

  if(player.applesEaten < HIGH_SCORE_LIMIT){
    canvas.fillStyle = apple.color;

    canvas.font="bold 90px Tahoma";
    canvas.fillText("GAME OVER",(CANVAS_WIDTH/2) - 260, (CANVAS_HEIGHT/2) - 30);

    canvas.font="20px Courier New";
    canvas.fillText("Press SPACE To Retry!",(CANVAS_WIDTH/2) - 100, (CANVAS_HEIGHT/2) + 38);
    canvas.font="14px Courier New";
    canvas.fillText("Remember! You grow down and to the right so be careful around apples near those edges!",CANVAS_WIDTH - 700, CANVAS_HEIGHT - 18);
  }else{
    canvas.fillStyle = player.color;

    canvas.font="bold 90px Tahoma";
    canvas.fillText("YOU WIN!",(CANVAS_WIDTH/2) - 200, (CANVAS_HEIGHT/2) - 30);

    canvas.font="20px Courier New";
    canvas.fillText("Your score has been saved in the all time high scores list!",(CANVAS_WIDTH/2) - 310, CANVAS_HEIGHT/2 + 20);
  }
}

function startNewGame(){
  player.x = 50;
  player.y = 50;
  player.direction = 'RIGHT';
  player.width =  20;
  player.height = 20;
  player.applesEaten = 0;
  player.startTime = new Date().getTime() / 1000;
  spawnNewApple();
  loadAssets();
  GAME_STATE = 'PLAYING';
}

function movePlayer(){
  switch(player.direction){
    case 'RIGHT': 
      player.x+=player.speed; 
      break;
    case 'LEFT': 
      player.x-=player.speed; 
      break;
    case 'UP': 
      player.y-=player.speed; 
      break;
    case 'DOWN': 
      player.y+=player.speed; 
      break;
  }  
}

function handleKeyPresses(){
  if(keydown['a'] || keydown['left'])
    player.direction = 'LEFT';
  if(keydown['d'] || keydown['right'])
    player.direction = 'RIGHT';
  if(keydown['w'] || keydown['up'])
    player.direction = 'UP';
  if(keydown['s'] || keydown['down'])
    player.direction = 'DOWN';

   if(keydown['f']){
    player.x = 50; 
    player.y = 50;
  }
}

function checkForCollision(){
  if(collided(player,apple)){
    spawnNewApple();
    growPlayer();
  }
}

function collided(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function growPlayer(){
  player.height+=player.growRate;
  player.width+=player.growRate;
  player.applesEaten+=1;
}

function spawnNewApple(){
    tempApple = {};
    tempApple.width = 20;
    tempApple.height = 20;
    tempApple.x  = Math.floor((Math.random() * (CANVAS_WIDTH - 25)) + 1);
    tempApple.y = Math.floor((Math.random() * (CANVAS_HEIGHT - 25)) + 1);
    
    while( collided(tempApple,player) )
    {
      tempApple.x  = Math.floor((Math.random() * (CANVAS_WIDTH - 25)) + 1);
      tempApple.y = Math.floor((Math.random() * (CANVAS_HEIGHT - 25)) + 1);
    }

    apple.x = tempApple.x;
    apple.y = tempApple.y;
}

function checkIfOffScreen(){
  var offRight = player.x + player.width > CANVAS_WIDTH;
  var offBottom = player.y + player.height > CANVAS_HEIGHT;
  var offLeft = player.x < 0;
  var offTop =  player.y < 0;

  if( offRight || offBottom || offLeft || offTop){

    if(player.applesEaten >= HIGH_SCORE_LIMIT){
      var time =  (new Date().getTime() / 1000) - player.startTime;
      var playerScore = {
          trys : player.trys,
          apples : player.applesEaten,
          time : time
      };

      var success= {};
      $.ajax({
        type: "POST",
        url: 'scores/scores.php?submitScore=',
        data: btoa(JSON.stringify(playerScore)),
        success: success,
        dataType: 'json'
      });
    }

    player.trys+=1;
    GAME_STATE = 'GAME_OVER';
  }
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});