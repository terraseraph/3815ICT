'use strict'
//Game states kept here
//This allows for security or whatever
//send from here to go to view.
var jsonfile = require('jsonfile')
var file = __dirname+"/game_scores.json"
var scores;
var game;
var gameName

get_scores(console.log)


exports.gc_get_scores = function(req, res){
    gameName = req.params.gameName
    get_scores(function(data){
        res.send(data)
    })
}

/** Saves score 
 * @exports save_score
 */
exports.save_score = function(req, res){
    var id = scores.Scores.Players.length
    var gameName = req.params.gameName
    console.log("SCORE: "+req.params.score)
    var players = scores.Scores.Players
    var obj = {
        id : id,
        name : req.params.name,
        score : req.params.score,
        gameName : gameName
    }
    console.log(obj)
    var data = players.push(obj)
    
    jsonfile.writeFile(file, scores, {spaces: 2}, function (err) {
        console.error(err)
        res.send("Success")
    })
    
    
    
}

/** Get score from file */
function get_scores(cb){
    jsonfile.readFile(file, function(err, obj) {
        console.dir(obj)
        scores = obj
        cb(obj)
        try{console.log("Scores ===============", obj.Scores.Players.length)}
        catch(e){}
    })
}


/**
 * @exports new_game
 * new game on server
 */
exports.new_game = function(req, res){
    var w = req.params.width
    var h = req.params.height
    var m = req.params.mines
    game = new minesweeper(w, h, m)
    console.log(game.getInfo())
    res.send(game.getInfo())
}

/** Minesweeper field create */
function minesweeper(width, height, mines){
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.getInfo = function(){
        return 'Width/height/mines:' + this.width + ' ' + this.height + ' ' + this.mines;
    }
}