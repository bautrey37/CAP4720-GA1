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

var modelObject = cubeObject;
function menuHandler(menu){
	if(menu.options[menu.selectedIndex].value == "skull"){
		modelObject = skullObject;
	}
	if(menu.options[menu.selectedIndex].value == "teapot"){
		modelObject = teapotObject;
	}
	if(menu.options[menu.selectedIndex].value == "cube"){
		modelObject = cubeObject;
	}
	main();
}

function main(){
	// global variables
	
	
	var canvas = null;

	var gl = null;
	var loopCount = 0;
	var N = [5,10,5]; // 0:x, 1:y, 2:z; dimensions
	
	
	canvas = document.getElementById("myCanvas");
	addMessage(((canvas)?"Canvas acquired":"Error: Can not acquire canvas"));
	
	gl = getWebGLContext(canvas);
	addMessage(((gl)?"Rendering context for WebGL acquired":"Error: Failed to get the rendering context for WebGL"));
	
	// dimensions, x - horizontal, y - vertical(height of of objects), z - depth
	// The itemLocations array stores how many models are in each square.
	var itemLocation = Array.matrix(N[0], N[2]);
	
	// The item array stores every model.
	var item = [];
	
	var angle = 0;
	var model = new RenderableModel(gl,modelObject);

	var modelbounds = model.getBounds();
	var modelHeight;
	if(modelObject == cubeObject){
		modelHeight = (modelbounds.max[1]-modelbounds.min[1])/2;
	}
	if(modelObject == skullObject){
		modelHeight = (modelbounds.max[1]-modelbounds.min[1])/500;
	}
	if(modelObject == teapotObject){
		modelHeight = (modelbounds.max[1]-modelbounds.min[1])/50;
	}

	
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
	    modelbounds.min[1]+N[0]*delta,
		modelbounds.min[2]+N[0]*delta
	];
	
	var camera = new Camera(gl,sceneBounds,[0,1,0]);
	var projMatrix = camera.getProjMatrix();
	
	function draw(){
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		var viewMatrix = camera.getRotatedViewMatrix(angle);
		var modelMatrix = new Matrix4();
		
		// Create a new model every ten loops.
		if (loopCount == 10) {
			loopCount = 0;
			
			// Get random x and z value for new model position.
			var x = Math.floor(Math.random() * N[0]);
			var z = Math.floor(Math.random() * N[2]);

			// Create new model object instance and set its coordinates.
			var newModel = new Model();
			newModel.xCoor = x;
			newModel.zCoor = z;
			newModel.yCoor = modelHeight * 11; // The height of this new model is out of view of the camera.
			if(modelObject == teapotObject){
			//Teapots fall from a different height because the
			//usual height is too small.
				newModel.yCoor = modelHeight * 29;
			}
			//console.log(newModel.yCoor);
			//console.log(itemLocation[x][z]);
			newModel.dropLocation = modelHeight * itemLocation[x][z];
			itemLocation[x][z]++;
			
			// Add this new model to array of all models.
			item.push(newModel);			
		}
		else {
			// Don't create a new model at this loop iteration.
			loopCount++;
		}

		// Draw every existing model where necessary.
		for (var i=0; i<item.length; i++) {
			// Check if model's height will change.
			if (item[i].yCoor > item[i].dropLocation) {
				// Decrease the height by a factor of 10.
				item[i].yCoor -= modelHeight/3;
			}
			
			// Translate the model matrix as necessary.
			modelMatrix.setTranslate(item[i].xCoor * delta, item[i].yCoor * delta, item[i].zCoor * delta);
			
			// Draw it
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

function Model() {
	var xCoor, yCoor, zCoor, dropLocation;
}
