//cellular automaton
//rules - if there's <2 live neighbors = death
//2-3 live neighbors = stays alive
//>3 live neighbors = death
//dead cell + 3 live neighbors = alive again
var c; //cell
var grid;
var next;
var res = 5;
var gen = 0;
var cols;
var rows;
var sum;

function setup() {
	createCanvas(400, 430);
	background(0);
	cols = 400/res;
	rows = 400/res;
	fill(255);
	stroke(0);
	grid = make2darray(cols,rows);
	seed();
	text('Press n to restart',0,410);
	text('Click and drag to control a cell',0,420);
	textFont('Verdana');
}

function seed() {
for (i=0;i<cols;i++) {
		for (j=0;j<rows;j++) {
			grid[i][j]=floor(random(2));
	}
	}
}
function keyPressed() {
	if (keyCode === 78) {
		seed();
	}
}

function draw() {
	let next = make2darray(cols,rows);
	//initial setup
	for (i=0;i<cols;i++) {
		for (j=0;j<rows;j++) {
			let x=i*res;
			let y=j*res;
			rect(x,y,res,res);
			if (grid[i][j]==1) {
				turn_on(i,j);
			} if (grid[i][j]==0) {
				turn_off();
			}
		}
	}
	//upd
	for (i=0;i<cols;i++) {
		for (j=0;j<rows;j++) {
			//count live neighbors
			let sum = 0;
			let state = grid[i][j];
			sum = countn(grid, i,j);
			if (state == 1 && (sum < 2 || sum > 3)) {
				next[i][j] = 0;
			} else if (state == 1 && (sum == 2 || sum == 3)) {
				next[i][j] = 1;
			} else if (state == 0 && sum == 3) {
				next[i][j] = 1;
			} else {
				next[i][j] = state;
			}
		}
	}
	grid = next;
	if (mouseIsPressed) {
		xc = round(map(mouseX,0,400,0,width/res));
		yc = round(map(mouseY,0,400,0,width/res));
		grid[xc][yc]=1;
	}
}

function make2darray(cols,rows){
	let arr = new Array(cols);
	for (i = 0;i<arr.length;i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function turn_off(){
	fill(0);
}
function turn_on(i,j){
	xcol = map(i,0,cols,0,255);
	ycol = map(j,0,rows,0,255);
	xycol = map(sqrt(i^2+j^2),0,sqrt(cols^2+rows^2),0,255);
	currcol = color(xcol,ycol,xycol);
	fill(currcol);
	return currcol
}

function countn(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
