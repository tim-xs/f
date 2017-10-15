function Pipe() {
	var spacing = random(120,height/2);
	var centery = random(spacing, height -spacing);

	this.top = centery - spacing/2;
	this.bottom = height - (centery + spacing /2);
	this.x = width;
	this.w = 50;
	this.speed = 4;
}

Pipe.prototype.hits = function(bird) {
    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
}

Pipe.prototype.show = function() {
	stroke(255);
	fill(200);
	rect(this.x,0, this.w, this.top);
	rect(this.x, height - this.bottom, this.w, this.bottom);
}

Pipe.prototype.offscreen = function() {
	if (this.x < -this.width){
		return true;
	} else {
		return false;
	}
}

Pipe.prototype.update = function() {
	this.x -= 10;
}




