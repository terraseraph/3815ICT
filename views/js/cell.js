
/**
 * Cell class
 * @constructor Cell
 * 
 */
class Cell {
  constructor(i, j, w){
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.mine = false;
    this.revealed = false;
    this.isFlag = false
    this.gameOver = false
    this.neighborFlags = 0
    this.neighbourCells = []
    
    this.revealedCount = 0
    this.flagCount = 0
    
    this.textOffsetX = (this.w * 0.5 )
    this.textOffsetY = (this.w - 6)

  }

  makeShape(){
        rect(this.x, this.y, this.w, this.w);
    }
  
  /** Renders the minefield every frame. */
  show() {
    stroke(0);
    noFill();
    this.makeShape()
    if (this.revealed) {
      if (this.mine) {
        fill(127);
        ellipse(this.x + this.textOffsetX, this.y + this.textOffsetY, this.w * 0.5);
      } else {
        fill(200);
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
  contains(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
  }
  
  /** reveals the cell */
  reveal() {
    if(!this.revealed){
      game.revealedCount += 1
    }
    this.revealed = true;
    
    if (this.mine && !this.isFlag && !game.firstMousePress){
      this.gameOver = true
    }
    if (this.neighborCount == 0) {
        this.floodFill();
    }
  }
  
  /** Renders the flag */
  flag(){
    if(this.isFlag){
          stroke(0);
          fill('red');
          this.makeShape()
    }
  }
  
  /** Places a flag */
  makeFlag(){
        if(this.isFlag == true){
          this.isFlag = false
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
          game.flagCount += 1
        }
  }
  
  /** Count the neighbouring mines */
  countMines() {
    if (this.mine) {
      this.neighborCount = 1;
      return;
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
        this.neighbourCells.push(neighbor)
        if (neighbor.mine) {
          total++;
        }
      }
    }
    this.neighborCount = total;
  }
  
  
  
  
  /** Flood fill the surrounding solved cells */
  floodFill() {
    for(var i = 0; i < this.neighbourCells.length; i++){
      var neighbor = this.neighbourCells[i];
      if(neighbor != undefined){
        if (!neighbor.revealed && !neighbor.isFlag) {
          neighbor.reveal();
        }
      }
    } 
  }
  
  
  /** Flood fill the solved mines */
  revealSolved() {
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
  gameOverCheck(){
    return this.gameOver
  }
  
  
  
  sqLoop(fn){
      var total
      // var neighbourFlags
      for (var xoff = -1; xoff <= 1;xoff++ ) {
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
}
