export default class Game
{
	constructor(lines, columns, players)
	{
		this.state = "stopped";
		this.lines = lines.;
		this.columns = columns;
		this.players = players;
		this.grid = new Array(lines);
		this.grid = new Array(this.lines);
		this.grid.fill("none");
		this.grid = this.grid.map(line => {
		    line = new Array(this.columns);
		    line.fill("none");
		    return line;
		});
		this.snakes = [];
		this.foods = [];
	}

	getStated()
	{
		return this.state;
	}

	getLines()
	{
		return this.lines;
	}

	getColumns()
	{
		return this.columns;
	}

	getGrid()
	{
		return this.grid;
	}

	getSnakes()
	{
		return this.snakes;
	}

	getNumberPlayers()
	{
		return this.snakes.length;
	}

	getFoods()
	{
		return this.foods;
	}

	getNumberFoods()
	{
		return this.foods.length;
	}

	cleanGrid()
	{
		this.grid = this.grid.map(line => line = line.map(column => {return "none"}));
		let newGrid = new Array(this.lines);
		newGrid = newGrid.map(line => {
				let a = new Array(this.columns);
				a.fill("none");
				return a;
			});

		return newGrid;
	}

	start(players)
	{
		this.state = "running";
		this.grid = this.resetGrid();
		for(let i = 0; i < players; i++)
			newSnake(rgb(0,255,0));
		newFood();
	}

	gameOver()
	{
		this.state = "stopped";
		this.snakes = [];
		this.foods = [];
	}

	pause()
	{
		this.state = "paused";
	}

	play()
	{
		this.state = "running";
	}

	newSnake(color)
	{
		this.snakes.push(new Snake(this.maxX, this.maxY, color));
	}

	endSnake(snakeId)
	{
		this.snakes = this.snakes.filter(snake => snake.getId() !== snakeId);
	}

	newFood()
	{
		let x = Math.floor(Math.randon()*(this.lines-1)) + 1;
		let y = Math.floor(Math.randon()*(this.columns-1)) + 1;

		while(this.grid[x][y] !== "none")
		{
			x = Math.floor(Math.randon()*(this.lines-1)) + 1;
			y = Math.floor(Math.randon()*(this.columns-1)) + 1;
		}

		let food = new Cell(x, y);
		this.foods.push(food);
	}

	update(snakeMovement, snakeId)
	{
		this.snakes = this.snakes.map(snake => {
			if(snake.getId() === snakeId) 
				snake.update(snakeMovement);
		});

		let snake = this.snakes.filter(snake => snake.getId() === snakeId);

		if(snake === undefined)
			throw `Snake not found: ${snakeId}`;

		let head = snake.getHead();

		if(grid[head.getX()][head.getY()] === snake.getId())
		{
			this.gameOver();
			return;
		}

		if(grid[head.getX()][head.getY()] === "food")
		{
			this.snake.grow();
			this.eatFood(head);
			this.newFood();
		}

		this.updateGrid();
	}

	eatFood(foodEaten)
	{
		this.foods = this.foods.filter(food => foodEaten.getX() !== food.getX() && foodEaten.getY() !== food.getY());
	}

	updateGrid()
	{
		this.grid = resetGrid();

		this.snakes.forEach(snake => this.grid[snake.getX()-1][snake.getY()-1] = snake.getId());
		this.foods.forEach(food => this.grid[food.getX()-1][food.getY()-1] = "food");

		Draw.drawBoard(this);
	}
}