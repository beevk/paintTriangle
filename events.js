function downCordinates(event) {
	event.preventDefault();
	var rect = canvas.getBoundingClientRect();
    x1 = event.clientX - rect.left;
    y1 = event.clientY - rect.top;
    mouseDown = true;
    val = searchTriangle(x1,y1)

    if(val === true) {
    	isDown = true;
    	dragging = true;
    }
    else {
    	color = getRandomColor();   	
    }
}

function move(event) {
	if(isDown !== true) {
		dynamicCreate(event);
	}
	else {
		dragOnMove(event);
	}
}

function upCordinates(event) {
	event.preventDefault();
	mouseDown = false;
	isDown = false;
	dragging = false;
    var rect = canvas.getBoundingClientRect();
    x2 = event.clientX - rect.left;
    y2 = event.clientY - rect.top;

    if(drag === null) {
    	flag = 1;
		flagChange();
    }
    else {
    	selected = null;
    }
}

function dblClick(event) {
	event.preventDefault();
	val = false;
	var check;
	var length = p1.length;
	var rect = canvas.getBoundingClientRect();
    px = event.clientX - rect.left;
    py = event.clientY - rect.top;

    searchTriangle(px,py);
    if(selected !== null) {
    	removePoints();
    	selected = null;
    	clearAll();
    	printAll();
    }

}

function dragOnMove(event) {
	if(isDown === false) {
		return;
	}
	event.preventDefault();
	var rect = canvas.getBoundingClientRect();
    mousex = event.clientX - rect.left;
    mousey = event.clientY - rect.top;
    var dx = mousex - x1;
    var dy = mousey - y1;
    x1 = mousex;
    y1 = mousey;

    p0[selected].x+=dx;
    p0[selected].y+=dy;
    p1[selected].x+=dx;
    p1[selected].y+=dy;
    p2[selected].x+=dx;
    p2[selected].y+=dy;

    clearAll();
    printAll();
}