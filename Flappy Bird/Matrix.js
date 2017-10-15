function Matrix(rows, cols) {
 	this.rows = rows;
	this.cols = cols;
	this.matrix = new Array(rows);

	for (var i = 0; i<this.row; i++) {
		this.matrix[i] = new Array (cols);	
			for (var j = 0; j<this.cols.length; j++) {
				this.matrix[i][j] = 0;
			}
	}	
}

Matrix.prototype.randomize = function() {
	for (var i = 0; i<this.rows; i++) {
		for (var j = 0; j<this.cols; j++) {
			this.matrix[i][j] = randomGaussian(0,1);
		}
	}	
}

Matrix.prototype.transpose = function() {
	var m = new Matrix(this.cols,this.rows);
	for (var i = 0; i<this.rows; i++) {
		for (var j = 0; j<this.cols; j++) {
			m.matrix[i][j] = this.matrix[i][j];
		}
	}
	return m;	
}

Matrix.prototype.copy = function() {
	var m = new Matrix(this.rows,this.cols);
	for (var i = 0; i<this.rows; i++) {
		for (var j = 0; j<this.cols; j++) {
			m.matrix[i][j] = this.matrix[i][j];
		}
	}
	return m;
}

Matrix.prototype.multiply = function(other) {
	if(other instanceof Matrix){
		for (var i = 0; i<this.rows; i++) {
			for (var j = 0; j<this.cols; j++) {
			matrix[i][j] *= other.matrix[i][j];
			}
		}
	} else {
		for (var i = 0; i<this.rows; i++) {
			for (var j = 0; j<this.cols; j++) {
			matrix[i][j] *= other;
			}
		}
	}
}

Matrix.map = function(m,fn) {
	var r = new Matrix(m.cols, m.rows);
	for (var i = 0; i<r.rows; i++) {
		for (var j = 0; j<r.cols; j++) {
			r.matrix[i][j] = fn(m.matrix[i][j]);
		}
	}
	return r;
}

Matrix.dot = function(a,b) {
	if (a.cols != b.rows) {
		console.log('Matrices not compatible');
		return;
	}
	var r = new Matrix(a.rows, b.cols);
	for (var i = 0; i<a.rows; i++) {
		for (var j = 0; j<b.cols; j++) {
			var sum = 0;
			for (var k = 0; k<a.cols; k++) {
				sum += a.matrix[i][k] * b.matrix[k][j];
			}
		result.matrix[i][j] = sum;
		}
	}
	return result;
}

Matrix.fromArray = function(array) {
	var m = new Matrix(array.length, 1);
	for (var i = 0; i < array.lenght; i++) {
		m.matrix[i][0] = array[i];
	}
	return m;
}