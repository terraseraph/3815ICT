/* global $ */

var time_now

// Once the page is loaded, disable the right click menu of the canvas.
$(document).ready(function() {
  disableRightClickContextMenu(document.getElementById('minesweeper'));
  load_scores()
});

/** Load the scores from file */
function load_scores(){
  $.get("/get_scores", function(data){
    console.log("Scores loaded", data)
    data = JSON.stringify(data)
    $('#scores').html(data)
  })
}


/** Save score to file */
function save_score(){
  // var input_name = $('#name').val()
  var input_name = $('#name').val()
  var time = $('#timer').text()
  $.get(`/save_score/${input_name}/${time}`, function(dat){
    console.log(`Saved: ${input_name} : ${time}`)
    $('#modal-').modal("hide")
  })
}

/**
 * Game class
 * @constructor Game
 */
function Game(width, height, mines){
  
  //Game states
  this.revealedCount = 0
  this.flagCount = 0
  this.correctFlagCount = 0
  
  this.width = width
  this.height = height
  this.mines = mines
  
  //options
  this.cellWidth = 20
  
  
  this.firstMousePress = true
  this.cols = Math.floor(this.width / this.cellWidth);
  this.rows = Math.floor(this.height / this.cellWidth);
  this.totalCells = this.cols * this.rows
  
}

/** Double click to reveal solved cells */
Game.prototype.doubleClicked = function() {
  console.log("doubleClicked")
  for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].revealed) {
        grid[i][j].revealSolved();
      }
    }
  }

return false;
}
  
/** Click to reveal a cell */
Game.prototype.left_click = function(){
  var replaceMine = undefined;
  console.log(this.firstMousePress)
  for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].isFlag) {
        grid[i][j].reveal();
        if (grid[i][j].mine) {
          if (this.firstMousePress) {
            grid[i][j].mine = false;
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

/** Make a flag on a cell */
Game.prototype.right_click = function(){
    for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed) {
        grid[i][j].makeFlag();

      }
    }
  }
}

/** End the game if a mine has been revealed */
Game.prototype.gameOver = function() {
  for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  timer_stop()
}

/** Game win condition */
Game.prototype.gameWin = function(){
  console.log('WIN!')
  timer_stop()
  time_now = $('#timer').text()
  console.log(time_now)
  $('#your_score').html(`Your Score ${time_now}`)
  $('#modal-').modal("show")
}

/** Checks the game state for win */
Game.prototype.checkState = function(){
    if ((this.correctFlagCount + this.revealedCount) == this.totalCells){
    noLoop();
    timer_stop()
    this.gameWin()
  }
}


  
/** Creates a new game 
 * @param {int} w = width of field
 * @param {int} h = height of field
 * @param {int} m = number of mines
 */
function new_game(w = 301, h = 501, m = 200){
    timer_stop()
    game = new Game(w, h, m)
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