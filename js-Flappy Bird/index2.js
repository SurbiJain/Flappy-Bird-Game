 const bird = document.querySelector('.bird');
 const sky = document.querySelector('.sky');
 const ground = document.querySelector('.ground');
 const gameContainer = document.querySelector('.game-container');
 let isGoingLeft = false;
 let isGoingRight = false;
 const obstaclesbottom = 500;


 let birdBottom = 100;
 let birdLeft = 220;
 let gravity = 2;
 let isGameOver = false;
 let score = 0;
 let gap = 420;

function startGame(){
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + 'px';
  bird.style.left = birdLeft + 'px';
}
let GametimerId = setInterval(startGame, 20);



function moveLeft(){
  isGoingLeft = true
  if(birdLeft >= 0){
  birdLeft -= 5
  bird.style.left = birdLeft + 'px'
} else {
  moveRight()
}
}
function moveRight(){
  isGoingRight = true
  if(birdLeft <= 500){
    birdLeft += 5
    bird.style.left = birdLeft + 'px'
  } else {
    moveLeft()
  }
}
function moveStraight(){
  isGoingLeft = false
  isGoingRight = false
}

function control(e) {
if (e.keyCode === 32) {
  jump()
}
else if(e.key === 'ArrowLeft') {
  moveLeft()
} else if (e.key === 'ArrowRight') {
  moveRight()
} else if (e.key === 'ArrowUp') {
  moveStraight()
}

}
function jump(){
  if(birdBottom < 500)
 birdBottom += 40;
 bird.style.bottom = birdBottom + 'px';
 
}

document.addEventListener('keyup', control);
 
 
function generateObstacles (){
  let randomHeight = Math.random() * 100 

  let obBottom = randomHeight;    
  let obHeight = 150+obBottom;
  let obLeft = 500;
  const obstacles = document.createElement('div');
  const topObstacles = document.createElement('div');
  if (!isGameOver) {
   obstacles.classList.add('obstacles');
   topObstacles.classList.add('topObstacles');
  }
  gameContainer.appendChild(obstacles);
  gameContainer.appendChild(topObstacles);
  obstacles.style.left = obLeft + 'px'
  topObstacles.style.left = obLeft + 'px'
  obstacles.style.bottom = obBottom + 'px'
  topObstacles.style.bottom = obBottom + gap + 'px'
  

  function gameOver(){   
  isGameOver = true
  clearInterval(GametimerId);
  clearInterval (timerId);
  document.removeEventListener('keyup', control)
  }

  function moveObstacle(){
    obLeft -= 2
    obstacles.style.left = obLeft + 'px';
    topObstacles.style.left = obLeft + 'px';
    if(obLeft+ 60 === birdLeft){
      score++;
    }
    if(obLeft === -60){ 
      clearTimeout(timerId); 
      gameContainer.removeChild(obstacles);
      gameContainer.removeChild(topObstacles);
    }     
    
      
    
    
    if (birdLeft <= obLeft + 60 && birdLeft + 60 >= obLeft && 
      (birdBottom <= obHeight || birdBottom > obBottom + gap - 188)
      || 
    birdBottom <= 0){    
     gameOver()
     sky.innerHTML = `Score: ${score}`  
    } 
  } 
  
  let timerId = setInterval(moveObstacle, 20);
  if (!isGameOver) setTimeout(generateObstacles, 3000)
};

generateObstacles();