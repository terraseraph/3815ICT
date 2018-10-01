
/**
 * ClassicCell class
 * @constructor ClassicCell
 * 
 */
class ClassicCell extends MineCell {
  constructor(i, j, w){
    super(i,j,w)
    this.textOffsetX = (this.w * 0.5 )
    this.textOffsetY = (this.w - 6)

  }

  makeShape(){
        rect(this.x, this.y, this.w, this.w);
    }

  
  /** Checks to see if the mouse is within the cells bounds */
  contains(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
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

}
