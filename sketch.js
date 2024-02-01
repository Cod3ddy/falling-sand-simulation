// create a 2d array

function make2DArray(cols, rows) {
	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
		for (let j = 0; j < arr[i].length; j++) {
			arr[i][j] = 0;
		}
	}
	return arr;
}

let grid;
let w = 10;
let cols, rows;

function setup() {
	let canvas = createCanvas(600, 800);
	canvas.style("border", "5px solid rgba(255, 255, 255, 0.2)");
	canvas.style("border-radius", "10px");
	canvas.center();
	cols = width / w;
	rows = height / w;
	grid = make2DArray(cols, rows);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = 0;
		}
	}

	// set the initial state of the grid to 1
	// grid[2][2] = 1;
	// grid[2][1] = 1;
	// grid[2][10] = 1;
	// grid[2][4] = 1;
	// grid[2][rows - 1] = 1;
	// grid[2][rows - 2] = 1;
	// grid[2][rows - 3] = 1;
	// grid[2][rows - 4] = 1;
	// grid[2][rows - 5] = 1;
	// grid[2][rows - 6] = 1;
	// grid[2][rows - 7] = 1;
	// grid[2][rows - 8] = 1;
	// grid[2][rows - 9] = 1;
	// grid[2][rows - 10] = 1;
}

function draw() {
	background(0);
	// let box = createDiv("").sie(10, 10);
	//draw the rows and columns
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			noStroke();

			fill(grid[i][j] * 255);

			let x = i * w;
			let y = j * w;
			square(x, y, w);
		}
	}

	//the next grid

	let nextGrid = make2DArray(cols, rows);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j];
			if (state === 1) {
				// look below to check if the cell has a state of one or not
				let below = grid[i][j + 1];
				let direction = 1;
				if (random(1) < 0.5) {
					direction *= -1;
				}
				let belowA, belowB;

				// check the edges
				if (i + direction >= 0 && i + direction <= cols - 1) {
					belowA = grid[i + direction][j + 1];
				} else if (i - direction >= 0 && i - direction <= cols - 1) {
					belowB = grid[i - direction][j + 1];
				}

				// check what's below
				if (below === 0) {
					nextGrid[i][j + 1] = 1;
				} else if (belowA === 0) {
					nextGrid[i + direction][j + 1] = 1;
				} else if (belowB === 0) {
					nextGrid[i - direction][j + 1] = 1;
				} else {
					nextGrid[i][j] = 1;
				}
			}
		}
	}

	//set current grid to the next grid
	grid = nextGrid;
}

// addd grain of sand on moouse click

function mouseDragged() {
	let mouseColumn = floor(mouseX / w);
	let mouseRow = floor(mouseY / w);
	// drop a chunk of sand particles
	let matrix = 5;
	let extent = floor(matrix / 2);
	for (i = -extent; i <= extent; i++) {
		for (j = -extent; j <= extent; j++) {
			let col = mouseColumn + i;
			let row = mouseRow + j;

			// check if the cursor is within the canvas
			if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
				grid[col][row] = 1;
			}
		}
	}
}

function mousePressed() {
	let mouseColumn = floor(mouseX / w);
	let mouseRow = floor(mouseY / w);
	// drop a chunk of sand particles
	let matrix = 5;
	let extent = floor(matrix / 2);
	for (i = -extent; i <= extent; i++) {
		for (j = -extent; j <= extent; j++) {
			let col = mouseColumn + i;
			let row = mouseRow + j;

			// check if the cursor is within the canvas
			if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
				grid[col][row] = 1;
			}
		}
	}
}
