//Game states kept here
//This allows for security or whatever
//send from here to go to view.
var game


exports.new_game = function(req, res){
    var w = req.params.width
    var h = req.params.height
    var m = req.params.mines
    game = new minesweeper(w, h, m)
    console.log(game.getInfo())
    res.send(game.getInfo())
}




function minesweeper(width, height, mines){
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.getInfo = function(){
        return 'Width/height/mines:' + this.width + ' ' + this.height + ' ' + this.mines;
    }
}
