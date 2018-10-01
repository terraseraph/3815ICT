
/**
 * Cell class
 * @constructor Cell
 * 
 */
class HexCell{
  constructor(i, j, w){
    this.i = i;
    this.j = j;
    this.x = (i * w);
    this.y = (j * w);
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
    this.xOffset = w / 2;
    this.yOffset = w;
    
    this.textOffsetX = this.xOffset
    this.textOffsetY = this.w / 4
    this.poly = []
  }
  
    
  polygon(x, y, radius, npoints){
        var angle = TWO_PI / npoints;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
  
  generatePoints(){
  
      if(this.j % 2 === 0) {
          this.x = this.i * this.w + this.xOffset;
      } else {
          this.x = this.i * this.w;
      }
      
      this.y = this.j * this.w + this.yOffset;


      this.north  = [this.x + this.xOffset, this.y - (this.w /2)]
      this.northE = [this.x + this.xOffset + (this.w /2), this.y - ( this.w / 8)]
      this.southE = [this.x + this.xOffset + (this.w /2), this.y + ( this.w / 8)]
      this.south  = [this.x + this.xOffset, this.y + ( this.w / 2)]
      this.southW = [this.x + this.xOffset - (this.w /2), this.y + ( this.w / 8)]
      this.northW = [this.x + this.xOffset - (this.w /2), this.y - ( this.w / 8)]
      this.poly = [this.north, this.northE, this.southE,this.south,this.southW, this.northW]
  }
    
  makeShape(){
          push();
          translate(this.x + this.xOffset, this.y);
          this.generatePoints()
          rotate(radians(30));
          this.polygon(0, 0, this.w / 2, 6);
          pop();
    }
  
  /** Renders the minefield every frame. */
  show() {
    stroke(0);
    noFill();
    // rect(this.x, this.y, this.w, this.w);
    this.makeShape()
    if (this.revealed) {
      if (this.mine) {
        fill(127);
        ellipse(this.x + this.textOffsetX, this.y, this.w * 0.5);
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
  };
  
  
  
  /** Checks to see if the mouse is within the cells bounds */
  contains(x, y){
      return (this.inside([x,y], this.poly))
  }
  
  
  inside(point, vs) {
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
  
  countMines(){
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
  
  
  floodFill(){
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
  
  
  revealSolved(){
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
  
    
  
}
