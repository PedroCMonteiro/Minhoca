class Cell
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static correctCell(cell, limits)
	{
		let x = cell.getX();
		let y = cell.getY();
		x = (x + limits.getX())%limits.getX();
		y = (y + limits.getY())%limits.getY();

		return new Cell(x, y);
	}

	getX()
	{
		return this.x;
	}

	getY()
	{
		return this.y;
	}
}