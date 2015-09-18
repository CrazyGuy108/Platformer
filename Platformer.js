window.onload = Platformer;

function Platformer () {

	var needRender = true; //Used in checking if the canvas needs to be rerendered.
	var canvas = document.getElementById("blockCanvas"); //The gameplay field in which game events take place in.
	var keysPressed = [undefined, undefined, undefined]; //Keeps track of left, right, and up (in that order) keys pressed.
	var up = true; //Used in keeping track of if the block can jump.

	canvas.block = {}; //Main block that the user moves.
	canvas.block.x = 0; //Block x coordinate.
	canvas.block.y = canvas.height - 50; //Block y coordinate.
	canvas.block.destY = canvas.block.y; //Block destination y coordinate, used for controlling jump height.
	canvas.block.normY = canvas.block.y; //Block normal y coordinate, used for falling.
	canvas.block.movingHorizontal = 0; //Used in determining the horizontal direction and velocity in pixels per tick.
	canvas.block.movingVertical = 0; //Used in determining vertical direction and velocity in pixels per tick.
	canvas.context = canvas.getContext("2d"); //Context is 2d.
	canvas.context.beginPath();

	function render (bool) { //Flags that the canvas needs rerendered or that it already has rendered.

		needRender = bool;
	};

	function tick () {

		//Functionality script here.

		if (canvas.block.movingHorizontal !== 0) { //Is moving horizontal.

			console.log("Changing block x value by " + canvas.block.movingHorizontal + " pixels...");
            canvas.block.x += canvas.block.movingHorizontal; //Moves.
            render(true);
        }

        if(canvas.block.y < canvas.block.normY && canvas.block.y === canvas.block.destY) { //Reached jump top;

			canvas.block.movingVertical = 5; //Move 0.5 meters down per tick.
			canvas.block.destY = canvas.block.normY; //Block falls instead of jumps.
		}

        if(canvas.block.movingVertical !== 0 && canvas.block.destY !== canvas.block.y) { //Is moving vertical.

        	console.log("Changing block y value by " + canvas.block.movingVertical + " pixels...");
        	canvas.block.y += canvas.block.movingVertical; //Moves.
        	render(true);

        	if(canvas.block.destY === canvas.block.y && canvas.block.normY === canvas.block.y) { //Successfully landed.

        		up = true; //Can now jump.
        		canvas.block.movingVertical = 0; //No longer moving vertical.
        		console.log("Jump successful.");
        	}
        }

		//Canvas rendering script here.

		if(needRender) { //Needs to be rerendered.

			console.log("Rendering sprite...");
			render(false); //Resets the signal to rerender.
			canvas.context.clearRect(0, 0, canvas.width, canvas.height); //Clears the sprite.
			canvas.context.rect(canvas.block.x, canvas.block.y, 50, 50); //Selects rectangle.
			canvas.context.stroke(); //Draws rectangle.
			canvas.context.closePath(); //Closes and begins a new path.
			canvas.context.beginPath();
		}

		//Callback script.

		window.requestAnimationFrame(tick);
	};

	window.requestAnimationFrame(tick);

	//Key codes: up=38, left=37, right=39, z=90.

	function leftPress () {

		canvas.block.movingHorizontal = -5; //Move 0.5 meters left per tick.
	};

	function rightPress () {

		canvas.block.movingHorizontal = 5; //Move 0.5 meters right per tick.
	};

	function upPress () {

		if(up) {

			console.log("Jumping...");
			up = false; //Cannot jump while jumping.
			canvas.block.movingVertical = -5; //Move 0.5 meters up per tick.
			canvas.block.destY = canvas.block.y - 100; //Move 10 meters up altogether.
		}
	};

	function keydown (key) {

		var code = key.keyCode;

		key.preventDefault();

		if(code === 37) keysPressed[0] = true;

		if(code === 39) keysPressed[1] = true;

		if(code === 38) keysPressed[2] = true;

		if(keysPressed[0]) leftPress();

		if(keysPressed[1]) rightPress();

		if(keysPressed[2]) upPress();
	};

	function keyup (key) {

		var code = key.keyCode;

		if(code === 37 && keysPressed[0]) keysPressed[0] = false;

		if(code === 39 && keysPressed[1]) keysPressed[1] = false;

		if(code === 38 && keysPressed[2]) keysPressed[2] = false;

		if(code === 37 || code === 39) canvas.block.movingHorizontal = 0;
	};

	document.onkeydown = keydown;
	document.onkeyup = keyup;
};