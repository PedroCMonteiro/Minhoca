function drawSnake()
{
  let body = [];
  for(let i = 0; i < 5 && i < snake.length; i++)
  {
    body = snake[snake.length-i-1];
    ctx.fillStyle = "#"+i*2+i*2+"ff"+i*2+i*2;
    ctx.fillRect((body.x*side.x)+1, (body.y*side.y)+1, side.x-2, side.y-2); 
  }

  for(let i = 5; i < snake.length; i++)
  {
    body = snake[snake.length-i-1];
    ctx.fillStyle = "#88ff88";
    ctx.fillRect((body.x*side.x)+1, (body.y*side.y)+1, side.x-2, side.y-2); 
  }
}

function drawFood()
{
  if(food !== undefined)
  {   
    ctx.fillStyle = "#ff0000";
    ctx.fillRect((food.x*side.x)+1, (food.y*side.y)+1, side.x-2, side.y-2);
  }
}

function drawScore()
{
  ctx.fillStyle = "#5555ff";
  ctx.font = "50px Arial";
  //ctx.fillText(score, 32*side.x, 18*side.y);
  ctx.fillText(score, 0, 0);
}

function clearBoard()
{
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height); 
  //ctx.clearRect(0, 0, cnv.width, cnv.height);
}

function drawBoard()
{
  clearBoard();
  drawScore();
  drawFood();
  drawSnake();
}

