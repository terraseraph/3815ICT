/* global $ */

/**
 * Game class
 * @constructor Game
 */
function Game(width, height, mines){
  
  
}

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