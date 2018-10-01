/* global $ */
var game  = new SquareMines(401, 401, 5);
// var game  = new Game(401, 401, 5)
var grid;
var cols;
var rows;
var w = game.cellWidth;

// var totalMines = 30;

/**
 * Sketch
 * @constructor Sketch
 */
function setup() {
  cols = game.cols
  rows = game.rows
  grid = game.grid
  game = game
  // game  = new SquareMines(401, 401, 5);
  console.log(game.width, game.cellWidth, game.height)
  var myCanvas = createCanvas(game.width, game.height);
  myCanvas.parent("minesweeper");

  game.createCells()
  game.placeMines()
  loop()

}


function draw() {
  background(255);
  if(game.type == "square"){
    game.checkState();
    game.draw();
      
  }
  else{
    game.draw()
    game.checkState();
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
      // game.right_click()
      game.rightClick()
      console.log("right-click")
    }
    if (mouseButton === LEFT) {
      // game.left_click()
      game.leftClick()
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


/** Creates a new game 
 * @param {int} w = width of field
 * @param {int} h = height of field
 * @param {int} m = number of mines
 */
function new_game(w = 301, h = 501, m = 200){
    timer_stop()
    game = new SquareMines(w, h, m)
    console.log(game.firstMousePress)
    setup()
}

function new_gameh(w = 301, h = 501, m = 200){
    timer_stop()
    game = new HexMines(w, h, m)
    console.log(game.firstMousePress)
    setup()
}




/**
 * Disables the right click menu for the given element.
 */
function disableRightClickContextMenu(element) {
  element.addEventListener('contextmenu', function(e) {
    if (e.button == 2) {
      // Block right-click menu thru preventing default action.
      e.preventDefault();
    }
  });
}