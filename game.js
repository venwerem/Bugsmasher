
var canvas = document.getElementById("bugSmasherCanvas");
var ctx = canvas.getContext("2d");

var bugX;
var bugY;
var bugSpeed;
var bugSize = 25;
var bugImg;
var score = 0;
var hoppingInterval = 2000;

// to make the bug on the canvas
function drawBug() {
    bugImg = new Image();
    bugImg.src="ladybug.gif";
    bugImg.onload= function(){
        ctx.drawImage(bugImg,bugX,bugY,bugSize,bugSize);
    }
  
  }

  
 // to move the bug randomly
 function moveBug() {
    bugX = Math.random() * canvas.width;
    bugY = Math.random() * canvas.height;
  }
  // to update the game state
  function update() {
    moveBug();
  }
// to draw the game on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBug();
  }
  // to show score on canvas 
  function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 50);
  }
  
  // an event listener to detect when the player clicks on the bug

  canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    console.log(rect,"rect");
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var distance = Math.sqrt((x - bugX) * (x - bugX) + (y - bugY) * (y - bugY)); 
    if (distance <= bugSize) 
    {
      var gameSound= document.getElementById("gameSound");
      gameSound.startTime= 0;
      gameSound.play();
      score++;
      hoppingInterval -= 60;
      moveBug();
      
    }
  });
   // to reset the speed
   function resetSpeed() {
    hoppingInterval = 1000;
    moveBug();
  }
// to reset the score  
function resetScore() {
    score = 0;
    moveBug();
  }
  //to start the game loop
  function gameLoop() {
    update();
    draw();
    drawScore();
    
    setTimeout(gameLoop, hoppingInterval);
  }

  gameLoop();
  
