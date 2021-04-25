function setup() {
	createCanvas(800, 800);
	background(0);
	num=3;
	walkers=[];
	for (let i = 0; i < num; i++) {
		walkers[i] = new Walkr();
	}
}
function draw() {
	for (let i = 0; i < num; i++) {
		walkers[i].display();
		walkers[i].step();
	}
}
class Walkr {
	constructor() {
		this.pos = createVector(width/2,height/2);
		this.prev = this.pos.copy();
		this.c = color(random(0,255),random(0,255),random(0,255));
	}
	display() {
		stroke(this.c);
		strokeWeight(3);
		line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  	this.prev.set(this.pos);
	}
	step() {
		this.rand = p5.Vector.random2D();
		this.rand.mult(10);
		this.pos.add(this.rand);
	}
}
