
/**
 * MineCell class
 * @constructor MineCell
 * 
 */
class MineCell{
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
    this.textOffsetX = 0
    this.textOffsetY = 0
    
    this.mineOffsetX = 0
    this.mineOffsetY = 0
  }
  
    /** Renders the minefield every frame. */
    show() {
        stroke(0);
        noFill();
        this.makeShape()
        if (this.revealed) {
            if (this.mine) {
                fill(127);
                ellipse(this.x + this.mineOffsetX, this.y + this.mineOffsetY, this.w * 0.5);
            } 
            else {
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
  
  /** reveals the cell */
  reveal() {
    if(!this.revealed){
      game.revealedCount += 1
      console.log(this.neighbourCells)
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
  
  
}