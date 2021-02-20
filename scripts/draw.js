export default class Draw
{
  static drawSnake(snake, side, context)
  {
    let body = snake.getBody();

    body.forEach(function(part, i) {
      if(i < 5)
        context.fillStyle = `#${i*2}${i*2}ff${i*2}${i*2}`;
      else
        context.fillStyle = "#88ff88";
      context.fillRect(((part.getX()-1)*side)+1, ((part.getY()-1)*side)+1, side-2, side-2);
    });
  }

  static drawSnakes(game)
  {
    let snakes = game.getSnakes();

    snakes.forEach(snake => drawSnake(snake.getBody(), game.getSideCells(), game.getContext()));
  }

  static drawFood(food, side, context)
  {
    if(food !== undefined)
    {
      context.fillStyle = "#ff0000";
      context.fillRect(((food.getX()-1)*side)+1, ((food.getY()-1)*side)+1, side-2, side-2);
    }
  }

  static drawFoods(game)
  {
    let foods = game.getFoods();

    foods.forEach(food => drawFood(food, game.getSideCells(), game.getContext()));
  }

  static drawScore(game)
  {
    let snakes = game.getSnakes();
    let side = game.getSideCells();
    let context = game.getContext();

    snakes.forEach(function(snake, i) => {
      context.fillStyle = "#5555ff";
      context.font = "50px Arial";
      //ctx.fillText(score, 32*side.x, 18*side.y);
      context.fillText(`${snake.getId()} : ${snake.getScore()}`, i*side, i*side);
    });
  }

  static clearBoard(game)
  {
    let context = game.getContext();

    context.fillStyle = "#000000";
    context.fillRect(0, 0, game.getWidth(), game.getHeight());
    //ctx.clearRect(0, 0, cnv.width, cnv.height);
  }

  static drawBoard(game)
  {
    clearBoard(game);
    drawFoods(game);
    drawSnakes(game);
    drawScore(game);
  }
}