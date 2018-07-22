// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E
function Game(){
  this.revealedCount = 0
  this.flagCount = 0
}
var game  = new Game()


function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;

  this.mine = false;
  this.marked = false;
  this.revealed = false;
  this.isFlag = false
  this.gameOver = false
  
  this.revealedCount = 0
  this.flagCount = 0
}

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

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
  if(this.revealed){
    var alreadyRev = true
  }
  this.revealed = true;
  if(!alreadyRev){
    game.revealedCount += 1
  }
  console.log(game.flagCount, game.revealedCount)
  //should go in the Game class
  
  
  if (this.mine && !this.isFlag){
    this.gameOver = true
  }
  if (this.neighborCount == 0) {
    // flood fill time
    this.floodFill();
  }
}


Cell.prototype.flag = function(){
  if(this.isFlag){
        stroke(0);
        fill('red');
        rect(this.x, this.y, this.w, this.w);
  }
}

Cell.prototype.makeFlag = function(){
      if(this.isFlag == true){
        this.isFlag = false
        this.marked = false
        game.flagCount -= 1
        console.log(game.flagCount, game.revealedCount)
      }
      else{
        this.isFlag = true
        this.marked = true
        game.flagCount += 1
        console.log(game.flagCount, game.revealedCount)
      }
}


Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
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
        if (!neighbor.revealed && neighbourFlags == this.neighborCount) {
          neighbor.reveal();
        }
      }
    }
}

Cell.prototype.gameOverCheck = function(){
  return this.gameOver
}