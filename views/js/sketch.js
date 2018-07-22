/* global $ */
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E
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

// Once the page is loaded, disable the right click menu of the canvas.
$(document).ready(function() {
  disableRightClickContextMenu(document.getElementById('minesweeper'));
});

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var winWidth = 401
var winHeight = 401
var grid;
var cols;
var rows;
var w = 20;

var totalMines = 30;
var firstMousePress = true

var totalCells
// var revealedCount = 0

// function Game(cols, rows, mines){
//   this.totalCells = cols * rows
//   this.revealedCount
//   this.flagCount
//   this.totalMines = mines
//   this.time
  
//   function gameState(){
//     if ((this.flagCount + this.totalMines + this.revealedCount) == this.totalCells){
//       this.gameWin()
//     }
//   }
  
//   function gameWin(){
//     console.log("won game")
//   }
  
  
// }


function setup() {
  var myCanvas = createCanvas(winWidth, winHeight);
  myCanvas.parent("minesweeper");
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  
  // var game = new Game(cols, rows, totalMines)
  totalCells = cols * rows
  console.log(totalCells)
  
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


  for (var n = 0; n < totalMines; n++) {
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

}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

function gameWin(){
  console.log('WIN!')
}


function mousePressed() {
    if (mouseButton === RIGHT) {
      right_click()
      console.log("right-click")
    }
    if (mouseButton === LEFT) {
      left_click()
      console.log("left-click")
    }
    if (mouseButton === CENTER) {
      doubleClicked()
      console.log("middle-click")
    }
}

function doubleClicked() {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].revealed) {
          grid[i][j].revealSolved();
        }
      }
    }
  
  return false;
}

function left_click(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].marked) {
        grid[i][j].reveal();

        if (grid[i][j].mine) {
  
          if (firstMousePress) {
            grid[i][j].mine = false;

            //Pick a replacement mine
            var newMine = undefined;
            while (!newMine) {
              var c = random(cols);
              var r = random(rows);

              if (!grid[c][r].mine) {
                grid[c][r].mine = true;
                newMine = grid[c][r];
              }
            }
          } else {
            noLoop();
            gameOver();
          }
        }

      }
    }
  }
  firstMousePress = false;
  
}

function right_click(){
    for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].revealed) {
        grid[i][j].makeFlag();

      }
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      
      //TODO: place on game class.....
      if ((game.flagCount + totalMines + game.revealedCount) == totalCells){
        noLoop();
        gameWin()
      }
      
      grid[i][j].show();
      grid[i][j].flag();
      if (grid[i][j].gameOver){
        gameOver()
      }
    }
  }
}




  // if (mouseIsPressed) {
  //   if (mouseButton === LEFT) {
  //     ellipse(50, 50, 50, 50);
  //   }
  //   if (mouseButton === RIGHT) {
  //     rect(25, 25, 50, 50);
  //   }
  //   if (mouseButton === CENTER) {
  //     triangle(23, 75, 50, 20, 78, 75);
  //   }
  // }
