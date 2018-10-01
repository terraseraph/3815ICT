
/**
 * HexCell class
 * @constructor HexCell
 * 
 */
class HexCell extends MineCell{
  constructor(i, j, w, grid){
    super(i,j,w)
    this.xOffset = this.w / 2;
    this.yOffset = this.w;
    
    this.textOffsetX = this.xOffset
    this.textOffsetY = this.w / 4
    this.mineOffsetX = this.xOffset
    this.poly = []
    this.neighbourCells = []
    this.grid = grid
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

  countMines(){
     var total = 0;
     //check even and odd rows
      if(this.j % 2 == 0){
        try{ this.neighbourCells.push(this.grid[this.i+1][this.j-1])}catch(e){}
        try{ this.neighbourCells.push(this.grid[this.i+1][this.j+1])}catch(e){}
      }
      else{
        try{ this.neighbourCells.push(this.grid[this.i-1][this.j-1])}catch(e){}
        try{ this.neighbourCells.push(this.grid[this.i-1][this.j+1])}catch(e){}
      }
      
      try{ this.neighbourCells.push(this.grid[this.i-1][this.j])}catch(e){}
      try{ this.neighbourCells.push(this.grid[this.i+1][this.j])}catch(e){}
      try{ this.neighbourCells.push(this.grid[this.i][this.j+1])}catch(e){}
      try{ this.neighbourCells.push(this.grid[this.i][this.j-1])}catch(e){console.log(e)}
  
      for(var iOff = 0; iOff <= this.neighbourCells.length;iOff++){
        if (this.neighbourCells[iOff]!= undefined && this.neighbourCells[iOff].mine) {
          total++;
        }
      }
        this.neighborCount = total;
  }
  
}
