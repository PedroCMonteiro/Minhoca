class Snake
{
	static InitialSize = 3;
	static Id = 1;

	constructor(maxX, maxY, color)
	{
		let x = Math.floor(Math.random()*(maxX-1)) + 1;
		let y = Math.floor(Math.random()*(maxY-1)) + 1;

		this.id = this.Id++;
		this.color = color;
		this.limits = new Cell(maxX, maxY);
		this.body = [new Cell(x, y)];
		this.oldTail1 = undefined;
		this.oldTail2 = undefined;

		for(let i = 0; i < this.InitalSize; i++)	
		{
			update("RIGHT");
			grow();
		}
	}

	getBody()
	{
		return this.body;
	}

	getHead()
	{
		return this.body.find(i => true);
	}

	getTail()
	{
		return this.body[this.getSize()-1];
	}

	getSize()
	{
		return this.body.length;
	}

	getId()
	{
		return this.id;
	}

	getScore()
	{
		return this.getSize() - InitialSize;
	}

	// return the new place of the head
	move(movement)
	{
		if(movement.toUpperCase() === "UP")
			return this.up();
		else if(movement.toUpperCase() === "DOWN")
			return this.down();
		else if(movement.toUpperCase() === "LEFT")
			return this.left();
		else if(movement.toUpperCase() === "RIGHT")
			return this.right();
		else
			// if movement hasn't been exist
			throw `Invalid movement: ${movement}`;
	}

	up()
	{
		let newHead = new Cell(this.getHead().getX(), this.getHead().getY()+1);
		newHead = Cell.correctCell(newHead, limits);
		return newHead;
	}

	down()
	{
		let newHead = Cell(this.getHead().getX(), this.getHead().getY()-1);
		newHead = Cell.correctCell(newHead, limits);
		return newHead;
	}

	left()
	{
		let newHead = Cell(this.getHead().getX()-1, this.getHead().getY());
		newHead = Cell.correctCell(newHead, limits);
		return newHead;
	}

	right()
	{
		let newHead = Cell(this.getHead().getX()+1, this.getHead().getY());
		newHead = Cell.correctCell(newHead, limits);
		return newHead;
	}

	update(movement)
	{
		try
		{
			let head = this.move(movement);
			this.body.unshift(head);
			//this.head = head;
			this.oldTail2 = this.oldTail1;
			this.oldTail1 = this.body.pop();
		}
		catch(e)
		{
			throw e;
		}
	}

	grow()
	{
		if(this.oldTail1 !== undefined)
		{
			this.body.push(this.oldTail1);
			this.oldTail1 = this.oldTail2;
		}
	}
}