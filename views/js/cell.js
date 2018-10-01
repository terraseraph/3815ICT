
/**
 * Cell class
 * @constructor Cell
 * 
 */
function Cell(i, j, w, hex = false) {
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
  this.neighborFlags = 0
  this.neighbourCells = []
  
  this.revealedCount = 0
  this.flagCount = 0
  this.hex = hex
  this.xOffset = w / 2;
  this.yOffset = w;
  
  this.textOffsetX = (this.w * 0.5 )
  this.textOffsetY = (this.w - 6)
  
  this.poly = []
  
    this.polygon = function(x, y, radius, npoints){
      var angle = TWO_PI / npoints;
      beginShape();
      for (var a = 0; a < TWO_PI; a += angle) {
          var sx = x + cos(a) * radius;
          var sy = y + sin(a) * radius;
          vertex(sx, sy);
      }
      endShape(CLOSE);
  }
  
  if(this.hex){
    this.textOffsetX = 0
    this.textOffsetY = 0
    if(this.j % 2 === 0) {
        this.x = this.i * this.w + this.xOffset;
    } else {
        this.x = this.i * this.w;
    }
    
    this.y = this.j * this.w + this.yOffset;
    // this.w = this.w /2
    this.north  = [this.x, this.y + (this.w /4)]
    this.northE = [this.x + (this.w /4), this.y + ( this.w / 8)]
    this.southE = [this.x + (this.w /4), this.y - ( this.w / 8)]
    this.south  = [this.x, this.y - ( this.w / 4)]
    this.southW = [this.x - (this.w /4), this.y - ( this.w / 8)]
    this.northW = [this.x - (this.w /4), this.y + ( this.w / 8)]
    
    this.poly = [this.north, this.northE, this.southE,this.south,this.southW, this.northW]

  }
  
  this.makeShape = function(){
    if(this.hex){
        push();
        translate(this.x, this.y);
        rotate(radians(30));
        this.polygon(0, 0, this.w / 2, 6);
        pop();
    }
    else{
      rect(this.x, this.y, this.w, this.w);
    }
  }
}

/** Renders the minefield every frame. */
Cell.prototype.show = function() {
  stroke(0);
  noFill();
  // rect(this.x, this.y, this.w, this.w);
  this.makeShape()
  if (this.revealed) {
    if (this.mine) {
      fill(127);
      ellipse(this.x + this.textOffsetX, this.y + this.textOffsetY, this.w * 0.5);
    } else {
      fill(200);
      // rect(this.x, this.y, this.w, this.w);
      this.makeShape()
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.textOffsetX, this.y + this.textOffsetY);
      }
    }
  }
}



/** Checks to see if the mouse is within the cells bounds */
Cell.prototype.contains = function(x, y) {
  if(this.hex){
    
    // var poly = []
    // console.log(this.poly)
    return (inside([x,y], this.poly))
  }
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}


function inside(point, vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

/** reveals the cell */
Cell.prototype.reveal = function() {
  if(!this.revealed){
    game.revealedCount += 1
  }
  this.revealed = true;
  
  if (this.mine && !this.isFlag && !game.firstMousePress){
    this.gameOver = true
  }
  if (this.neighborCount == 0) {
    if(this.hex){
      this.hexFloodFill()
    }
    else{
      this.floodFill();
    }
  }
}

/** Renders the flag */
Cell.prototype.flag = function(){
  if(this.isFlag){
        stroke(0);
        fill('red');
        this.makeShape()
          // rect(this.x, this.y, this.w, this.w);
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

Cell.prototype.hexCountMines = function(){
   var total = 0;
   //check even and odd rows
    if(this.j % 2 == 0){
      try{ this.neighbourCells.push(grid[this.i+1][this.j-1])}catch(e){console.log(e)}
      try{ this.neighbourCells.push(grid[this.i+1][this.j+1])}catch(e){console.log(e)}
    }
    else{
      try{ this.neighbourCells.push(grid[this.i-1][this.j-1])}catch(e){console.log(e)}
      try{ this.neighbourCells.push(grid[this.i-1][this.j+1])}catch(e){console.log(e)}
    }
    
    try{ this.neighbourCells.push(grid[this.i-1][this.j])}catch(e){console.log(e)}
    try{ this.neighbourCells.push(grid[this.i+1][this.j])}catch(e){console.log(e)}
    try{ this.neighbourCells.push(grid[this.i][this.j+1])}catch(e){console.log(e)}
    try{ this.neighbourCells.push(grid[this.i][this.j-1])}catch(e){console.log(e)}

    console.log(this.neighbourCells, this.i, this.j)
    for(var iOff = 0; iOff <= this.neighbourCells.length;iOff++){
      if (this.neighbourCells[iOff]!= undefined && this.neighbourCells[iOff].mine) {
        total++;
      }
    }
      this.neighborCount = total;
}

/** Count the neighbouring mines */
Cell.prototype.countMines = function() {
  if (this.mine) {
    this.neighborCount = 1;
    return;
  }
  if(this.hex){
    this.hexCountMines()
    return
  } 

  var total = 0;
  for (var xoff = -1; xoff <= 1;xoff++ ) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;
// 
      var neighbor = grid[i][j];
      this.neighbourCells.push(grid[i][j])
      if (neighbor.mine) {
        total++;
      }
    }
  }
  this.neighborCount = total;
}




/** Flood fill the surrounding solved cells */
Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1;xoff++) {

    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      if (!neighbor.revealed && !neighbor.isFlag) {
        neighbor.reveal();
      }
    }
  }
  // this.sqLoop('floodFill')
}

Cell.prototype.hexFloodFill = function(){
  for(var i = 0; i < this.neighbourCells.length; i++){
    var neighbor = this.neighbourCells[i];
    if(neighbor != undefined){
      if (!neighbor.revealed && !neighbor.isFlag) {
        console.log(neighbor)
        neighbor.reveal();
      }
    }
  } 
}

/** Flood fill the solved mines */
Cell.prototype.revealSolved = function() {
  var neighbourFlags = 0
  for (var xoff = -1; xoff <= 1; xoff++) {
    // if(this.hex){
    //   if(xoff == 1) xoff++
    // }    
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      
      if(neighbor.isFlag){
          neighbourFlags += 1
        }
      }

    }
    // this.sqLoop('revealSolved')
    ///after flag count loop
    for (var xoff = -1; xoff <= 1;xoff++ ) {
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
    // this.sqLoop('afterFlag')    
}


Cell.prototype.hexRevealSolved = function(){
  var neighbourFlags = 0  
  for(var i = 0; i < this.neighbourCells.length; i++){
    var neighbor = this.neighbourCells[i];
    if(neighbor != undefined){
      if(neighbor.isFlag){
          neighbourFlags += 1
      }
    }
  }
  for(var i = 0; i < this.neighbourCells.length; i++){
    var neighbor = this.neighbourCells[i];
    if(neighbor != undefined){
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



Cell.prototype.sqLoop = function(fn){
    var total
    // var neighbourFlags
    for (var xoff = -1; xoff <= 1;xoff++ ) {
      if(this.hex){
        if(xoff == 1) xoff++
      }
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;
  
      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= rows) continue;
  
        var neighbor = grid[i][j];
        switch (fn) {
          case 'neighbours':
            if (neighbor.mine) {
              total++;
            }
          case 'floodFill':
            if (!neighbor.revealed && !neighbor.isFlag) {
              neighbor.reveal();
            }          
            break;
          case 'revealSolved':
            if(neighbor.isFlag){
                this.neighbourFlags += 1
              }          
          case 'afterFlag':
            if (!neighbor.revealed && this.neighbourFlags == this.neighborCount && !neighbor.isFlag) {
              neighbor.reveal();
            }          
        }
      }
    }
    if(fn == 'neighbors') this.neighborCount = total;
}
