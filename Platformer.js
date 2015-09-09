window.onload = Platformer;

function Platformer () {

	var needRender = true; //Used in checking if the canvas needs to be rerendered.
	var canvas = document.getElementById("blockCanvas"); //The gameplay field in which game events take place in.
	var keysPressed = [undefined, undefined, undefined]; //Keeps track of left, right, and up (in that order) keys pressed.

	canvas.block = {}; //Main block that the user moves.
	canvas.block.x = 0; //Block x coordinate.
	canvas.block.y = 350; //Block y coordinate.
	canvas.block.movingHorizontal = 0; //Used in determining the direction of the sprite and how many pixels to move by horizontally.
	canvas.context = canvas.getContext("2d");

	function render (bool) { //Sets needRender to bool, either signalling the need of a rerender or resetting it.

		needRender = bool;
	}; 

	function tick () {

		//Functionality script here

		if (canvas.block.movingHorizontal != 0) { //Is moving horizontal

			console.log("Changing block's x value by " + canvas.block.movingHorizontal + " pixels...")
            canvas.block.x += canvas.block.movingHorizontal;
            render(true);
        }

		//Canvas rendering script here.

		if(needRender) { //Needs to be rerendered.

			console.log("Rendering sprite...");
			render(false); //Resets the signal to rerender.
			canvas.width = canvas.width; //Clears rectangles by updating width.
			canvas.context.rect(canvas.block.x, canvas.block.y, 50, 50); //Redraws rectangle.
			canvas.context.stroke(); //Solidifies rectangle.
		}

		//Callback script

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

		//Move 10 meters up.
		//Not implemented yet.
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