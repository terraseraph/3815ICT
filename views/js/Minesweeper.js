class Minesweeper{
    constructor(width, height, mines, gameType = 'classic'){
        
        this.cellWidth = 30
        this.gameType = gameType
        this.width = width
        this.height = height
        this.mines = mines
        
        this.cols = Math.floor(this.width / this.cellWidth);
        this.rows = Math.floor(this.height / this.cellWidth);
        this.totalCells = this.cols * this.rows
        
        
        this.game = new Game(this.gameType)
        this.grid = this.make2DArray(this.cols, this.rows);
        this.firstMousePress = true
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

    
    createCells(){
        // this.grid = game.grid
        console.log("Creating cells....")
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if(this.gameType == 'classic'){
            this.grid[i][j] = new ClassicCell(i, j, this.cellWidth, this.grid, this.cols, this.rows);
          }
          else if(this.gameType == 'hex'){
            try{this.grid[i][j] = new HexCell(i, j, this.cellWidth, this.grid)}catch(e){console.log(e)}
          }
        }
      }
      console.log(this.grid)
    }
    
    placeMines(){
      console.log("Placing mines....")
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
    
    /** Double click to reveal solved cells */
    doubleClicked() {
      console.log("doubleClicked")
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if (this.grid[i][j].contains(mouseX, mouseY) && this.grid[i][j].revealed) {
            this.grid[i][j].revealSolved();
          }
        }
      }
    
    return false;
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
            
                      if (!this.grid[c][r].mine) {
                        this.grid[c][r].mine = true;
                        replaceMine = this.grid[c][r];
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
        if (this.firstMousePress) { this.game.timer.timer_start(); this.firstMousePress ^= true}
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
    
    gameOver(){
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.grid[i][j].revealed = true;
            }
        }
        this.game.gameOver()
    }
    
    gameWin(){
        this.game.gameWin()
    }
    
    checkState(){
        if ((this.correctFlagCount + this.revealedCount) == this.totalCells){
            noLoop();
            this.gameWin()
        }
    }
    
    draw(){
        for(var i = 0; i < this.grid.length; i++) {
            for(var j = 0; j < this.grid[i].length; j++) {
                // console.log(this.grid[i][j])
                try{this.grid[i][j].show();}catch(e){console.log(e)}
                try{this.grid[i][j].flag();}catch(e){console.log(e)}

                if (this.grid[i][j].gameOver){
                    this.gameOver()
                }
            }
        }
    }
    
    
    
}