var intervalTime = 1;
var update = setInterval(move, intervalTime);
var updateBoard = setInterval(drawBoard, 1);
//var updateDimensions = setInterval(setDimensions, 1);

function initGrid()
{
  for(let i=0; i<64; i++)
    grid[i] = [];

  for(let x=0; x<64; x++)
    for(let y=0; y<36; y++)
      grid[x][y] = "none";
}

function initSnake(direction)
{
  snake = [];
  let deltaX = 0;
  let deltaY = 0;

  if(direction === "up")
    deltaY = -1;
  else if(direction === "right")
    deltaX = 1;
  else if(direction === "down")
    deltaY = 1;
  else if(direction === "left")
    deltaX = -1;

  // random initial position
  initialX = Math.floor(Math.random() * 64);
  initialY = Math.floor(Math.random() * 36);

  // snake initialy with three parts
  for(let i= 0; i < 3; i++)
    snake.push({x: initialX+(deltaX*i), y: initialY+(deltaY*i)});

  updateGrid();
}

function crash()
{
  let head = snake[snake.length-1];

  if(grid[head.x][head.y] === "snake")
    return true;
  else 
    return false;
}

function gameOver()
{
  //showScore();
  drawScore();
  console.log(score);
  setMovement("stop");
  endGame();
}

function newFood()
{
  let x = Math.floor(Math.random()*64);
  let y = Math.floor(Math.random()*36);
  
  //ramdom new possition
  while(grid[x][y] !== "none")
  {
    x = Math.floor(Math.random()*64);
    y = Math.floor(Math.random()*36);
  }

  food = {x: x, y: y};
  updateGrid();
  score++;
  updateIntervalMove(true);
}

function setMovement(key)
{
  if(canMove(key))
  {
    if(key !== "pause" || key !== "play")
      if(movement !== "waiting" && movement !== "pause" && movement !== "play")
        prevMovement = movement;

    movement = key;
    return true;
    
  }

  return false;
}

function updateIntervalMove(gameState)
{
  run = gameState;
  clearInterval(update);

  if(run)
    intervalTime = Math.max(255 - score*4,0);
  else
    intervalTime = 1;

  update = setInterval(move, intervalTime);
}

function canMove(key)
{
  if(movement === "stop")
  {
    if(key === "start")
      return true;

    return false;
  }
  else if(movement === "start")
  {
    if(key === "stop")
      return true;
    else if(key === "right" || key === "down" || key === "left" || key === "up")
      return true;
    
    return false;
  }
  else if(movement === "pause")
  {
    if(key === "stop")
      return true;
    else if(key === "play")
      return true; 

    return false;
  }
  else if(movement === "play")
  {
    if(key === "stop")
      return true;
    else if(key === "left" && prevMovement !== "right")
      return true;
    else if(key === "up" && prevMovement !== "down")
      return true;
    else if(key === "right" && prevMovement !== "left")
      return true;
    else if(key === "down" && prevMovement !== "up")
      return true;
    
    return false;
  }
  else if(movement === "waiting")
  {
    if(key === "stop")
      return true;
    else if(key === "pause")
      return true;
    else if(key === "left" && prevMovement !== "right")
      return true;
    else if(key === "up" && prevMovement !== "down")
      return true;
    else if(key === "right" && prevMovement !== "left")
      return true;
    else if(key === "down" && prevMovement !== "up")
      return true;
    
    return false;
  }
  else if(movement === "right" || movement === "down" || movement === "left" || movement === "up")
  {
    if(key === "stop")
      return true;
    else if(key === "waiting")
      return true;
    else if(key === "pause")
      return true;

    return false;
  }

  return false;
}

function endGame()
{
  //run = false;
  snake = [];
  food = undefined;
  clearBoard();  
  updateIntervalMove(false);
}

function startGame()
{
  //run = true;
  score = -1;
  food = undefined;
  
  // random initial direction
  let prob = Math.random();
  let beginDirection;
  if(prob < 0.25)
    beginDirection = "right";
  else if(prob < 0.5)
    beginDirection = "down";
  else if(prob < 0.75)
    beginDirection = "left";
  else
    beginDirection = "up";

  setMovement(beginDirection);
  initSnake(beginDirection);
  newFood();
  updateIntervalMove(true);
  //hideMenu();
}

function setDimensions()
{
  if(window.innerWidth !== width || window.innerHeight !== height)
  {   
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    height = cnv.height;
    width = cnv.width;
    side.x = Math.floor(height/64);
    side.y = Math.floor(width/36);
  }
}

function pause()
{
  if(run)
  {   
    run = false; 
    updateIntervalMove(false);
  }
}

function play()
{
  run = true;
  setMovement(prevMovement);
  //movement = prevMovement;
  //move();
  updateIntervalMove(true);
}

function right()
{
  updateSnake("right");
}

function up()
{
  updateSnake("up");
}

function left()
{
  updateSnake("left");
}

function down()
{
  updateSnake("down");
}
    
function move()
{
  if(movement === "stop")
    endGame();
  else if(movement === "start")
    startGame();
  else if(movement === "pause")
    pause();
  else if(movement === "play")
    play();
  else if(movement === "right")
    right();
  else if(movement === "down")
    down();
  else if(movement === "left")
    left();
  else if(movement === "up")
    up();
  else if(movement === "waiting")
  {
    setMovement(prevMovement);
    move();
  }
}

function updateSnake(newDirection)
{
  let head = snake[snake.length-1];
  let deltaX = 0;
  let deltaY = 0;

  if (newDirection === "right")
    deltaX = 1;
  else if(newDirection === "up")
    deltaY = -1;
  else if(newDirection === "left")
    deltaX = -1;
  else if(newDirection === "down")
    deltaY = 1;

  snake.push({x: (head.x+deltaX+64)%64, y: (head.y+deltaY+36)%36});

  if(crash())
  {
    gameOver();
    return;
  }
  else if(grid[head.x][head.y] === "food")
  {
    updateGrid();
    newFood();
  }
  else
  {
    snake.shift();
  }

  setMovement("waiting");
  updateGrid();
}

function updateGrid()
{
  initGrid();

  if(food !== undefined)
    grid[food.x][food.y] = "food";

  for(let i = 0; i < snake.length; i++)
    grid[snake[i].x][snake[i].y] === "snake";
}