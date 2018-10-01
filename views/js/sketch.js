/* global $ */
var game = new Minesweeper(401, 401, 5);
// var game  = new Game(401, 401, 5, 'hex')
// var grid;
// var cols;
// var rows;
// var w = game.cellWidth;


// var totalMines = 30;

/**
 * Sketch
 * @constructor Sketch
 */
function setup() {
  // game = new Minesweeper(401, 401, 5);
    // var scores = new Scores()
    // scores.load_scores()
    /** 
    * @fires updates the timer value
    */
    game.game.timer.addEventListener('secondsUpdated', function (e) {
        $('#timer').html(game.game.timer.getTimeValues().toString());
    });  
  
  var Canvas = createCanvas(game.width, game.height);
  Canvas.parent("minesweeper");

  game.createCells()
  game.placeMines()
  loop()

}


function draw() {
  background(255);
  game.checkState();
  game.draw();
}

//=====================================
//Other functions
//=====================================

/** Make a 2d array for the cells
 * @param {int} cols = number of columns
 * @param {int} rows = number of rows
 */
// function make2DArray(cols, rows) {
//   var arr = new Array(cols);
//   for (var i = 0; i < arr.length; i++) {
//     arr[i] = new Array(rows);
//   }
//   return arr;
// }


/** Detect mouse press */
function mousePressed() {
    if (mouseButton === RIGHT) {
      game.rightClick()
      console.log("right-click")
    }
    if (mouseButton === LEFT) {
      game.leftClick()
      console.log("left-click")
    }
    if (mouseButton === CENTER) {
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
    game.game.timer.timer_stop()
    game = new Minesweeper(w, h, m, 'classic')
    setup()
}

function new_gameh(w = 301, h = 501, m = 200){
    game.game.timer.timer_stop()
    game = new Minesweeper(w, h, m, 'hex')
    setup()
}

function save_score(){
  game.game.save_score()
}




/**
 * Disables the right click menu for the given element.
 */
// Once the page is loaded, disable the right click menu of the canvas.
$(document).ready(function() {
  disableRightClickContextMenu(document.getElementById('minesweeper'));
  game.game.load_scores()
});
function disableRightClickContextMenu(element) {
  element.addEventListener('contextmenu', function(e) {
    if (e.button == 2) {
      // Block right-click menu thru preventing default action.
      e.preventDefault();
    }
  });
}