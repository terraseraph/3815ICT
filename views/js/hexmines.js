var w = 10;
    var cols, rows, value, index;
 
class HexMines {
    constructor(width, height, mines){
        this.width = width
        this.height = height
        this.mines = mines
        this.type = 'hex'
        this.cellWidth = 10
        this.grid = [];
        this.xOffset = 5;
        this.yOffset = 5;
        this.cellSize = 10
        this.cols = Math.floor(this.width / this.cellWidth);
        this.rows = Math.floor(this.height / this.cellWidth);
        this.grid = this.make2DArray(this.cols, this.rows);
        // createCanvas(width, height)
        
                this.revealedCount = 0
        this.flagCount = 0
        this.correctFlagCount = 0
    }
    
    make2DArray(cols, rows) {
      var arr = new Array(cols);
      for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    }
    
    makeCells(){
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.grid[i][j] = new HCell(i, j, this.cellWidth);
        }
      }
    }
    
    
    renderHex(){
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length;j++) {
                grid[i][j].show();
            }
        }
    }
        
        
    leftClick(){
        var replaceMine = undefined;
        console.log(this.firstMousePress)
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
              if (this.grid[i][j].contains(mouseX, mouseY) && !this.grid[i][j].isFlag) {
                this.grid[i][j].reveal();
                if (this.grid[i][j].mine) {
                  if (this.firstMousePress) {
                    this.grid[i][j].mine = false;
                    //Pick a replacement mine
                    while (!replaceMine) {
                      var c = floor(random(this.cols));
                      var r = floor(random(this.rows));
            
                      if (!grid[c][r].mine) {
                        grid[c][r].mine = true;
                        replaceMine = grid[c][r];
                      }
                    }
                  } else {
                    noLoop();
                    this.gameOver();
                  }
                }
              }
            }
        }
        if (this.firstMousePress) { timer_start(); this.firstMousePress ^= true}
        this.firstMousePress = false;
    }
    
    rightClick(){
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
              if (this.grid[i][j].contains(mouseX, mouseY) && !this.grid[i][j].revealed) {
                this.grid[i][j].makeFlag();
              }
            }
        }
    }
    
    
}

//REFACTOR THIS GARBAGE
function HCell(i, j, cellSize) {
    this.i = i;
    this.j = j;
    this.xOffset = 5;
    this.yOffset = 5;
    this.mine = false;
    // this.marked = false;
    this.revealed = false;
    this.isFlag = false
    this.gameOver = false
    
    this.revealedCount = 0
    this.flagCount = 0    

    if(j % 2 === 0) {
        this.x = this.i * cellSize * 2 + this.xOffset;
    } else {
        this.x = this.i * cellSize * 2 + cellSize + this.xOffset;
    }
    
    this.y = this.j * cellSize * 1.7 + this.yOffset;
    this.hasPlayer = false;

    this.show = function () {
        stroke(255, 255, 255, 50)
        fill(0, 114, 183);
 
        push(); 
        translate(this.x, this.y);
        rotate(radians(30));
        this.polygon(0, 0, cellSize, 6);
        pop();
    }
    /** Checks to see if the mouse is within the cells bounds */
    this.contains = function(x, y) {
      return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
    
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
}
/** reveals the cell */
HCell.prototype.reveal = function() {
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
