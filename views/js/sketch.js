/* global $ */
//Initialise the game
var game = new Minesweeper(401, 401, 5);

/**
 * Sketch
 * @constructor Sketch
 */
function setup() {
  
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

function new_gameC(w = 301, h = 501, m = 200){
    game.game.timer.timer_stop()
    game = new Minesweeper(w, h, m, 'colouring')
    setup()
}

function save_score(){
  game.game.save_score()
}




/**
 * Disables the right click menu for the given element.
 */
$(document).ready(function() {
  disableRightClickContextMenu(document.getElementById('minesweeper'));
  game.game.load_scores()
});


// Once the page is loaded, disable the right click menu of the canvas.
function disableRightClickContextMenu(element) {
  element.addEventListener('contextmenu', function(e) {
    if (e.button == 2) {
      e.preventDefault();
    }
  });
}