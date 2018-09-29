/* global $ */
function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function(script) { 
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        }); 
    });
}
var grid;
var game;
var cols;
var rows;

var scripts = [
        "/easytimer/dist/easytimer.min.js",
        // "/p5/lib/p5.min.js",
        // "/p5/lib/addons/p5.dom.min.js",
        // "/p5/lib/addons/p5.sound.min.js",
        "/js/cell.js",
        "/js/game.js",
        "/js/squaremines.js",
        "/js/hexmines.js",
        "/js/timer.js"
    ]

getScripts(scripts, function () {
    $.getScript("/js/sketch.js", function () {
    }); 


});
// function setup() {
//         game  = new SquareMines(401, 401, 5);
//       var myCanvas = createCanvas(game.width, game.height);
//       myCanvas.parent("minesweeper");
//       console.log("canvas created", game.width, game.height)
// }

// function draw() {
//   background(255);

// }