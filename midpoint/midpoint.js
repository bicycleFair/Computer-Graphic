var canvas = document.getElementById("canvas");
var line = document.getElementById("line");
var circle = document.getElementById("circle");
var ellipse = document.getElementById("ellipse");
var rectangle = document.getElementById("rectangle");
var polyl = document.getElementById("polyl");
var polyg = document.getElementById("polyg");
var auto_renew_5 = document.getElementById("auto_renew_5");
var auto_renew_6 = document.getElementById("auto_renew_6");
var clear = document.getElementById("clear");

var polyg_vertice_num = 3;
var context = canvas.getContext("2d");
context.fillStyle = "black";

//create things by clicking on canvas
var mouseCount = 0;
var x_c0,y_c0, x_c1, y_c1;
var flag = 0;
var polyg_startX,polyg_startY,polyg_endX,polyg_endY;
canvas.addEventListener("mousedown", function(e){
	mouseCount++;
	var rect = canvas.getBoundingClientRect();
	if(mouseCount == 1){
		x_c0 = parseInt(e.clientX - rect.left);
		y_c0 = parseInt(e.clientY - rect.top);
		polyg_startX = x_c0;
		polyg_startY = y_c0;
	}else if(mouseCount == 2){
		x_c1 = parseInt(e.clientX - rect.left);
		y_c1 = parseInt(e.clientY - rect.top);
	}
	
	if((flag == 0 || flag == 2 || flag ==3 || flag == 4)&& mouseCount == 2){
		if(flag == 0){
			drawLine(x_c0, y_c0, x_c1, y_c1);
		}else if(flag == 2){
			var d1 = Math.abs(x_c1-x_c0);
			var d2 = Math.abs(y_c1-y_c0);
			var r = Math.sqrt(d1*d1+d2*d2);
			drawCircle(x_c0, y_c0,r);
		}else if(flag == 3){
			var d1 = Math.abs(x_c1-x_c0);
			var d2 = Math.abs(y_c1-y_c0);
			var r = Math.sqrt(d1*d1+d2*d2);
			if(d1 > d2){
				drawEllipse(x_c0, y_c0, r,r/2 );
			}else{
				drawEllipse(x_c0, y_c0, r/2, r );
			}
			
		}else if(flag == 4){
			drawLine(x_c0, y_c0, x_c1, y_c0);
			drawLine(x_c0, y_c0, x_c0, y_c1);
			drawLine(x_c0, y_c1, x_c1, y_c1);
			drawLine(x_c1, y_c1, x_c1, y_c0);
		}
		mouseCount = 0;
	}else if((flag == 1 || flag == 5) && mouseCount >=2){
		
		if(mouseCount == 2){
			drawLine(x_c0, y_c0, x_c1, y_c1);
		}else if(mouseCount > 2){
			x_c0 = x_c1;
			y_c0 = y_c1;
			x_c1 = parseInt(e.clientX - rect.left);
			y_c1 = parseInt(e.clientY - rect.top);
			drawLine(x_c0, y_c0, x_c1, y_c1);
			polyg_endX = x_c1;
			polyg_endY = y_c1;			
			
		}
		
		if(flag == 5 && mouseCount == polyg_vertice_num){
			drawLine(polyg_startX, polyg_startY, polyg_endX, polyg_endY);
			mouseCount = 0;
		}	
	}
});

function clearCanvas(){
	context.clearRect(0,0, canvas.width, canvas.height);
}

function setVertice(){
	if(auto_renew_5.checked){
		polyg_vertice_num = 5;
	}else if(auto_renew_6.checked){
		polyg_vertice_num = 6;
	}else{
		alert("please select number of vertice first");
	}
}

//event listener
line.addEventListener("click", function(){
	flag = 0;
	mouseCount = 0;
	context.fillStyle="black";
},false);

circle.addEventListener("click", function(){
	flag = 2;
	mouseCount = 0;
	context.fillStyle="red";
}, false);

ellipse.addEventListener("click", function(){
	flag = 3;
	mouseCount = 0;
	context.fillStyle="orange";
},false);


rectangle.addEventListener("click", function(){
	flag = 4;
	mouseCount = 0;
	context.fillStyle="purple";
}, false);

polyl.addEventListener("click", function(){
	mouseCount = 0;
	flag = 1;
	context.fillStyle="pink";
}, false);

polyg.addEventListener("click", function(){
	setVertice();
	mouseCount = 0;
	flag = 5;
	context.fillStyle="green";
},false);

clear.addEventListener("click", function(){
	clearCanvas();
	mouseCount = 0;
},false);


//midpoint algorithm for line
function drawLine(x0, y0, x1, y1) {
    var xi = 1;
    var yi = 1;
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
  
    if(x0 > x1){
        xi = -xi;
    }
    
    if(y0 > y1){
        yi = -yi;
    }
    var d;
    if(dx > dy){
        d = dx / 2;
    }else {
        d = -dy / 2;
    }
    while(true){
        context.fillRect(x0, y0, 1, 1);
        if (xi > 0 && yi > 0 && x0 >= x1 && y0 >= y1) {
            break;
        } else if (xi > 0 && yi < 0 && x0 >= x1 && y0 <= y1) {
            break;
        } else if (xi < 0 && yi > 0 && x0 <= x1 && y0 >= y1) {
            break;
        } else if (xi < 0 && yi < 0 && x0 <= x1 && y0 <= y1) {
            break;
        }
        if (d > -dx) {
            d = d - dy;
            x0 = x0 + xi;
        }
        if (d < dy) {
            d = d + dx;
            y0 = y0 + yi;
        }
    }
}

//midpoint algorithm for circle
function drawCircle(x0, y0, r){
	var x=r;
	var y=0;
	var d = 1-r;
	
	while(x>=y)
	{	circleHelper(x,y,x0,y0);
		y++;
		if(d<0){
			d+=y*2+1;
		}else{
			d+=2*(y-x)+1;
			x--;
		}
		circleHelper(x,y,x0,y0);
	}
}

function circleHelper(x,y,x0,y0){
	context.fillRect(x+x0, y+y0, 1,1);
	context.fillRect(x0+y, x+y0, 1,1);
	context.fillRect(x0-x, y0+y, 1,1);
	context.fillRect(x0-y, y0+x, 1,1);
	context.fillRect(x0-x, y0-y, 1,1);
	context.fillRect(x0-y, y0-x, 1,1);
	context.fillRect(x0+x, y0-y, 1,1);
	context.fillRect(x0+y, y0-x, 1,1);
}

//midpoint algorithm for ellipse
function drawEllipse(x0,y0,width,height)
{
	var x=0;
	var y=height;
	var wS = width*width;
	var hS = height*height;
	var i = 0;
	var j = 2*wS*y;
	ellipseHelper(x,y,x0,y0);
	
	var d = hS-(wS*height)+(0.25*wS);
	
	while(i<j){
		x++;
		i +=2*hS;
		if(d<0)
		{
			d +=hS +i;
		}else{
			y--;
			j -=2*wS;
			d +=hS+i-j;
		}
		ellipseHelper(x,y,x0,y0);
	}
	
	d =hS*((x+0.5)*(x+0.5)) + wS*((y-1)*(y-1)) - wS*hS;
	while(y>0){
		y--;
		j=j-2*wS;
		if(d>0){
			d +=wS-j;
		}else{
			x++;
			i+=2*hS;
			d=d+wS-j+i;
		}
		ellipseHelper(x,y,x0,y0);
	}
}

function ellipseHelper(x,y,x0,y0){
	context.fillRect(x0+x, y0+y, 1,1);
	context.fillRect(x0-x, y0+y, 1,1);
	context.fillRect(x0+x, y0-y, 1,1);
	context.fillRect(x0-x, y0-y, 1,1);
}






