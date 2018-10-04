//Using
const http = require('http');
const path = require('path');
const async = require('async');
const socketio = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//Controllers
const game_controller = require('./controllers/game_controller')
// const doxygen = require('./controllers/doxygen')


//Models


//Views


//Route configure
app.use(express.static(path.resolve(__dirname, 'views')));
app.use(express.static(__dirname+'/node_modules'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.urlencoded());

var messages = [];
var sockets = [];


//Routes
app.get('/new_game/:width/:height/:mines', game_controller.new_game)

app.get('/save_score/:name/:score/:gameName', game_controller.save_score)

app.get('/get_scores/:gameName', game_controller.gc_get_scores)

app.get('/test', function(req, res){
   res.sendfile(path.resolve(__dirname, 'views/js/tests/index.html'));
})

// app.get('/get_data', routes.get_data)

// app.post('/login', routes.send_login)


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server", addr.address + ":" + addr.port);
});


