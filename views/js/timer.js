$.getScript( "/easytimer/dist/easytimer.min.js", function( data, textStatus, jqxhr ) {
});

/**
 * GameTimer
 * @constructor GameTimer
 */
class GameTimer extends Timer{
    /** Start the timer */
    timer_start(){
        console.log("Starting timer")
        this.start();
    }
    
    /** Stop the timer */
    timer_stop(){
        this.stop()
    }
}