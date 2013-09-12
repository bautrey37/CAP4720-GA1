//Global Variables
var canvas = null;
var gl = null;
var program = null;

<<<<<<< HEAD
function addMessage(message) {
	console.log(message);
}
=======
function main() {
	function addMessage(message) {
		console.log(message);
	}
	// helloo
	var canvas = null;
	var gl = null;
	var program = null;
>>>>>>> 662d2aaf27545190d26c5d9550407e0754287ea5

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
}

function main() {

	init();
	return 1;
}