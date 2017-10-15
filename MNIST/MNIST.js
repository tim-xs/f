var nn;
var training; 
var testing; 
var trainingIndex = 0;
var testingIndex = 0;
var epochs = 0;

var input_nodes = 784;
var hidden_nodes = 256;
var output_nodes = 10;

var learning_rate = 0.1;

var totalCorrect = 0;
var totalGuesses = 0;

var statusP;

var userPixels;
var smaller;
var ux = 16;
var uy = 100;
var uw = 140;

function preload() {
	training = loadStrings('data/mnist_test_1000.csv');
	testing = loadStrings('data/mnist_test_1000.csv');
}

function setup() {
	createCanvas(320,280);
	nn = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate);
	statusP = createP('');
	var pauseButton = createButton('pause');
	pauseButton.mousePressed(toggle);

	function toggle() {
		if (pauseButton.html() == 'pause') {
			noLoop();
			pauseButton.html('continue');
		} else {
			loop();
			pauseButton.html('pause');
		}
	}

	var clearButton = createButton('clear');
	clearButton.mousePressed(clearUserPixels);

	function clearUserPixels() {
		userPixels.background(0);
	}

	var saveButton = createButton('save model');
	saveButton.mousePressed(saveModelJSON);

	function saveModelJSON(){
		saveJSON(nn,'model.json');
	}

	userPixels = createGraphics(uw,uw);
	userPixels.background(0);

	smaller = createImage(28,28,RGB);
	var img = userPixels.get();
	smaller.copy(img,0,0,uw,0,0,smaller.width,smaller.height);
}

function mouseDragged() {
	if (mouseX > ux && mouseY > uy && mouseX < ux + uw && mouseY < uy+uw){
		userPixels.fill(255);
		userPixels.stroke(255);
		userPixels.ellipse(mouseX - ux, mouseY - uy, 16,16);
		var img = userPixels.get();
		smaller.copy(img, 0,0,uw,uw,0,0,smaller.width,smaller.heigth);
	}
}

function draw() {
	background(200);
	var traindata = train();
	var testdata = training();

	var testdata = result[0];
	var guess = result[1];
	var correct = result[2];

	drawImage(traindata, ux, 16, 2, 'training');
	drawImage(testdata, 180,16,2, 'test');

	fill(0);
	rect(246,16,2*28,2*28);

	if (correct) {
		fill(0,255,0);
	} else {
		fill(255,0,0);
	}
	textSize(60);
	text(guess, 258,64);

	if (correct) {
		totalCorrect++;
	}
	totalGuesses++;

	var status = 'performance: ' + nf(totalCorrect / totalGuesses, 0, 2);
  	status += '<br>';
	 // Percent correct since the sketch began
	var percent = 100 * trainingIndex / training.length;
	status += 'epochs: ' + epochs + ' (' + nf(percent, 1, 2) + '%)';
	statusP.html(status);

	image(userPixels,ux,uy);
	fill(0);
	textSize(12);
	text('draw here', ux, uy+uw +16);

	image(smaller, 180, uy,28*2, 28*2);
	var inputs = [];
	smaller.loadPixels();
	for (var i = 0; smaller.pixels.length; i +=4){
		
	}
}