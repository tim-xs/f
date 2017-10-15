function resetGame() {
	counter = 0;
	pipes = [];
}

function nextGenerations() {
	resetGame();
	normalizeFitness(allBirds);
	activeBirds = generate(allBirds);
	allBirds = activeBirds.slice();
}

function generate(oldBirds) {
	var newBirds = [];
	for (var i = 0; i < oldBirds.length; i++) {
		var bird = poolSelection(oldBirds);
		newBirds[i] = bird;
	}
	return newBirds;
}

function normalizeFitness() {
	var sum;
	for (var i = 0; i<birds.length; i++) {
		birds[i].score = pow(birds[i].score,2);
		sum += birds[i].score;
	}
	for (var i= 0; i< birds.length; i++) {
		birds[i].fitness = birds[i].score / sum;
	}
}

function poolSelection(birds) {
	var index; 
	var r = random(1);
	while (r > 0) {
    r -= birds[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return birds[index].copy();
}
	