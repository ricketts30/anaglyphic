/* filename: anaglyphic.js */


/* the points in a cube: */
var points = { "points": [
		{ "x": 0, "y": 0, "z": 0, "radius": 2 },
		
		{ "x": 20, "y": 20, "z": 20, "radius": 4 },
		{ "x": 20, "y": -20, "z": 20, "radius": 4 },
		{ "x": -20, "y": 20, "z": 20, "radius": 4 },
		{ "x": -20, "y": -20, "z": 20, "radius": 4 },
		{ "x": 20, "y": 20, "z": -20, "radius": 4 },
		{ "x": 20, "y": -20, "z": -20, "radius": 4 },
		{ "x": -20, "y": 20, "z": -20, "radius": 4 },
		{ "x": -20, "y": -20, "z": -20, "radius": 4 },

		{ "x": 50, "y": 50, "z": 50, "radius": 16 },
		{ "x": 50, "y": -50, "z": 50, "radius": 16 },
		{ "x": -50, "y": 50, "z": 50, "radius": 16 },
		{ "x": -50, "y": -50, "z": 50, "radius": 16 },
		{ "x": 50, "y": 50, "z": -50, "radius": 16 },
		{ "x": 50, "y": -50, "z": -50, "radius": 16 },
		{ "x": -50, "y": 50, "z": -50, "radius": 16 },
		{ "x": -50, "y": -50, "z": -50, "radius": 16 }
	]
};

// see http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
// the position of the "camera"
var c_x = 0;
var c_y = 0;
var c_z = 180;
// the orientiation of the camera
var theta_x = 0;
var theta_y = 0;
var theta_z = 0;
// the viewer
var e_x = 0;
var e_y = 0;
var e_z = 220;

var c1_x = 20;
var c1_y = 0;
var c1_z = 180;
// the orientiation of the camera
var theta1_x = 0;
var theta1_y = 0;
var theta1_z = 0;
// the viewer
var e1_x = 20;
var e1_y = 0;
var e1_z = 220;

var screen_half_height = 150;
var screen_half_width = 250;
var screen_height = 300;
var screen_width = 500;

function dbg(msg){
	var now = new Date();
	$('#span_canvas2_time').html(now.toISOString());
	$('#span_canvas2_debug').html(msg);
}  

function drawCanvas2(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	dbg('context found');
	ctx2.fillStyle = "rgb(200,0,0)";  
    ctx2.fillRect (10, 10, 55, 50);  
  
    ctx2.fillStyle = "rgba(0, 0, 200, 0.5)";  
    ctx2.fillRect (30, 30, 55, 50);
	
	var lingrad2 =  ctx2.createLinearGradient(0,0,200,200);
	lingrad2.addColorStop(0, '#FFFFFF');
	lingrad2.addColorStop(1, '#000000');
	ctx2.fillstyle = lingrad2;
	ctx2.fillRect(0,0,200,200);
	
	document.getElementById('canvas2').onclick = clickCanvas2;
}

function canvas2Clear(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	ctx2.clearRect(0,0,500,300);
}

function canvas2Other(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	ctx2.beginPath();
	ctx2.moveTo(100, -150);
	ctx2.lineTo(450, 50);
	ctx2.strokeStyle = "#ff0000";
	ctx2.lineWidth = 15;
	ctx2.lineCap = 'round';
	ctx2.stroke();
}

function canvas2PixelFill(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	for(var x = 0.0; x < 500.0; x += 10.0){
		for(var y = 0.0; y < 300.0; y += 10.0){
			ctx2.fillStyle = "rgba( 200, 50, 0, 0.3)";  
			ctx2.fillRect (x, y, 10, 10);
		}
	}
}

// this gives you the location on the canvas
function clickCanvas2(event){
	event = event || window.event;
    var canvas = document.getElementById('canvas2'),
        x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
    dbg('click(' + x + ', ' + y + ')');
}

function orthoBall(ctx, x, y, radius){
	ctx.fillStyle = "rgba(200, 50, 0, 0.3)"; 
	diameter = radius * 2.0;
	ctx.fillRect (x - radius, y - radius, diameter, diameter);
}

function ball(ctx, x, y, radius){
	ctx.fillStyle = "rgba(255, 00, 0, 1)";
	ctx.strokeStyle = "rgba(255, 00, 0, 1)";
	ctx.lineWidth = 0;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

function ball1(ctx, x, y, radius){
	ctx.fillStyle = "rgba(0, 255, 255, 1)";
	ctx.strokeStyle = "rgba(0, 255, 255, 1)";
	ctx.lineWidth = 0;
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2,true);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}

// this will take the points in the points array
// and render them to the screen
function render(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	ctx2.clearRect(0,0,screen_width, screen_height);
	// loop through all points
	for(i in points.points){
		// points.points[i].x 
		// points.points[i].y 
		// points.points[i].z 
		// points.points[i].radius
		
		var a_x = points.points[i].x
		var a_y = points.points[i].y
		var a_z = points.points[i].z
		var a_y_rad = points.points[i].y + points.points[i].radius
		
		var c_Th_x = Math.cos(theta_x);
		var c_Th_y = Math.cos(theta_y);
		var c_Th_z = Math.cos(theta_z);
		
		var s_Th_x = Math.sin(theta_x);
		var s_Th_y = Math.sin(theta_y);
		var s_Th_z = Math.sin(theta_z);
		
		var d_x = c_Th_y * (s_Th_z * (a_y - c_y) + c_Th_z * (a_x - c_x) ) - s_Th_y * (a_z - c_z);
		var d_y = s_Th_x * (c_Th_y * (a_z - c_z) + s_Th_y * (s_Th_z * (a_y - c_y) + c_Th_z * (a_x - c_x))) + c_Th_x * (c_Th_z * (a_y - c_y) - s_Th_z * (a_x - c_x));
		var d_z = c_Th_x * (c_Th_y * (a_z - c_z) + s_Th_y * (s_Th_z * (a_y - c_y) + c_Th_z * (a_x - c_x))) - s_Th_x * (c_Th_z * (a_y - c_y) - s_Th_z * (a_x - c_x));
		
		var d_x_rad = c_Th_y * (s_Th_z * (a_y_rad - c_y) + c_Th_z * (a_x - c_x) ) - s_Th_y * (a_z - c_z);
		var d_y_rad = s_Th_x * (c_Th_y * (a_z - c_z) + s_Th_y * (s_Th_z * (a_y_rad - c_y) + c_Th_z * (a_x - c_x))) + c_Th_x * (c_Th_z * (a_y_rad - c_y) - s_Th_z * (a_x - c_x));
		var d_z_rad = c_Th_x * (c_Th_y * (a_z - c_z) + s_Th_y * (s_Th_z * (a_y_rad - c_y) + c_Th_z * (a_x - c_x))) - s_Th_x * (c_Th_z * (a_y_rad - c_y) - s_Th_z * (a_x - c_x));
		
		var render_x = (d_x - e_x)*(e_z / d_z);
		var render_y = (d_y - e_y)*(e_z / d_z);
		
		var render_x_rad = (d_x_rad - e_x)*(e_z / d_z_rad);
		var render_y_rad = (d_y_rad - e_y)*(e_z / d_z_rad);
		
		//alert("(" + render_x + "," + render_y + ")");
		var render_radius = Math.sqrt((render_x - render_x_rad)*(render_x - render_x_rad) + (render_y - render_y_rad)*(render_y - render_y_rad));
		
		ball(ctx2, render_x + screen_half_width, render_y + screen_half_height, render_radius);
	}
}


// this will take the points in the points array
// and render them to the screen
function render1(){
	var ctx2 = document.getElementById('canvas2a').getContext('2d');
	ctx2.clearRect(0,0,screen_width, screen_height);
	// loop through all points
	for(i in points.points){
		// points.points[i].x 
		// points.points[i].y 
		// points.points[i].z 
		// points.points[i].radius
		
		var a_x = points.points[i].x
		var a_y = points.points[i].y
		var a_z = points.points[i].z
		var a_y_rad = points.points[i].y + points.points[i].radius
		
		var c1_Th_x = Math.cos(theta1_x);
		var c1_Th_y = Math.cos(theta1_y);
		var c1_Th_z = Math.cos(theta1_z);
		
		var s1_Th_x = Math.sin(theta1_x);
		var s1_Th_y = Math.sin(theta1_y);
		var s1_Th_z = Math.sin(theta1_z);
		
		var d_x = c1_Th_y * (s1_Th_z * (a_y - c1_y) + c1_Th_z * (a_x - c1_x) ) - s1_Th_y * (a_z - c1_z);
		var d_y = s1_Th_x * (c1_Th_y * (a_z - c1_z) + s1_Th_y * (s1_Th_z * (a_y - c1_y) + c1_Th_z * (a_x - c1_x))) + c1_Th_x * (c1_Th_z * (a_y - c1_y) - s1_Th_z * (a_x - c1_x));
		var d_z = c1_Th_x * (c1_Th_y * (a_z - c1_z) + s1_Th_y * (s1_Th_z * (a_y - c1_y) + c1_Th_z * (a_x - c1_x))) - s1_Th_x * (c1_Th_z * (a_y - c1_y) - s1_Th_z * (a_x - c1_x));
		
		var d_x_rad = c1_Th_y * (s1_Th_z * (a_y_rad - c1_y) + c1_Th_z * (a_x - c1_x) ) - s1_Th_y * (a_z - c1_z);
		var d_y_rad = s1_Th_x * (c1_Th_y * (a_z - c1_z) + s1_Th_y * (s1_Th_z * (a_y_rad - c1_y) + c1_Th_z * (a_x - c1_x))) + c1_Th_x * (c1_Th_z * (a_y_rad - c1_y) - s1_Th_z * (a_x - c1_x));
		var d_z_rad = c1_Th_x * (c1_Th_y * (a_z - c1_z) + s1_Th_y * (s1_Th_z * (a_y_rad - c1_y) + c1_Th_z * (a_x - c1_x))) - s1_Th_x * (c1_Th_z * (a_y_rad - c1_y) - s1_Th_z * (a_x - c1_x));
		
		var render_x = (d_x - e_x)*(e_z / d_z);
		var render_y = (d_y - e_y)*(e_z / d_z);
		
		var render_x_rad = (d_x_rad - e_x)*(e_z / d_z_rad);
		var render_y_rad = (d_y_rad - e_y)*(e_z / d_z_rad);
		
		//alert("(" + render_x + "," + render_y + ")");
		var render_radius = Math.sqrt((render_x - render_x_rad)*(render_x - render_x_rad) + (render_y - render_y_rad)*(render_y - render_y_rad));
		
		ball1(ctx2, render_x + screen_half_width, render_y + screen_half_height, render_radius);
	}
	
}

// this will take the points in the points array
// and render them to the screen as an orthographic projection
// wihth the size faked abit by scaling according to the z value. 
function fakeRender(){
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	ctx2.clearRect(0,0,screen_width, screen_height);
	// loop through all points
	for(i in points.points){
		// points.points[i].x 
		// points.points[i].y 
		// points.points[i].z 
		// points.points[i].radius
		var render_x = points.points[i].x + screen_half_width;
		var render_y = points.points[i].y + screen_half_height;
		var render_radius = points.points[i].radius * (0.9999 + (0.01 * points.points[i].z))
		//alert("x:" + render_x + ", y: " + render_y + ", rad: " + render_radius);
		orthoBall(ctx2, render_x, render_y, render_radius);
	}
}

// this will rotate the points around the y axis
function rotate(){
	for(i in points.points){
		// points.points[i].x 
		// points.points[i].y 
		// points.points[i].z 
		// points.points[i].radius
		var angle = 0.1;
		var xOld = points.points[i].x;
		var zOld = points.points[i].z;
		var xNew = xOld*Math.cos(angle) - zOld*Math.sin(angle) 
		var zNew = xOld*Math.sin(angle) + zOld*Math.cos(angle) 
		points.points[i].x = xNew;
		points.points[i].z = zNew;
	}
	render();
	render1();

	setTimeout(rotate, 100);	
}

$(document).ready(function() {
  rotate();
});

