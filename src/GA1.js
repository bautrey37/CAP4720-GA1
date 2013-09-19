//Global Variables
var canvas = null;
var gl = null;
var program = null;
var modelObject = cubeObject;
var myArray;

function init() {
	// Retrieve <canvas> element
	canvas = document.getElementById('myCanvas'); 
	addMessage(((canvas)?"Canvas acquired":"Error: No Canvas with id myCanvas could be located"));
	
	// Get the rendering context for WebGL
	gl = getWebGLContext(canvas);
	addMessage(((gl)?"Rendering context for WebGL acquired":"Error: Failed to get the rendering context for WebGL"));

	//Vertex shader program
	var VSHADER_SOURCE = 
		'attribute vec3 position;\n' +
		'attribute vec3 color;\n' +
		'varying vec3 fcolor;\n' + 
		'uniform mat4 modelT;\n' +
		'void main() {\n' + 
		' gl_Position = modelT*vec4(position,1.0);\n' + 
		' fcolor = color;\n' +
		'}\n';
	
	//Fragment shader program
	var FSHADER_SOURCE = 
		'varying lowp vec3 fcolor;\n' + 
		'void main() {\n' + 
		' gl_FragColor = vec4(fcolor, 1.0);\n' + 
		'}\n';
	
	//Create the program from the shader code
	program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	addMessage(((program)?"Shader Program was successfully created":"Error: Failed to create program"));
	
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
	
	//create a 2D matrix
	myArray = Array.matrix(10,10);
	
	
}





function main() {

	init();
	
	function draw() {

	}
	
	
	return 1;
}