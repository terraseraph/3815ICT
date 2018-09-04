/* global $ */

var game  = new Game(401, 401, 5)
var grid;
var cols;
var rows;
var w = game.cellWidth;

var totalMines = 30;

/**
 * Sketch
 * @constructor Sketch
 */
function setup() {
  var myCanvas = createCanvas(game.width, game.height);
  myCanvas.parent("minesweeper");
  cols = game.cols
  rows = game.rows
  w = game.cellWidth
  grid = make2DArray(game.cols, game.rows);
  
  //create all cells as a Cell
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick totalmines spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  //make mines in random places
  for (var n = 0; n < game.mines; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].mine = true;
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
  //begin drawing loop Note: this is due to the game stopping after noLoop()
  loop()

}


function draw() {
  background(255);
  game.checkState()
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      
      grid[i][j].show();
      grid[i][j].flag();
      if (grid[i][j].gameOver){
        game.gameOver()
      }
    }
  }
}

//=====================================
//Other functions
//=====================================

/** Make a 2d array for the cells
 * @param {int} cols = number of columns
 * @param {int} rows = number of rows
 */
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


/** Detect mouse press */
function mousePressed() {
    if (mouseButton === RIGHT) {
      game.right_click()
      console.log("right-click")
    }
    if (mouseButton === LEFT) {
      game.left_click()
      console.log("left-click")
    }
    if (mouseButton === CENTER) {
      game.doubleClicked()
      console.log("middle-click")
    }
}

/** Fire double click event */
function doubleClicked() {
  game.doubleClicked()
}