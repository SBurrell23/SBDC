function SlidingPuzzle()
{
	this.canvas 		= document.getElementById("canvas");
	this.ctx 			= canvas.getContext("2d");
	this.canvasWidth	= 700;
	this.canvasHeight	= 600;
	this.shuffleCount	= 2000; //Pseudo-random shuffles
	this.gameWon		= false;
	this.startTime		= null;
	this.endTime		= null;

	this.board = [
		[1,5,9,13],
		[2,6,10,14],
		[3,7,11,15],
		[4,8,12,0],
	];

	this.initCanvas();
}

SlidingPuzzle.prototype.initCanvas = function()
{
	var self = this;
	this.canvas.width 	= this.canvasWidth;
	this.canvas.height 	= this.canvasHeight;
	this.ctx.fillStyle  = "#FFFFFF";
	this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

	this.shuffleTiles();
	this.drawTiles();
	this.canvas.addEventListener("mousedown", function(evt){ 
		if(self.gameWon == false)
			self.handleMouseClicks(evt,self); 
	},false);
	this.startTime = performance.now();
}

SlidingPuzzle.prototype.shuffleTiles = function()
{
	for (var s = 0; s < this.shuffleCount; s++)
	{	
		var rand = Math.floor(Math.random() * 4) + 1;
		for (var i = 0; i < this.board.length; i++)
		{
			for (var k = 0; k < this.board[i].length; k++)
			{
				if(this.board[i][k] == 0)
				{
					if(i+1 < this.board.length && rand <=2)
					{
						this.board[i][k] 	= this.board[i+1][k];
						this.board[i+1][k] 	= 0;
					}
					else if(i-1 >= 0 && rand > 2)
					{
						this.board[i][k] 	= this.board[i-1][k];
						this.board[i-1][k] 	= 0;
					}
					else if(k+1 < this.board[0].length && rand <=2)
					{
						this.board[i][k] 	= this.board[i][k+1];
						this.board[i][k+1] 	= 0;
					}
					else if(k-1 >= 0 && rand > 2)
					{
						this.board[i][k] 	= this.board[i][k-1];
						this.board[i][k-1] 	= 0;	
					}
				}
			}
		}
	}
}

SlidingPuzzle.prototype.drawTiles = function()
{
	for (var i = 0; i < this.board.length; i++)
	{
		for (var k = 0; k < this.board[i].length; k++)
		{
			this.ctx.fillStyle = "#c52828";
			if(this.board[i][k] == 0)
				this.ctx.fillStyle = "#2b2b2b";
			var xLoc = (this.canvasWidth/this.board.length);
			var yLoc = (this.canvasHeight/this.board.length);
			this.ctx.fillRect(i*xLoc,k*yLoc,xLoc,yLoc);

			this.ctx.strokeStyle = "#FFFFFF";
			this.ctx.lineWidth   = 2;
			this.ctx.strokeRect(i*xLoc,k*yLoc,xLoc,yLoc);

			this.ctx.fillStyle = "#FFFFFF";
			this.ctx.font="26px Arial";
			if(this.board[i][k] != 0 && this.board[i][k] > 9)
				this.ctx.fillText(this.board[i][k],(i*xLoc)+(xLoc/2)-15,(k*yLoc)+(yLoc/2)+6);
			else if(this.board[i][k] != 0 && this.board[i][k] <= 9)
				this.ctx.fillText(this.board[i][k],(i*xLoc)+(xLoc/2)-8,(k*yLoc)+(yLoc/2)+6);
		}
	}
}

SlidingPuzzle.prototype.handleMouseClicks = function(evt,self)
{
	var rect = self.canvas.getBoundingClientRect();

	var xClickPos = Math.ceil((evt.clientX - rect.left) / (rect.right - rect.left) * self.canvas.width);
	var yClickPos = Math.ceil((evt.clientY - rect.top) / (rect.bottom - rect.top) * self.canvas.height);

	var xBoardClicked = Math.ceil(xClickPos / (self.canvas.width/self.board.length)) - 1;
	var yBoardClicked = Math.ceil(yClickPos / (self.canvas.height/self.board[0].length)) - 1;

	//console.log("You clicked: " + self.board[xBoardClicked][yBoardClicked] + "\n" + "x:" + xBoardClicked +  " y:" + yBoardClicked);

	// Tile to the right.
	if(xBoardClicked + 1 < self.board.length && self.board[xBoardClicked+1][yBoardClicked] == 0) 
	{
		self.board[xBoardClicked+1][yBoardClicked] = self.board[xBoardClicked][yBoardClicked];
		self.board[xBoardClicked][yBoardClicked]   = 0;
	}
	// Tile to the left.
	if(xBoardClicked - 1 >= 0 && self.board[xBoardClicked-1][yBoardClicked] == 0) 
	{
		self.board[xBoardClicked-1][yBoardClicked] = self.board[xBoardClicked][yBoardClicked];
		self.board[xBoardClicked][yBoardClicked]   = 0;
	}
	// Tile to the bottom.
	if(yBoardClicked - 1 >= 0 && self.board[xBoardClicked][yBoardClicked-1] == 0) 
	{
		self.board[xBoardClicked][yBoardClicked-1] = self.board[xBoardClicked][yBoardClicked];
		self.board[xBoardClicked][yBoardClicked]   = 0;
	}
	// Tile to the top.
	if(yBoardClicked + 1 < self.board[0].length && self.board[xBoardClicked][yBoardClicked+1] == 0) 
	{
		self.board[xBoardClicked][yBoardClicked+1] = self.board[xBoardClicked][yBoardClicked];
		self.board[xBoardClicked][yBoardClicked]   = 0;
	}
	self.drawTiles();

	var finishedBoard = [
		[1,5,9,13],
		[2,6,10,14],
		[3,7,11,15],
		[4,8,12,0]
	];

	if(_.isEqual(self.board, finishedBoard))
	{	
		this.canvas.removeEventListener("mousedown", function(evt){});
		this.ctx.fillStyle = "#FFFFFF";
		this.ctx.strokeStyle = "#2b2b2b";
		this.ctx.font="76px Arial";
		this.ctx.fillText("You Win!",self.canvasWidth/2 - 150,self.canvasHeight/2 + 18);
		this.ctx.strokeText("You Win!",self.canvasWidth/2 - 150,self.canvasHeight/2 + 18);
		self.gameWon = true;
		self.endTime = performance.now();
		var time = ((self.endTime - self.startTime) / 1000);
		$("#yourTimes").append('<li>'+ (Math.round(time * 100) / 100)+' seconds</li>');
		self.startTime		= null;
		self.endTime		= null;
		$('#noTimes').remove();
	}
}

$(function(){
	
	new SlidingPuzzle();

	$( "#shuffleButton" ).click(function() {
		new SlidingPuzzle();
	});

});