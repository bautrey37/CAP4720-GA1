//Computer Graphics Assignment 1

// creates a 2-D array of size [m][n] and initializes each value to 0
Array.matrix = function(m, n) {
	// m - number of rows, n - number of columns
	var mat = [], i, j, a;
	for(i = 0; i < m; i++) {
		a = [];
		for(j = 0; j < n; j++) {
			a[j] = 0;
		}
		mat[i] = a;
	}
	return mat;
}

function main(){
	// global variables
	var modelObject = teapotObject;
	var canvas = null;
	var gl = null;
	
	canvas = document.getElementById("myCanvas");
	addMessage(((canvas)?"Canvas acquired":"Error: Can not acquire canvas"));
	
	gl = getWebGLContext(canvas);
	addMessage(((gl)?"Rendering context for WebGL acquired":"Error: Failed to get the rendering context for WebGL"));
	
	N = [2,4,2]; //dimensions, x - horizontal, y - vertical(height of cube of objects), z - depth
	var myArray = Array.matrix(10,10); //creates and initializes [m,n] array to 0
	
	var angle = 0;
	var model = new RenderableModel(gl,modelObject);

	var modelbounds = model.getBounds();

	var delta = Math.max(
	    modelbounds.max[0]-modelbounds.min[0],
	    modelbounds.max[1]-modelbounds.min[1],
		modelbounds.max[2]-modelbounds.min[2]
	);
		
	var center = [
	    0.5*(modelbounds.max[0]+modelbounds.min[0]),
	    0.5*(modelbounds.max[1]+modelbounds.min[1]),
		0.5*(modelbounds.max[2]+modelbounds.min[2])
	];
	
	var sceneBounds = {};
	sceneBounds.min = [modelbounds.min[0],modelbounds.min[1],modelbounds.min[2]]; // clone
	sceneBounds.max = [
		modelbounds.min[0]+N[0]*delta,
	    modelbounds.min[1]+N[1]*delta,
		modelbounds.min[2]+N[2]*delta
	];
	
	var camera = new Camera(gl,sceneBounds,[0,1,0]);
	var projMatrix = camera.getProjMatrix();
	
	function draw(){
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		var viewMatrix = camera.getRotatedViewMatrix(angle);
		var modelMatrix=new Matrix4();
		
		var x = Math.floor(Math.random() * N[0]);
		var y = Math.floor(Math.random() * N[2]);
		myArray[x][y] += 1; //increments array value
		console.log('x: ' + x + ', y: ' + y);
		
		for (var z=0; z<N[2]; z++)
			for (var y=0; y<N[1]; y++)
				for (var x=0; x<N[0]; x++){
					modelMatrix.setTranslate(x*delta, y*delta, z*delta)
					           .translate(center[0],center[1],center[2])
							   .rotate(angle*(x+y+z),0,1,1)
							   .translate(-center[0],-center[1],-center[2]);
					model.draw(projMatrix, viewMatrix, modelMatrix);
				}
		angle++; if (angle > 360) angle -= 360;
		animateID = window.requestAnimationFrame(draw);
	}

	gl.clearColor(0,0,0,1);
	gl.enable(gl.DEPTH_TEST);

	var animateID;
	
	draw();
	return 1;
}

