
/**
 * ColourCell class Extends MineCell
 * @constructor ColourCell
 * 
 */
class ColourCell extends MineCell {
  constructor(i, j, w, grid, cols, rows){
    super(i,j,w)
    this.textOffsetX = (this.w * 0.5 )
    this.textOffsetY = (this.w - 6)
    this.mineOffsetY = this.w * 0.5
    this.mineOffsetX = this.w * 0.5
    this.cols = cols
    this.rows = rows
    this.grid = grid
    console.log("Colour cell!!!")
    this.colour;
  }

  /** Makes the cell shape */
  makeShape(){
        rect(this.x, this.y, this.w, this.w);
    }

  
  /** Checks to see if the mouse is within the cells bounds */
  contains(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
  }

  
  /** Count the neighbouring mines */
  countMines() {
    try{ this.neighbourCells.push(this.grid[this.i][this.j+1])}catch(e){} //north
    try{ this.neighbourCells.push(this.grid[this.i][this.j-1])}catch(e){} //south
    try{ this.neighbourCells.push(this.grid[this.i+1][this.j])}catch(e){} //east
    try{ this.neighbourCells.push(this.grid[this.i-1][this.j])}catch(e){} //west
  }
  
  
      /** Renders the minefield every frame. */
  show() {
      stroke(0);
      noFill();
      this.makeShape()
      if (this.revealed) {
        var c = color(this.colour)
        // console.log(this.colour)
        fill(c);
        this.makeShape()
      }
  }
  
  /** Reveal the coloured cell */
  reveal(){
      this.revealed = true;
        console.log(this.neighbourCells)
    for(var i = 0 ; i < 6;i++){
      if(this.neighbourCells[i].colour == this.colour && this.neighbourCells[i].revealed){
        this.gameOver = true
      }
    }
  }
  
  /** Override the make flag */
  makeFlag(){
    return
  }
  
  /** Override floodfill */
  floodFill(){
    return
  }
  
  /** Override revealSolved */
  revealSolved(){
    return
  }

}