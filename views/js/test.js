function run_tests(){
    test_Minesweeper()
    test_save_score()
    test_game_win()
    test_game_lose()
}


//test logging function
function t_logs(fn, msg){
        var pass
        msg ? pass = '✓' : pass = '✖';;
        console.log(fn, "=========================", msg)
        var success = (`<li >${fn} === ${msg}<a class='pass_t'>${pass}</a></li>`);
        $('#result').append(success)
}


// Make 2d array
function test_make2DArray(){
    
    var arr = make2DArray(100, 100)
    if (arr[0].length == 100){
        t_logs("make2DArray", true)
    }
    else{
        t_logs("make2DArray()", false)
    }
}

//test game class
function test_Minesweeper(){
    var test_g = new Minesweeper(100, 100, 100)
    var name = "test_Minesweeper()";
    
    (test_g.width == 100 && test_g.height == 100 && test_g.mines == 100) ? t_logs(name, true) : t_logs(name, false);
    
    (test_g.grid.length == 3) ? t_logs(name+".grid", true) : t_logs(name+".grid", false);
    
    (test_g.grid.length == 3) ? t_logs(name+".grid", true) : t_logs(name+".grid", false);
    
    (test_g.rows == 3) ? t_logs(name+".rows", true) : t_logs(name+".rows", false);
    
    (test_g.cols == 3) ? t_logs(name+".cols", true) : t_logs(name+".cols", false);
    console.log(test_g.rows, test_g.cols)
}

//test save score
function test_save_score(){
    var test_s = new Scores()
    var name  = "test_save_score()"
    test_s.save_score('test', "1:00", 'test', function(result){
        result.success ? t_logs(name, true) : t_logs(name, false)
    })
}

//test win
function test_game_win(){
    var name = "test_game_win"
    var test_g = new Game()
    
    test_g.gameWin(function(result){
        result == 'game won' ? t_logs(name, true) : t_logs(name, false)
    })
}


//test lose
function test_game_lose(){
    var name = "test_game _lose"
    var test_g = new Game()
    
    test_g.gameOver(function(result){
        result == 'game over' ? t_logs(name, true) : t_logs(name, false)
    })
}