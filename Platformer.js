window.onload = Platformer;

function Platformer () {

	var needRender, needMove;
	var horizontalVelocity = 0;
	var block = document.getElementById("blockCanvas");

	block.x = 0;
	block.y = 350;
	block.destX = block.x;
	block.destY = block.y;
	block.context = block.getContext("2d");

	block.context.rect(block.x, block.y, 50, 50);
	block.context.stroke();

	function move (bool) { //Sets needMove to bool, either signalling the need of a move or resetting it.

		needMove = bool;
	};

	function render (bool) { //Sets needRender to bool, either signalling the need of a rerender or resetting it.

		needRender = bool;
	};

	function tick () {

		//Functionality script here

		switch(true) {

			case (block.x < block.destX):

				console.log("Moving right by " + horizontalVelocity + " pixels per tick...");
				block.x += horizontalVelocity;
				render(true); //Signals tick cycle that the sprite has moved and needs to be rendered again.

				if(block.x === block.destX) resetVelocity();

				break;

			case (block.x > block.destX):

				console.log("Moving left by " + -horizontalVelocity + " pixels per tick...");
				block.x += horizontalVelocity; //Moves sprite by the velocity
				render(true); //Signals tick cycle that the sprite has moved and needs to be rendered again.

				if(block.x === block.destX) resetVelocity();

				break;
		}

		//Canvas rendering script here.

		if(needRender === true) { //Needs to be rerendered.

			console.log("Rerendering sprite...");
			render(false); //Resets the signal to rerender.
			block.width = block.width; //Clears rectangles by updating width.
			block.context.rect(block.x, block.y, 50, 50); //Redraws rectangle.
			block.context.stroke(); //Solidifies rectangle.
		}

		//Callback script

		window.requestAnimationFrame(tick);
	};

	window.requestAnimationFrame(tick);

	function resetVelocity () { //Resets velocity to 0.

		console.log("Resetting velocity...");
		horizontalVelocity = 0;
	};

	//Key codes: up=38, left=37, right=39, z=90.

	function keyPress (key) {

		var code = key.keyCode;
		//alert(code);

		switch(true) { //Parses keyCode for appropriate movement.

			case (code === 39 && horizontalVelocity === 0): //Right

				horizontalVelocity += 5;
				if(horizontalVelocity < 0) resetVelocity(); //Resets velocity if already moving left.
				if(horizontalVelocity > 20) horizontalVelocity = 20; //Caps velocity at 20.
				if(horizontalVelocity > 0) block.destX += 20; //Move 2 meters right if valid velocity exists.
				move(true);
				break;

			case (code === 37 && horizontalVelocity === 0): //Left

				horizontalVelocity -= 5;
				if(horizontalVelocity > 0) resetVelocity(); //Resets velocity if already moving right.
				if(horizontalVelocity < -20) horizontalVelocity = -20; //Caps velocity at -20.
				if(horizontalVelocity < 0) block.destX -= 20; //Move 2 meters left if valid velocity exists.
				move(true);
				break;
		}
	};
	document.onkeydown = keyPress;
};