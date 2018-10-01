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
    
    //========================new additions=======================
    createCells_old(){
  		// for (var q = -this.map_size; q <= this.map_size; q++) {
  		// 		var r1 = max(-this.map_size, -q - this.map_size);
  		// 		var r2 = min(this.map_size, -q + this.map_size);
  		// 		for (var r = r1; r <= r2; r++) {
  		// 			this.draw_hexagon(this.hex_to_pixel(q, r), this.hex_size, q, r);
  		// 		}
  		// }
  		
  		translate(-this.width/2 + 30, -this.height/2 + 80);
  		 //make the grid
  		 
  		for (var r = 0; r < this.map_size * 2; r++) {
  				var r_offset = floor(r/2);
  				for (var q = -r_offset; q < (this.map_size*2) - r_offset; q++) {
  				  this.hexGrid[r][q] = new HexCell(this.hex_size, q,r, this.map_size, this.width, this.height)
  				}
  		}
 		
  		console.log(this.hexGrid.length)
  		
    // 	strokeWeight(8);
    // 	stroke(255, 180);
    // 	for(var i = 0; i < this.intersections.length; i++){
    // 		point(this.intersections[i].x, this.intersections[i].y);
    // 	}
    // 	this.intersections = [];		
    }
    
    drawHex(){
      //same as render hex
      for(var i = 0; i < this.hexGrid.length; i++) {
          for(var j = 0; j < this.hexGrid[i].length;j++) {
            // console.log(this.hexGrid[i][j])
              if(this.hexGrid[i][j] != undefined){
                this.hexGrid[i][j].show()
              };
          }
      }      
    }

    
    //=========end additions===============================
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
            }
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
