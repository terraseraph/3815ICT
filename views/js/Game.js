/* global $ */

/**
 * Game class
 * @constructor Game
 */
class Game{
  constructor(gameName){
    this.time_now
    this.timer = new GameTimer()
    this.scores = new Scores
    this.gameName = gameName
  }


  /** Load the scores from file */
  load_scores(gameName = 'classic'){
    this.scores.load_scores(gameName)
  }
  
  
  /** Save score to file */
  save_score(){
    var input_name = $('#name').val()
    var time = $('#timer').text()
    var gameName = this.gameName
    this.scores.save_score(input_name, time, gameName, function(result){
      console.log(result)
      $('#modal-').modal("hide")
    })
  }
  
  
  /** Game win condition */
  gameWin(cb){
    this.timer.timer_stop()
    console.log('WIN!')
    this.timer.timer_stop()
    this.time_now = $('#timer').text()
    console.log(this.time_now)
    $('#your_score').html(`Your Score ${this.time_now}`)
    $('#modal-').modal("show")
    cb('game won')
  }
  
  gameOver(cb){
    this.timer.timer_stop()
    cb("game over")
  }

}
