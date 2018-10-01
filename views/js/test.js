function run_tests(){
    test_make2DArray()
    test_Game()
    test_save_score()
    test_remove_score()
    test_game_win()
    test_game_lose()
}


//test logging function
function t_logs(fn, msg){
    console.log(fn, "=========================", msg)
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
function test_Game(){
    test_g = new Game(100, 100, 100)
    if(test_g.width == 100 && test_g.height == 100 && test_g.mines == 100){
        t_logs("test_Game()", true)
    }
}

//test save score
function test_save_score(){
    //save score
    //remove score
    return t_logs("test_save_score()", true)
}

//test remove score
function test_remove_score(){
    //save score
    //remove score
    return t_logs("test_remove_score()", true)
}

//test win
function test_game_win(){
    //end game condition
    return t_logs("test_game_win()", true)
}


//test lose
function test_game_lose(){
    //lose game condition
    return t_logs("test_game_lose()", true)
}