class Snake
{
	constructor(id, color, maxX, maxY)
	{
		let x = Math.floor(Math.randon()*(maxX-1));
		let y = Math.floor(Math.randon()*(maxY-1));

		this.#id = id;
		this.#color = color;
		this.#maxX = maxX;
		this.#maxY = maxY;
		this.#head = {x:x, y:y};
		this.#body = [this.head];
		this.#size = 1;
		this.#oldTail1 = undefined;
		this.#oldTail2 = undefined;
	}

	#move(movement)
	{
		try
		{
			if(movement.toUpperCase() === "UP")
				this.#up();
			else if(movement.toUpperCase() === "DOWN")
				this.#down();
			else if(movement.toUpperCase() === "LEFT")
				this.#left();
			else if(movement.toUpperCase() === "RIGHT")
				this.#right();
			else
				throw movement;
		}
		catch(e)
		{
			console.log("Invalid movement: " + e);
		}
	}

	#up()
	{
		this.#head.y = (this.#head.y+1 + this.#maxY)%this.#maxY;
	}

	#down()
	{
		this.#head.y = (this.#head.y-1 + this.#maxY)%this.#maxY;
	}

	#left()
	{
		this.#head.x = (this.#head.x-1 + this.#maxX)%this.#maxX;
	}

	#right()
	{
		this.#head.x = (this.#head.x+1 + this.#maxX)%this.#maxX;
	}

	#correctHead()
	{
		this.head.x = (this.head.x + this.maxX)%this.maxX;
		this.head.y = (this.head.y + this.maxY)%this.maxY;
	}

	update(movement)
	{
		this.#move(movement);
		this.#body.unshift(this.#head);
		this.#oldTail2 = this.#oldTail1;
		this.#oldTail1 = this.#body.pop();
	}

	grow()
	{
		if(this.#oldTail1 !== undefined)
		{
			this.#body.push(this.#oldTail1);
			this.#oldTail1 = this.#oldTail2;
		}
	}

	getHead()
	{
		return this.#head;
	}

	getTail()
	{
		return this.#body[this.#size-1];
	}

	getPreviuosTail()
	{
		return this.#odlTail;
	}

	getSize()
	{
		return this.#size;
	}

	getId()
	{
		return this.#id;
	}
}