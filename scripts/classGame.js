export default class Game
{
	constructor(width, height)
	{
		this.#state = "";
		this.#width = width;
		this.#height = height;
		this.#grid = new Array(height);
		this.#food = undefined;
		this.#snake = undefined;
		for(let i = 0; i < height; i++)
		{
			this.#grid[i] = new Array(width);
			this.#grid[i].fill("none");
		}
		this.#snakeID = 0;
	}

	start()
	{
		this.#state = "running";
		for(let i = 0; i < this.#height; i++)
			this.#grid[i].fill("none");
		this.newSnake(rgb(0,255,0));
		this.newFood();
	}

	gameOver()
	{
		this.#state = "stopped";
		this.#snake = undefined;
		for(let i = 0; i < this.#height; i++)
			this.#grid[i].fill("none");
	}

	pause()
	{
		this.#state = "paused";
	}

	play()
	{
		this.#state = "running";
	}

	getStated()
	{
		return this.#state;
	}

	newSnake(color)
	{
		this.#snakeID++;
		this.#snake = new Snake("snake"+this.#snakeID.toString(), this.#maxX, this.#maxY, color);
	}

	newFood()
	{
		let x = Math.floor(Math.randon()*(this.#width-1));
		let y = Math.floor(Math.randon()*(this.#height-1));

		while(this.#grid[x][y] === "none")
		{
			x = Math.floor(Math.randon()*(this.#width-1));
			y = Math.floor(Math.randon()*(this.#height-1));
		}
		this.#grid[x][y] = "food";
	}

	update(snakeMovement)
	{
		let tail = this.#snake.getTail();
		let head = this.#snake.getHead();

		this.#snake.update(snakeMovement);

		if(grid[head.x][head.y] === "snake")
		{
			this.gameOver();
			return;
		}

		if(grid[head.x][head.y] === "food")
		{
			this.#snake.grow();
			this.newFood();
		}

		this.updateGrid();
	}
}