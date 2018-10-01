$.getScript( "/easytimer/dist/easytimer.min.js", function( data, textStatus, jqxhr ) {
});

/**
 * Timer
 * @constructor Timer
 */
var timer = new Timer();
    
    /** Start the timer */
    function timer_start(){
        console.log("Starting timer")
        timer.start();
    }
    
    /** Stop the timer */
    function timer_stop(){
        timer.stop()
    }
    
    /** 
    * @fires updates the timer value
    */
    timer.addEventListener('secondsUpdated', function (e) {
        $('#timer').html(timer.getTimeValues().toString());
    });
    