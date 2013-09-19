//Computer Graphics Assignment 1


function main(){
	// global variables
	var modelObject = cubeObject;
	var canvas = null;
	var gl = null;
	var loopCount = 0;
	
	canvas = document.getElementById("myCanvas");
	addMessage(((canvas)?"Canvas acquired":"Error: Can not acquire canvas"));
	
	gl = getWebGLContext(canvas);
	addMessage(((gl)?"Rendering context for WebGL acquired":"Error: Failed to get the rendering context for WebGL"));
	
	//dimensions, x - horizontal, y - vertical(height of of objects), z - depth
	// The itemLocations array stores how many models are in each square.
	var itemLocation = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
				 [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
				 
	// The item array stores every model.
	var item = [];
	
	var angle = 0;
	var model = new RenderableModel(gl,modelObject);

	var modelbounds = model.getBounds();
	var modelHeight = modelbounds.max[1]-modelbounds.min[1];
	
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
		modelbounds.min[0]+10*delta,
	    modelbounds.min[1]+10*delta,
		modelbounds.min[2]+10*delta
	];
	
	var camera = new Camera(gl,sceneBounds,[0,1,0]);
	var projMatrix = camera.getProjMatrix();
	
	function draw(){
		gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		var viewMatrix = camera.getRotatedViewMatrix(angle);
		var modelMatrix=new Matrix4();
		
		// Create a new model every ten loops.
		if (loopCount == 10) {
			loopCount = 0;
			
			// Get random x and z value for new model position.
			var x = Math.floor(Math.random() * 10);
			var z = Math.floor(Math.random() * 10);

			// Create new model object instance and set its coordinates.
			var newModel = new Model();
			newModel.xCoor = x;
			newModel.zCoor = z;
			newModel.yCoor = modelHeight * 11; // The height of this new model is out of view of the camera.
			//console.log(newModel.yCoor);
			//console.log(itemLocation[x][z]);
			itemLocation[x][z]++;
			
			// Add this new model to array of all models.
			item.push(newModel);
			
		//	console.log(item[0].xCoor);
			
		}
		else {
			// Don't create a new model at this loop iteration.
			loopCount++;
		}

		// Draw every existing model where necessary.
		for (var i=0; i<item.length; i++) {
			// Check if model's height will change.
			if (item[i].yCoor > modelHeight * itemLocation[item[i].xCoor][item[i].zCoor]) {
				// Decrease the height by a factor of 10.
				item[i].yCoor -= modelHeight/10;
			}
			
			// Translate the model matrix as necessary.
			modelMatrix.setTranslate(item[i].xCoor * delta, item[i].yCoor * delta, item[i].zCoor * delta);
			
			// Draw it
			model.draw(projMatrix, viewMatrix, modelMatrix);
		
		}
		
		//for (var z=0; z<N[2]; z++)
			//for (var y=0; y<N[1]; y++)
				//for (var x=0; x<N[0]; x++){
					//modelMatrix.setTranslate(xCoor*delta, yCoor*delta, zCoor*delta)
					           //.translate(center[0],center[1],center[2])
							   //.rotate(angle*(x+y+z),0,1,1)
							   //.translate(-center[0],-center[1],-center[2]);
							//model.draw(projMatrix, viewMatrix, modelMatrix);
				//}
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
	var xCoor, yCoor, zCoor;
}
