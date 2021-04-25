//TODO - slider doesn't update drawing
//add random initial conditions
let cells;
let length;
let generation;
let test;
let history;
let sel;
let ruleset;
let color1;
let color2;

function setup() {
	createCanvas(500, 500);
	color1 = color(0, 6, 189);
	color2 = color(209, 63, 87);
	background(0);
	res = 5;
	//width_i = width/4;
	length = width/res;
	cells = [];
	generation = 0;
	history=make2darray();
	sel = createSelect();
	text('rule 18',100,100)
	fill(255);
  sel.position(10, 10);
  sel.option('rule 18');
  sel.option('rule 30');
	sel.option('rule 73');
  sel.option('rule 110');
	sel.changed(change_rule);
	checkbox = createCheckbox('random initial state', false);
	checkbox.position(10, 40);
  checkbox.changed(change_init);
	seed();
}


function get_rules(val) {
	switch(val) {
		case 'rule 18':
			return ruleset = [0,0,0,1,0,0,1,0];
		case 'rule 30':
			return ruleset = [0,0,0,1,1,1,1,0];
		case 'rule 73':
			return ruleset = [0,1,0,0,1,0,0,1];
		case 'rule 110':
			return ruleset = [0,1,1,0,1,1,1,0];
	}
}


function change_rule() {
	clear();
	generation=0;
	seed();
	follow_rules(get_rules(sel.value()));
}

function change_init() {
	clear();
	generation=0;
	if (checkbox.checked() == true) {
		seed_random();
	} else {
		seed();
	}
	follow_rules(get_rules(sel.value()));
}

function draw() {
	follow_rules(get_rules(sel.value()))
}

function follow_rules(ruleset) {
	nextcells = [];
	for (let i = 0;i<length;i++){
		nextcells[i]=0;
		fill(0);
	}
	//initialize
	for (let i = 0;i<length;i++){
		x=i*res;
		rect(x,generation*res,res,res);
		if (cells[i]==1) {
			turn_on(color1,color2,generation);
		} else {
			fill(0);
		}
	}
	//update
	for (let i = 1;i<length-1;i++){ //ignoring edges
		var left = cells[i-1];
		var self = cells[i];
		var right = cells[i+1];
		nextcells[i]=rules(left,self,right,ruleset);
	}
	cells = nextcells;
	generation++;
	history[generation]=cells;
	if (generation == width/res) {
		for (let i = 0;i<width;i++){
			history[i]=history[i+1];
		}
	}
}


function seed() {
	for (let i = 0;i<length;i++){
		cells[i]=0;
	}
	cells[length/2]=1;
	history[0]=cells;
}

function seed_random() {
	let rand_sel = [];
	let count = [];
	for (let i = 0;i<length;i++){
		cells[i]=0;
		count[i] = i;
	}
	n_rand = floor(random()*length); //amt of random cells to turn on
	rand_idx = shuffle_arr(count); //shuffle 1 to n array
	rand_idx = rand_idx.slice(0, n_rand); //get n_rand entries
	for (i = 0;i<length;i++){
		cells[rand_idx[i]] = 1;
	}
	history[0]=cells;
}

function shuffle_arr(array) {
	for(let i = array.length - 1; i > 0; i--){
		const j = floor(random() * i)
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

function make2darray(){
	let arr = [];
	for (i = 0;i<arr.length;i++) {
		arr[i] = [];
	}
	return arr;
}

function turn_on(c1,c2,generation){
	let interp = lerpColor(color1,color2,generation/res*0.1)
	fill(interp);
}

function rules(a,b,c,ruleset){
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c == 0) return ruleset[1];
  if (a == 1 && b == 0 && c == 1) return ruleset[2];
  if (a == 1 && b == 0 && c == 0) return ruleset[3];
  if (a == 0 && b == 1 && c == 1) return ruleset[4];
  if (a == 0 && b == 1 && c == 0) return ruleset[5];
  if (a == 0 && b == 0 && c == 1) return ruleset[6];
  if (a == 0 && b == 0 && c == 0) return ruleset[7];
}
