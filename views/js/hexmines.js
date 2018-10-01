var w = 10;
    var cols, rows, value, index;
 
class HexMines {
    constructor(width, height, mines){
        this.width = width
        this.height = height
        this.mines = mines
        this.type = 'hex'
        this.cellWidth = 20
        this.grid = [];
        this.xOffset = 5;
        this.yOffset = 5;
        this.cellSize = 20
        this.cols = Math.floor(this.width / this.cellWidth);
        this.rows = Math.floor(this.height / this.cellWidth);
        this.grid = this.make2DArray(this.cols, this.rows);
        // createCanvas(width, height)
        this.revealedCount = 0
        this.flagCount = 0
        this.correctFlagCount = 0
        
        //edits for new hex type
        this.map_size = 8
        this.hex_size = 20
        this.origin = createVector(this.width/2, this.height/2);
        this.padding = 0
        this.intersections = []
        this.epsilon = this.padding + 1;
        this.hexGrid = this.make2DArray(22,15)
    }
    
    make2DArray(cols, rows) {
      var arr = new Array(cols);
      for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
      }
      return arr;
    }
    
    createCells(){
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.grid[i][j] = new Cell(i, j, this.cellWidth, true);
        }
      }
      console.log(this.grid)
    }

    placeMines(){
      console.log("Placing mines....")
      // Pick totalmines spots
      var options = [];
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          options.push([i, j]);
        }
      }
    
      //make mines in random places
      for (var n = 0; n < this.mines; n++) {
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        // Deletes that spot so it's no longer an option
        options.splice(index, 1);
        this.grid[i][j].mine = true;
      }
    
    
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          this.grid[i][j].countMines();
        }
      }
    }    
    
    
    renderHex(){
        for(var i = 0; i < grid.length; i++) {
            for(var j = 0; j < grid[i].length;j++) {
                grid[i][j].show();
                grid[i][j].flag();
                if (grid[i][j].gameOver){
                    this.gameOver()
                }                
            }
        }
    }
    
    
    gameOver(){
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                grid[i][j].revealed = true;
            }
        }
        timer_stop()
    }
    
    gameWin(){
        console.log('WIN!')
        timer_stop()
        time_now = $('#timer').text()
        console.log(time_now)
        $('#your_score').html(`Your Score ${time_now}`)
        $('#modal-').modal("show")
    }
    
    checkState(){
        if ((this.correctFlagCount + this.revealedCount) == this.totalCells){
            noLoop();
            timer_stop()
            this.gameWin()
        }
    }    
        
        
    leftClick(){
        var replaceMine = undefined;
        console.log(this.firstMousePress)
        // console.log(this.grid[i][j].poly)
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
              if (this.grid[i][j].contains(mouseX, mouseY) && !this.grid[i][j].isFlag) {
                  console.log(mouseX, mouseY)
                  console.log(this.grid[i][j])
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
    
    /** Double click to reveal solved cells */
    doubleClicked() {
      console.log("doubleClicked")
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if (this.grid[i][j].contains(mouseX, mouseY) && this.grid[i][j].revealed) {
            this.grid[i][j].hexRevealSolved();
          }
        }
      }
    
    return false;
    }    
    
    
}

// //REFACTOR THIS GARBAGE
// function HCell(i, j, cellSize) {
//     this.i = i;
//     this.j = j;
//     this.xOffset = 5;
//     this.yOffset = 5;
//     this.mine = false;
//     // this.marked = false;
//     this.revealed = false;
//     this.isFlag = false
//     this.gameOver = false
    
//     this.revealedCount = 0
//     this.flagCount = 0    

//     if(j % 2 === 0) {
//         this.x = this.i * cellSize * 2 + this.xOffset;
//     } else {
//         this.x = this.i * cellSize * 2 + cellSize + this.xOffset;
//     }
    
//     this.y = this.j * cellSize * 1.7 + this.yOffset;
//     this.hasPlayer = false;

//     this.show = function () {
//         stroke(255, 255, 255, 50)
//         fill(0, 114, 183);
 
//         push(); 
//         translate(this.x, this.y);
//         rotate(radians(30));
//         this.polygon(0, 0, cellSize, 6);
//         pop();
//     }
//     /** Checks to see if the mouse is within the cells bounds */
//     this.contains = function(x, y) {
//       return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
//     }
    
//     this.polygon = function(x, y, radius, npoints){
//         var angle = TWO_PI / npoints;
//         beginShape();
//         for (var a = 0; a < TWO_PI; a += angle) {
//             var sx = x + cos(a) * radius;
//             var sy = y + sin(a) * radius;
//             vertex(sx, sy);
//         }
//         endShape(CLOSE);
//     }
// }
