//based on https://openprocessing.org/sketch/792407#
let radius = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noFill();
	noLoop();
	angleMode(DEGREES);
	let center_x = windowWidth/2
	let center_y = windowHeight/2;
}

function draw() {
	background(0.1);
	max_shapes=50;
	center_x = windowWidth/2
	center_y = windowHeight/2;
	let from = color(random(255),random(255),random(255));
	let to = color(random(255),random(255),random(255));
	let f = 0;
	for (i=0;i<max_shapes;i++) {
		let interp = lerpColor(from,to,i/max_shapes);
		let r = radius + i * 2;
		r = r*noise(i);
		f += 0.1;
		curve_shape(r,center_x,center_y,interp,f);
	}
}

function curve_shape(r,center_x,center_y,interp,f) {
	let pts = 360;
	let dist = 3;
	beginShape();
	for (let theta=0;theta<=360;theta+=360/pts) {
		strokeWeight(0.3);
		stroke(interp);
		x = center_x+r*cos(theta)*noise(f*sin(theta),f*cos(theta),f)*dist;
		y = center_y+r*sin(theta)*noise(f*sin(theta),f*cos(theta),f)*dist;
		curveVertex(x,y);
	}
	endShape(CLOSE);
}
