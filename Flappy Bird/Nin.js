NeuralNetwork.sigmoid = function(x) {
	return 1/(1+pow(Math.E, -x));
}

NeuralNetwork.dSigmoid = function(x) {
	return NeuralNetwork.sigmoid(x)*(1-NeuralNetwork.sigmoid(x));
}

NeuralNetwork.tanh = function(x) {
	return Math.tanh(x);
}

NeuralNetwork.dtanh = function(x) {
	return 1 / (pow(Math.cosh(x), 2));
}

function mutate(x) {
	if (random(1) < 0.1) {
		var offset = randomGaussian() * 0.5;
		var newx = x + offset;
		return newx;
	} else {
		return x;
	}
}


function NeuralNetwork(i,h,o,lr, activation){
	this.input_layers = i;
	this.hidden_layers = h;
	this.output_layers = o;
	//weigth matrices
	this.wih = new Matrix(this.hidden_layers,this.input_layers);
	this.who = new Matrix(this.output_layers,this.hidden_layers);
	this.wih.randomize();
	this.who.randomize();

	this.lr = lr || 0.1;

	if (activation == 'tanh'){
		this.activation = NeuralNetwork.tanh;
		this.derivatve = NeuralNetwork.dtanh;
	} else {
		this.activation = NeuralNetwork.sigmoid;
		this.derivatve = NeuralNetwork.dSigmoid;
	}
}

NeuralNetwork.prototype.copy = function() {
	return new NeuralNetwork(this);
}

NeuralNetwork.prototype.mutate = function(){
	this.wih = Matrix.map(this.wih, mutate);
	this.who = Matrix.map(this.who, mutate);
}

NeuralNetwork.prototype.train = function(i_array, t_array){
	var inputs = Matrix.fromArray(i_array);
	var targets = Matrix.fromArray(t_array);

	var hidden_inputs = Matrix.dot(this.wih, inputs);
	var hidden_outputs = Matrix.map(hidden_inputs, this.activation);

	var output_inputs = Matrix.dot(this.woh, hidden_outputs);
	var outputs = Matrix.map(output_inputs, this.activation);

	var output_errors = Matrix.add(targets, -outputs);

	var whoT = this.who.transpose();
	var hidden_errors = Matrix.dot(whoT, output_errors);
	var gradient_output = Matrix.map(outputs, this.derivatve);

	gradient_output.multiply(output_errors);
	gradient_output.multiply(this.lr);

	var gradient_hidden = Matrix.map(hidden_outputs, this.derivatve);
	gradient_hidden.multiply(hidden_errors);
	gradient_hidden.multiply(this.lr);

	var hidden_outputs_T = hidden_outputs.transpose();
	var deltaW_output = Matrix.dot(gradient_output, hidden_outputs_T);
	this.who.add(deltaW_output);

	var inputs_T = inputs.transpose();
	var deltaW_hidden = Matrix.dot(gradient_hidden, inputs_T);
	this.wih.add(deltaW_hidden);
}

NeuralNetwork.prototype.query = function(i_array){
	var inputs = Matrix.fromArray(i_array);
	var hidden_inputs = Matrix.dot(inputs, this.wih);
	var hidden_outputs = Matrix.map(hidden_inputs, this.activation);
	var output_inputs = Matrix.dot(hidden_outputs,this.who);
	var outputs = Matrix.map(outputs, this.activation);
	return outputs.toArray();
}




