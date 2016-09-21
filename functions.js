var canvas = document.getElementById('title');
var context = canvas.getContext('2d');
//For writing the Heading Part
context.font = '50px Comic Sans MS';
context.fillStyle  = "red";
context.textAlign = "center";
context.fillText("Create, drag and delete Triangles!", canvas.width/2, canvas.height/2);

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Create events
canvas.addEventListener('mousedown', downCordinates, false);
canvas.addEventListener('mouseup', upCordinates, false);
canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('dblclick', dblClick, false);

//Using BaryCentric co-ordinates to check if point is inside triangle
function searchTriangle(px,py) {
	for(var i = 0; i<p0.length; i++) {

		var Area = 0.5 *(-p1[i].y*p2[i].x + p0[i].y*(-p1[i].x + p2[i].x) + p0[i].x*(p1[i].y - p2[i].y) + p1[i].x*p2[i].y);
		var s = 1/(2*Area)*(p0[i].y*p2[i].x - p0[i].x*p2[i].y + (p2[i].y - p0[i].y)*px + (p0[i].x - p2[i].x)*py);
		var t = 1/(2*Area)*(p0[i].x*p1[i].y - p0[i].y*p1[i].x + (p0[i].y - p1[i].y)*px + (p1[i].x - p0[i].x)*py);

		var check = 1-s-t;

		if(s>0 && t>0 && check>0) {
			console.log('Found');
			selected = i;
			return true;
		}
	}
	return false;
}

//Checks everytime onmouseup
function flagChange() {
    if(flag == 0) {
        return;
    } 
    else { 
    	if(dragging !== false) {
    		return;
    	}
		//Take largest drag along (X|Y) axis
		var length = Math.abs(x2-x1) < Math.abs(y2-y1) ? Math.abs(y2-y1) : Math.abs(x2-x1);

		if(x1!=x2 || y2-y1!=y2) {
			
			//Take largest value for Y axis
			y1 = y1 < y2 ? y2 : y1;
			x2 = x1+length;
			genuine = true;
			drawTriangle(x1, y1, color, x2);
			genuine = false;
		}

		flag = 0;
		flagChange();
    }   
}


//Dynamically shows size of triangle to be drawn
function dynamicCreate(event) {
	event.preventDefault();
	if(val === true || mouseDown === false) {
		return;
	}
	var rect = canvas.getBoundingClientRect();
    x2 = event.clientX - rect.left;
    y2 = event.clientY - rect.top;

    var length = Math.abs(x2-x1) < Math.abs(y2-y1) ? Math.abs(y2-y1) : Math.abs(x2-x1);
	
	if(x1!=x2 && y1!=y2) {
		x2 = x1 + length;
		y1 = y1 < y2 ? y2 : y1;
		genuine = false;
		clearAll();	
		drawTriangle(x1, y1, color, x2);
		printAll();
	}
	else {

		return;
	}
    
}

//Draws triangle for given co-ordinates
function drawTriangle(x1, y1, c, x2) {
	//Calculate Hypotenuse and Base
	var h = x2-x1;
	var b = h/2;

	//Calculate x3 i.e. perpendicular
	x3 = x1 + b;

	//By Pythagoras theorem: P = sqrt(h*h - b*b);
	var p = Math.sqrt(h*h - b*b);
	y2 = y1;
	y3 = y1 - p;

	context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineTo(x3, y3);
	context.closePath();

	context.lineWidth = 1;
	context.strokeStyle = '#666666';
	context.stroke();
	context.fillStyle = c;
	context.fill();
	//To store the new triangle
	store();
}

//Stores co-ordinates of each new triangle drawn
function store() {
	if(genuine !== true) {
		return;
	}
	if(dragging == true) {
		return;
	}
	p0.push({x: x1, y: y1, c: color});
	p1.push({x: x2, y: y2});
	p2.push({x: x3, y: y3});
}

//Generate random colors for triangle
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Prints all the stored triangle
function printAll() {
	for(var i=0; i<p1.length; i++) {
		drawTriangle(p0[i].x, p0[i].y, p0[i].c, p1[i].x);
	}
}

//Remove certain triangle from array
function removePoints() {
	//Matches the selected triangle with background color, so that it is invisible
	for(var i=selected;i<p1.length-1;i++) {
		p0[i] = p0[i+1];
		p1[i] = p1[i+1];
		p2[i] = p2[i+1];
	}

	p0.pop();
	p1.pop();
	p2.pop();
}

//Clears the entire canvas for refresh
function clearAll() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

//Clears entire canvas for restart
function eraseAll() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	p0 = [];
	p1 = [];
	p2 = [];
}