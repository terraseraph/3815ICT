
/**
 * Cell class
 * @constructor Cell
 * 
 */
function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;

  this.mine = false;
  // this.marked = false;
  this.revealed = false;
  this.isFlag = false
  this.gameOver = false
  
  this.revealedCount = 0
  this.flagCount = 0
}

/** Renders the minefield every frame. */
Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
}

/** Count the neighbouring mines */
Cell.prototype.countMines = function() {
  if (this.mine) {
    this.neighborCount = -1;
    return;
  }
  var total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (neighbor.mine) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}

/** Checks to see if the mouse is within the cells bounds */
Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

/** reveals the cell */
Cell.prototype.reveal = function() {
  if(!this.revealed){
    game.revealedCount += 1
  }
  this.revealed = true;
  // console.log(game.correctFlagCount, game.revealedCount, game.totalCells)
  //should go in the Game class
  
  
  if (this.mine && !this.isFlag && !game.firstMousePress){
    this.gameOver = true
  }
  if (this.neighborCount == 0) {
    // flood fill time
    this.floodFill();
  }
}

/** Renders the flag */
Cell.prototype.flag = function(){
  if(this.isFlag){
        stroke(0);
        fill('red');
        rect(this.x, this.y, this.w, this.w);
  }
}

/** Places a flag */
Cell.prototype.makeFlag = function(){
      if(this.isFlag == true){
        this.isFlag = false
        // this.marked = false
        game.flagCount -= 1
        if(this.mine){
          console.log("correct, removing flag")
          game.correctFlagCount -= 1
        }
      }
      else{
        if(this.mine){
          console.log("correct flag")
          game.correctFlagCount += 1
        }
        this.isFlag = true
        // this.marked = true
        game.flagCount += 1
      }
}

/** Flood fill the surrounding solved cells */
Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = game.grid[i][j];
      // Note the neighbor.mine check was not required.
      // See issue #184
      if (!neighbor.revealed && !neighbor.isFlag) {
        neighbor.reveal();
      }
    }
  }
}

Cell.prototype.numberClick = function(){
  
}


/** Flood fill the solved mines */
Cell.prototype.revealSolved = function() {
  var neighbourFlags = 0
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      // Note the neighbor.mine check was not required.
      // See issue #184
      
      if(neighbor.isFlag){
          neighbourFlags += 1
        }
      }
    }
    
    ///after flag count loop
    for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;
      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= rows) continue;
        var neighbor = grid[i][j];
        if (!neighbor.revealed && neighbourFlags == this.neighborCount && !neighbor.isFlag) {
          neighbor.reveal();
        }
      }
    }
}

/** Check to see if a mine has been revealed */
Cell.prototype.gameOverCheck = function(){
  return this.gameOver
}
